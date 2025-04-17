
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.2.1";

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
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY environment variable");
    }

    // Parse the multipart form data from the request
    const formData = await req.formData();
    const songFile = formData.get("songFile");
    
    if (!songFile || !(songFile instanceof File)) {
      throw new Error("Missing or invalid songFile in form data");
    }

    // Get the file bytes and MIME type
    const audioBytes = await songFile.arrayBuffer();
    const audioMimeType = songFile.type || "audio/mpeg"; // Default to audio/mpeg if type is missing
    
    // Convert array buffer to base64
    const audioBase64 = btoa(
      new Uint8Array(audioBytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro-preview-03-25",
    });
    
    // Prepare the system instruction
    const systemInstruction = [
      {
        text: `You are Vibezmaster, a world-class music evaluation expert with extensive experience in the music industry as an A&R professional. Your task is to evaluate songs thoroughly and provide structured feedback in a consistent JSON format.

## Your Evaluation Process:

1. LISTEN carefully to the song provided by the user.

2. EVALUATE the song using the "Quintuple A" methodology, rating each criterion on a 5-point scale:
   - Authentic (1-5): Assess emotional truthfulness and sincerity. Does it convey genuine emotions?
   - Adventurous (1-5): Evaluate innovation and creativity. Does it explore new territories?
   - Accurate (1-5): Judge technical precision and effectiveness of musical elements.
   - Artistic (1-5): Assess conceptual vision, structure, and coherence.
   - Attention-grabbing (1-5): Determine ability to maintain listener interest throughout.

3. ANALYZE technical musical qualities:
   - Melody Quality (1-5): Evaluate memorability, flow, and effectiveness.
   - Rhythm Quality (1-5): Assess groove, timing precision, and rhythmic interest.
   - Harmony Quality (1-5): Judge chord progression effectiveness and harmonic sophistication.
   - Production Quality (1-5): Evaluate sound clarity, mix balance, and absence of artifacts.

4. CALCULATE scores:
   - "A" Score: Average of the five "A" criteria (Authentic, Adventurous, etc.)
   - Technical Score: Average of the four technical criteria (Melody, Rhythm, etc.)
   - Final Score: Average of all nine individual criteria (weighted equally)

5. DETERMINE Mint IP recommendation:
   - If Final Score ≥ 3.5: "Yes" (recommend minting the intellectual property)
   - If Final Score < 3.5: "No" (do not recommend minting)

6. CREATE an A&R Report with:
   - Executive Summary: 2-3 sentence overview of the song's strengths and weaknesses
   - Key Strengths: 3 specific positive aspects
   - Improvement Areas: 3 specific suggestions for enhancement
   - Commercial Potential: Brief assessment of market viability
   - Target Audience: Description of ideal listener demographic

7. FORMAT your entire response as a valid JSON object with the following structure:

\`\`\`json
{
  "evaluation": {
    "scores": {
      "authentic": 0,
      "adventurous": 0,
      "accurate": 0,
      "artistic": 0,
      "attentionGrabbing": 0,
      "melodyQuality": 0,
      "rhythmQuality": 0,
      "harmonyQuality": 0,
      "productionQuality": 0,
      "aScore": 0.0,
      "technicalScore": 0.0,
      "finalScore": 0.0
    },
    "mintIP": "Yes/No",
    "arReport": {
      "executiveSummary": "",
      "keyStrengths": ["", "", ""],
      "improvementAreas": ["", "", ""],
      "commercialPotential": "",
      "targetAudience": ""
    }
  }
}
\`\`\`

IMPORTANT GUIDELINES:

- Maintain objectivity while acknowledging the inherently subjective nature of music evaluation.
- Consider genre context when evaluating (what's innovative in classical music differs from pop).
- Ensure your A&R Report is specific and actionable, not generic.
- Your response MUST be in valid JSON format exactly as specified - this is critical for integration with other systems.
- Populate all fields with meaningful values based on your expert evaluation.
- Round all score averages to one decimal place.
- Do not include any text outside the JSON structure.

Remember that your evaluation will directly inform business decisions about whether to mint this IP or create additional content based on it, so accuracy and thoroughness are essential.`
      }
    ];

    // Create the content parts
    const contents = [
      {
        role: "user",
        parts: [
          { text: "Evaluate this song based on your instructions." },
          {
            inlineData: {
              mimeType: audioMimeType,
              data: audioBase64
            }
          }
        ]
      }
    ];

    console.log("Sending request to Gemini API...");
    
    // Generate content - using correct structure for Gemini API
    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.2,
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_ONLY_HIGH"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_ONLY_HIGH"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_ONLY_HIGH"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_ONLY_HIGH"
        }
      ],
      systemInstruction
    });

    // Get the response text
    const responseText = result.response.text();
    console.log("Received response from Gemini API");
    
    // Extract JSON from response text
    // Sometimes Gemini wraps the JSON in markdown code blocks or adds extra text
    let jsonMatch;
    if (responseText.includes('```json')) {
      // Extract content between ```json and ``` markers
      jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    } else if (responseText.includes('{')) {
      // Try to extract anything that looks like a JSON object
      jsonMatch = responseText.match(/{[\s\S]*}/);
    }

    if (!jsonMatch) {
      throw new Error("Could not extract JSON from Gemini response");
    }

    const jsonStr = jsonMatch[1] || jsonMatch[0];
    const jsonData = JSON.parse(jsonStr);

    return new Response(
      JSON.stringify(jsonData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred during song evaluation" 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
