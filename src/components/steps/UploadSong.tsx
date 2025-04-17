
import React, { useState } from 'react';
import { Upload, Music, FileMusic, FileAudio, Mic } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { TheatricalButton } from '@/components/ui/theatrical-button';

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

  const getFileIcon = (mimetype: string) => {
    if (mimetype.includes('mp3')) return <FileMusic className="h-5 w-5 text-blue-400" />;
    if (mimetype.includes('wav')) return <FileAudio className="h-5 w-5 text-green-400" />;
    return <FileAudio className="h-5 w-5 text-purple-400" />;
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={`
          relative transition-all duration-300 rounded-xl
          ${dragActive 
            ? 'border-[3px] border-dashed border-[#6C5CE7] bg-indigo-500/10 shadow-[0_0_20px_rgba(108,92,231,0.3)]' 
            : 'border-2 border-dashed border-gray-700 bg-gray-800/50'
          }
        `}
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
        
        <div className="flex flex-col items-center text-center pointer-events-none p-8 min-h-[16rem] justify-center">
          {uploading ? (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-indigo-600/20 flex items-center justify-center relative overflow-hidden">
                <Music className="h-8 w-8 text-indigo-400 animate-pulse relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00D2FF]/20 to-[#FF00E5]/20 animate-pulse"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-4 tracking-wide">
                Uploading your track...
              </h3>
              <div className="w-full max-w-md mb-3 relative">
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#00D2FF] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6C5CE7]/0 via-[#6C5CE7]/30 to-[#6C5CE7]/0 blur-[2px]"></div>
              </div>
              <p className="text-gray-400">{Math.round(progress)}% complete</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#2D3748] to-[#1A202C] flex items-center justify-center relative group overflow-hidden shadow-[0_0_20px_rgba(108,92,231,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7]/0 to-[#6C5CE7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Mic className="h-8 w-8 text-[#6C5CE7] group-hover:text-white transition-all duration-300 transform group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3 tracking-wide group-hover:text-[#6C5CE7]">
                Drag & Drop your audio file
              </h3>
              <TheatricalButton
                variant="default"
                className="group relative mb-4 px-6 py-2.5 
                  bg-gradient-to-r from-premium-purple to-premium-navy hover:from-[#7d6ef5] hover:to-[#364a63]
                  text-white font-medium tracking-wide
                  border border-white/10 
                  shadow-[0_4px_15px_rgba(108,92,231,0.2)]
                  hover:shadow-[0_8px_25px_rgba(108,92,231,0.4)]
                  hover:border-white/20
                  hover:-translate-y-0.5
                  transition-all duration-500
                  overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Upload className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12" />
                  <span>Browse files</span>
                </div>
                <div className="absolute inset-0 rounded-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7]/5 to-[#00D2FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6C5CE7]/0 via-[#6C5CE7]/10 to-[#6C5CE7]/0 
                    opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                </div>
              </TheatricalButton>
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center px-3 py-1.5 rounded-full bg-gray-800/80 border border-gray-700/50 transition-all duration-300 hover:bg-gray-700/80 hover:border-gray-600/50">
                  <FileMusic className="h-4 w-4 text-[#00D2FF] mr-1.5" />
                  <span className="text-xs font-medium text-gray-300">MP3</span>
                </div>
                <div className="flex items-center px-3 py-1.5 rounded-full bg-gray-800/80 border border-gray-700/50 transition-all duration-300 hover:bg-gray-700/80 hover:border-gray-600/50">
                  <FileAudio className="h-4 w-4 text-[#FF00E5] mr-1.5" />
                  <span className="text-xs font-medium text-gray-300">WAV</span>
                </div>
                <div className="flex items-center px-3 py-1.5 rounded-full bg-gray-800/80 border border-gray-700/50 transition-all duration-300 hover:bg-gray-700/80 hover:border-gray-600/50">
                  <FileAudio className="h-4 w-4 text-[#6C5CE7] mr-1.5" />
                  <span className="text-xs font-medium text-gray-300">FLAC</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Maximum file size: 50MB
              </p>
            </>
          )}
        </div>
        
        {dragActive && (
          <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-noise"></div>
            <div className="absolute inset-[-2px] rounded-xl border-[3px] border-[#6C5CE7]/30 animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSong;
