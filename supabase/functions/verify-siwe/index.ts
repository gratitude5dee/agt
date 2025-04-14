
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { SiweMessage } from "https://esm.sh/siwe@1.1.6";

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

    // Parse the request body for SIWE message and signature
    const { message, signature } = await req.json();
    
    if (!message || !signature) {
      return new Response(
        JSON.stringify({ error: 'Missing message or signature' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    try {
      // Create a SiweMessage instance
      const siweMessage = new SiweMessage(message);
      
      // Verify the signature
      const { success, data: verificationData } = await siweMessage.verify({
        signature,
        // Optional: add domain verification, nonce verification, etc.
      });

      if (!success) {
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401 
          }
        );
      }

      // Get the verified wallet address from the SIWE message
      const walletAddress = siweMessage.address;

      // Update the user's profile with the verified wallet address
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ wallet_address: walletAddress })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update profile' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        );
      }

      // Return success response
      return new Response(
        JSON.stringify({ 
          status: 'ok', 
          address: walletAddress,
          message: 'Wallet successfully linked to your profile'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } catch (verifyError) {
      console.error('Error verifying SIWE message:', verifyError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify signature' }),
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
