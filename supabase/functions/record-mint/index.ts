
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { createPublicClient, http } from 'https://esm.sh/viem@2.26.5';
import { baseSepolia } from 'https://esm.sh/viem@2.26.5/chains';

// CORS headers for browser clients
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      );
    }

    // Extract JWT token from authorization header
    const token = authHeader.replace('Bearer ', '');
    
    // Get the authenticated user from the JWT
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      console.error('Error getting user:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      );
    }

    // Parse the request body
    const { transactionHash, contractAddress, tokenId } = await req.json();
    
    if (!transactionHash || !contractAddress) {
      return new Response(
        JSON.stringify({ error: 'Missing transaction hash or contract address' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Initialize blockchain client using viem
    const rpcUrl = Deno.env.get('BLOCKCHAIN_RPC_URL') || `https://base-sepolia.g.alchemy.com/v2/${Deno.env.get('ALCHEMY_API_KEY')}`;
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(rpcUrl),
    });

    try {
      // Fetch transaction receipt to validate
      const txReceipt = await publicClient.getTransactionReceipt({
        hash: transactionHash as `0x${string}`,
      });

      // Verify transaction was successful
      if (txReceipt.status !== 'success') {
        return new Response(
          JSON.stringify({ error: 'Transaction failed on-chain' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 
          }
        );
      }

      // Verify contract address match (case-insensitive comparison)
      if (txReceipt.to.toLowerCase() !== contractAddress.toLowerCase()) {
        return new Response(
          JSON.stringify({ error: 'Contract address mismatch' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 
          }
        );
      }

      // Get the user's wallet address from their profile
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('wallet_address')
        .eq('id', user.id)
        .single();

      if (profileError || !profileData.wallet_address) {
        console.error('Error getting user profile:', profileError);
        return new Response(
          JSON.stringify({ error: 'User profile not found or wallet not linked' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 
          }
        );
      }

      // Verify transaction sender matches user's wallet (case-insensitive)
      if (txReceipt.from.toLowerCase() !== profileData.wallet_address.toLowerCase()) {
        return new Response(
          JSON.stringify({ error: 'Transaction sender does not match user wallet' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 
          }
        );
      }

      // All validations passed, record the mint
      const { data: mintRecord, error: insertError } = await supabaseAdmin
        .from('mint_records')
        .insert({
          user_id: user.id,
          transaction_hash: transactionHash,
          contract_address: contractAddress,
          token_id: tokenId || null
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error recording mint:', insertError);
        
        // Check if it's a unique constraint violation (transaction already recorded)
        if (insertError.code === '23505') {
          return new Response(
            JSON.stringify({ error: 'This transaction has already been recorded' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 409 
            }
          );
        }
        
        return new Response(
          JSON.stringify({ error: 'Failed to record mint' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        );
      }

      // Return success response with the recorded mint data
      return new Response(
        JSON.stringify({ 
          status: 'ok', 
          data: mintRecord,
          message: 'Mint successfully recorded'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } catch (blockchainError) {
      console.error('Blockchain verification error:', blockchainError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify transaction on blockchain' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
