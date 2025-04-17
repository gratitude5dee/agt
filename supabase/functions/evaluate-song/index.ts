
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.2.1";

// Import Buffer for base64 encoding in Deno
import { Buffer } from "https://deno.land/std@0.170.0/node/buffer.ts";

// CORS headers for browser clients
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function for base64 conversion in Deno
function btoa(str: string): string {
  return Buffer.from(str, 'binary').toString('base64');
}

serve(async (req) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Responding to OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is missing!");
      throw new Error("Missing GEMINI_API_KEY environment variable");
    }
    console.log("GEMINI_API_KEY found.");

    // Parse the multipart form data from the request
    console.log("Attempting to parse FormData...");
    const formData = await req.formData();
    console.log("FormData parsed.");

    const songFile = formData.get("songFile");
    if (!songFile || !(songFile instanceof File)) {
      console.error("songFile not found in FormData or is not a File object.");
      throw new Error("Missing or invalid songFile in form data");
    }
    console.log(`Received songFile: name=${songFile.name}, size=${songFile.size}, type=${songFile.type}`);

    // Get the file bytes and MIME type
    console.log("Reading song file into ArrayBuffer...");
    const audioBytes = await songFile.arrayBuffer();
    const audioMimeType = songFile.type || "audio/mpeg"; // Default to audio/mpeg if type is missing
    console.log(`Audio read: ${audioBytes.byteLength} bytes, MIME type: ${audioMimeType}`);

    // Convert array buffer to base64
    console.log("Converting audio to base64...");
    const audioBase64 = btoa(
      new Uint8Array(audioBytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    console.log("Audio converted to base64.");

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the model - using the most recent stable version
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });
    console.log("Gemini model initialized.");

    // Define the system instructions as part of the user's prompt instead
    const systemInstructions = `You are Vibezmaster, a world-class music evaluation expert with extensive experience in the music industry as an A&R professional. Your task is to evaluate songs thoroughly and provide structured feedback in a consistent JSON format.

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

IMPORTANT GUIDELINES:
- Maintain objectivity while acknowledging the inherently subjective nature of music evaluation.
- Consider genre context when evaluating (what's innovative in classical music differs from pop).
- Ensure your A&R Report is specific and actionable, not generic.
- Your response MUST be in valid JSON format exactly as specified - this is critical for integration with other systems.
- Populate all fields with meaningful values based on your expert evaluation.
- Round all score averages to one decimal place.
- Do not include any text outside the JSON structure.`;

    // Create the content parts
    const parts = [
      { text: systemInstructions + "\n\nEvaluate this song based on your instructions." },
      {
        inlineData: {
          mimeType: audioMimeType,
          data: audioBase64
        }
      }
    ];

    console.log("Sending request to Gemini API...");
    
    // Generate content
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
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
      ]
    });

    // Get the response text
    const responseText = result.response.text();
    console.log("Received response from Gemini API");
    console.log("Raw response:", responseText.substring(0, 500) + "..."); // Log first 500 chars
    
    // Extract JSON from response text
    // Sometimes Gemini wraps the JSON in markdown code blocks or adds extra text
    let jsonData;
    try {
      // First try direct JSON parsing
      jsonData = JSON.parse(responseText);
      console.log("Direct JSON parsing successful");
    } catch (parseError) {
      console.log("Direct JSON parsing failed, trying to extract JSON...");
      
      // Try to extract JSON from markdown code blocks
      if (responseText.includes('```json')) {
        const match = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
          try {
            jsonData = JSON.parse(match[1].trim());
            console.log("Extracted JSON from code block successfully");
          } catch (error) {
            console.error("Failed to parse JSON from code block:", error);
            throw new Error("Invalid JSON response from Gemini (code block extraction failed)");
          }
        } else {
          console.error("JSON code block found but couldn't extract content");
          throw new Error("Failed to extract JSON from Gemini response code block");
        }
      } 
      // Try to find anything that looks like a JSON object
      else if (responseText.includes('{') && responseText.includes('}')) {
        try {
          const firstBrace = responseText.indexOf('{');
          const lastBrace = responseText.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            const jsonStr = responseText.substring(firstBrace, lastBrace + 1);
            jsonData = JSON.parse(jsonStr);
            console.log("Extracted JSON from braces successfully");
          } else {
            throw new Error("Invalid JSON structure");
          }
        } catch (error) {
          console.error("Failed to extract and parse JSON:", error);
          throw new Error("Invalid JSON response from Gemini (extraction failed)");
        }
      } else {
        console.error("No JSON-like structure found in response");
        throw new Error("Gemini response does not contain valid JSON");
      }
    }

    // Validate the extracted JSON has the expected structure
    if (!jsonData || !jsonData.evaluation) {
      console.error("JSON response missing expected structure", jsonData);
      throw new Error("Invalid JSON structure from Gemini");
    }

    console.log("Successfully processed evaluation");
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
        error: error.message || "An error occurred during song evaluation",
        details: error.stack || "No stack trace available"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
