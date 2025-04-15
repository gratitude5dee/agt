
import React, { useState, useEffect } from 'react';
import { Film, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface GenerateMusicVideoProps {
  songFile: File;
  onComplete: () => void;
}

const GenerateMusicVideo: React.FC<GenerateMusicVideoProps> = ({ songFile, onComplete }) => {
  const [generating, setGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (generating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setGenerating(false);
            // This would normally be a real URL to the generated video
            setVideoUrl("https://example.com/generated-video.mp4");
            onComplete();
            return 100;
          }
          return prev + 1;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [generating, onComplete]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-lg p-6 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-blue-600/80 rounded-full mr-4">
            <Film className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Music Video Generator</h3>
            <p className="text-gray-400 text-sm">
              {generating 
                ? "Creating a unique visual experience for your track..." 
                : "Your music video is ready!"}
            </p>
          </div>
        </div>

        {generating ? (
          <div className="space-y-4">
            <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Film className="h-12 w-12 text-blue-400 mb-3 mx-auto animate-pulse" />
                <p className="text-blue-300 font-medium">Generating visuals</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Generation progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" />
            </div>
            <p className="text-sm text-gray-500">
              This may take a few minutes. We're creating AI-generated visuals based on your track's mood and energy.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="aspect-video bg-black/70 rounded-lg flex items-center justify-center relative">
              {/* This would be replaced with an actual video player or thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 rounded-lg" />
              <Button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center">
                <Play className="h-8 w-8 text-indigo-700 ml-1" />
              </Button>
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-lg font-medium">{songFile.name.replace(/\.[^/.]+$/, "")}</p>
                <p className="text-gray-300 text-sm">AI-generated music video</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm text-gray-400">
                Your video is ready to view and download
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="text-blue-400 border-blue-800/50 hover:bg-blue-950/30"
                onClick={() => window.open(videoUrl || "#", "_blank")}
              >
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateMusicVideo;
