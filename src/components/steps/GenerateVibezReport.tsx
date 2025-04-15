
import React, { useState, useEffect } from 'react';
import { FileText, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface GenerateVibezReportProps {
  songFile: File;
  onChooseMint: (shouldMint: boolean) => void;
}

const GenerateVibezReport: React.FC<GenerateVibezReportProps> = ({ songFile, onChooseMint }) => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate API call to generate report
      setReportData({
        genre: "Trap Soul",
        energy: "High",
        danceability: "Medium",
        mood: "Introspective",
        tempo: "98 BPM",
        keySignature: "C Minor",
        uniqueElements: "Eastern-influenced melody, sub bass pattern",
        commercialPotential: "High - Streaming & Sync",
        recommendation: "Strong candidate for sync licensing"
      });
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [songFile]);

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
              {loading ? "Analyzing your track..." : `Analysis for "${songFile.name}"`}
            </p>
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-gray-700/60" />
            <Skeleton className="h-4 w-3/4 bg-gray-700/60" />
            <Skeleton className="h-4 w-5/6 bg-gray-700/60" />
            <Skeleton className="h-4 w-2/3 bg-gray-700/60" />
            <Skeleton className="h-4 w-4/5 bg-gray-700/60" />
            <Skeleton className="h-4 w-3/4 bg-gray-700/60" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {reportData && Object.entries(reportData).map(([key, value]) => (
                <div key={key} className="border-b border-gray-700/50 pb-2">
                  <p className="text-gray-400 text-sm capitalize">{key}</p>
                  <p className="text-white font-medium">{value}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 border-t border-gray-700/50 pt-6">
              <h4 className="text-lg font-medium text-white mb-4">Ready to mint this track on Story Protocol?</h4>
              <div className="flex space-x-4">
                <Button 
                  onClick={() => onChooseMint(true)}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Check className="mr-2 h-4 w-4" /> Yes, mint my IP
                </Button>
                <Button 
                  onClick={() => onChooseMint(false)}
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
