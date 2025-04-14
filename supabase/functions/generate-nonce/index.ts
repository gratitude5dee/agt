
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";

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
    // Generate a cryptographically secure random nonce
    const nonce = crypto.randomUUID();
    
    // In a production environment, you might want to store this nonce temporarily
    // with an expiry time to prevent replay attacks
    
    // Return the nonce
    return new Response(
      JSON.stringify({ nonce }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error generating nonce:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate nonce' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
