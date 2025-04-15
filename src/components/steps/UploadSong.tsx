
import React, { useState } from 'react';
import { Upload, Music } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UploadSongProps {
  onComplete: (file: File) => void;
}

const UploadSong: React.FC<UploadSongProps> = ({ onComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.includes('audio/')) {
      alert('Please upload an audio file');
      return;
    }
    
    setFile(file);
    simulateUpload(file);
  };

  const simulateUpload = (file: File) => {
    setUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onComplete(file);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={`relative border-2 border-dashed p-8 rounded-lg flex flex-col items-center justify-center min-h-[16rem] transition-colors
          ${dragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 bg-gray-800/50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          accept="audio/*"
          onChange={handleChange}
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center text-center pointer-events-none">
          {uploading ? (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-indigo-600/20 flex items-center justify-center">
                <Music className="h-8 w-8 text-indigo-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Uploading your track...
              </h3>
              <div className="w-full max-w-md mb-2">
                <Progress value={progress} className="h-2 bg-gray-700" />
              </div>
              <p className="text-gray-400">{Math.round(progress)}% complete</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-700 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Drag & Drop your audio file
              </h3>
              <p className="text-gray-400 mb-4">
                or click to browse your files
              </p>
              <p className="text-gray-500 text-sm">
                Supports MP3, WAV, FLAC (max 50MB)
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadSong;
