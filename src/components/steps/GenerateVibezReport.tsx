import React, { useState, useEffect } from 'react';
import { FileText, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

interface GenerateVibezReportProps {
  songFile: File;
  onChooseMint: (shouldMint: boolean) => void;
  onCancel: () => void; // New prop to handle cancelling/returning to upload
}

interface ScoreData {
  authentic: number;
  adventurous: number;
  accurate: number;
  artistic: number;
  attentionGrabbing: number;
  melodyQuality: number;
  rhythmQuality: number;
  harmonyQuality: number;
  productionQuality: number;
  aScore: number;
  technicalScore: number;
  finalScore: number;
}

interface ARReport {
  executiveSummary: string;
  keyStrengths: string[];
  improvementAreas: string[];
  commercialPotential: string;
  targetAudience: string;
}

interface EvaluationResult {
  evaluation: {
    scores: ScoreData;
    mintIP: string;
    arReport: ARReport;
  }
}

const GenerateVibezReport: React.FC<GenerateVibezReportProps> = ({ 
  songFile, 
  onChooseMint, 
  onCancel  // Add the new prop
}) => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateReport = async () => {
      try {
        setLoading(true);
        
        // Create a form data object to send the file
        const formData = new FormData();
        formData.append('songFile', songFile);
        
        // Call the Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('evaluate-song', {
          body: formData,
        });
        
        if (error) {
          throw new Error(`Error calling evaluate-song function: ${error.message}`);
        }
        
        // Handle the response
        if (data && data.evaluation) {
          setReportData(data as EvaluationResult);
        } else {
          throw new Error('Invalid response data format');
        }
      } catch (err) {
        console.error('Error generating report:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        toast.error('Failed to generate report', {
          description: err instanceof Error ? err.message : 'Please try again later',
        });
      } finally {
        setLoading(false);
      }
    };

    if (songFile) {
      generateReport();
    }
  }, [songFile]);

  const formatScoreData = () => {
    if (!reportData) return {};

    const { scores, arReport } = reportData.evaluation;
    
    return {
      "Genre": "AI Analysis",
      "A Score": scores.aScore.toFixed(1),
      "Technical Score": scores.technicalScore.toFixed(1),
      "Final Score": scores.finalScore.toFixed(1),
      "Commercial Potential": arReport.commercialPotential,
      "Target Audience": arReport.targetAudience,
      "Recommendation": reportData.evaluation.mintIP === "Yes" 
        ? "Strong candidate for minting" 
        : "Not recommended for minting"
    };
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-lg p-6 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-indigo-600/80 rounded-full mr-4">
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Vibez Report</h3>
            <p className="text-gray-400 text-sm">
              {loading ? "Analyzing your track..." : error ? "Analysis failed" : `Analysis for "${songFile.name}"`}
            </p>
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
              <p className="text-gray-400 ml-3">Processing your audio with AI...</p>
            </div>
            <Skeleton className="h-4 w-full bg-gray-700/60" />
            <Skeleton className="h-4 w-3/4 bg-gray-700/60" />
            <Skeleton className="h-4 w-5/6 bg-gray-700/60" />
            <Skeleton className="h-4 w-2/3 bg-gray-700/60" />
            <Skeleton className="h-4 w-4/5 bg-gray-700/60" />
            <Skeleton className="h-4 w-3/4 bg-gray-700/60" />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-400 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {reportData && (
              <>
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Executive Summary</h4>
                  <p className="text-gray-300">{reportData.evaluation.arReport.executiveSummary}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(formatScoreData()).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-700/50 pb-2">
                      <p className="text-gray-400 text-sm capitalize">{key}</p>
                      <p className="text-white font-medium">{value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Key Strengths</h4>
                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                      {reportData.evaluation.arReport.keyStrengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Improvement Areas</h4>
                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                      {reportData.evaluation.arReport.improvementAreas.map((area, idx) => (
                        <li key={idx}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Detailed Scores</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(reportData.evaluation.scores)
                      .filter(([key]) => !['aScore', 'technicalScore', 'finalScore'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-700/30 pb-1">
                          <span className="text-gray-400 text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-white font-medium">{value}/5</span>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-8 border-t border-gray-700/50 pt-6">
              <h4 className="text-lg font-medium text-white mb-4">
                {reportData && reportData.evaluation.mintIP === "Yes" 
                  ? "This track shows strong potential! Ready to mint?" 
                  : "Would you like to mint this track on Story Protocol?"}
              </h4>
              <div className="flex space-x-4">
                <Button 
                  onClick={() => onChooseMint(true)}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Check className="mr-2 h-4 w-4" /> Yes, mint my IP
                </Button>
                <Button 
                  onClick={onCancel}  // Use the new onCancel prop
                  variant="outline" 
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <X className="mr-2 h-4 w-4" /> No, not now
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerateVibezReport;
