import React, { useState } from 'react';
import { Wand2, ArrowLeft, Mic, Sparkles } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import WalletWrapper from '@/components/WalletWrapper';
import StepIndicator from '@/components/steps/StepIndicator';
import UploadSong from '@/components/steps/UploadSong';
import GenerateVibezReport from '@/components/steps/GenerateVibezReport';
import GenerateMusicVideo from '@/components/steps/GenerateMusicVideo';
import MintIP from '@/components/steps/MintIP';
import { TheatricalButton } from '@/components/ui/theatrical-button';
import { TheatricalGlassCard } from '@/components/ui/theatrical-glass-card';
import { TheatricalText } from '@/components/ui/theatrical-text';
import LightBeams from '@/components/theatrical/LightBeams';

type Step = {
  id: number;
  label: string;
  status: 'upcoming' | 'current' | 'completed';
};

const HomePage = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [songFile, setSongFile] = useState<File | null>(null);
  const [shouldMint, setShouldMint] = useState(false);
  
  const steps: Step[] = [
    { 
      id: 1, 
      label: 'Upload Song', 
      status: currentStepIndex === 0 ? 'current' : currentStepIndex > 0 ? 'completed' : 'upcoming'
    },
    { 
      id: 2, 
      label: 'Generate Vibez Report', 
      status: currentStepIndex === 1 ? 'current' : currentStepIndex > 1 ? 'completed' : 'upcoming'
    },
    { 
      id: 3, 
      label: 'Generate Music Video', 
      status: currentStepIndex === 2 ? 'current' : currentStepIndex > 2 ? 'completed' : 'upcoming'
    },
    { 
      id: 4, 
      label: 'Mint IP', 
      status: currentStepIndex === 3 ? 'current' : currentStepIndex > 3 ? 'completed' : 'upcoming'
    },
  ];

  const handleUploadComplete = (file: File) => {
    setSongFile(file);
    setCurrentStepIndex(1);
  };

  const handleChooseMint = (mint: boolean) => {
    setShouldMint(mint);
    setCurrentStepIndex(2); // Move to Generate Music Video step
  };

  const handleVideoComplete = () => {
    // Reset the flow or show a completion screen
    console.log("Minting complete");
  };

  const handleMintComplete = () => {
    // Reset the flow or show a completion screen
    console.log("Minting complete");
  };

  // New method to handle returning to upload song
  const handleCancelVibezReport = () => {
    setSongFile(null); // Reset song file
    setCurrentStepIndex(0); // Return to upload song step
  };

  const renderCurrentStep = () => {
    if (!address) {
      return (
        <div className="w-full flex justify-center">
          <WalletWrapper
            className="w-full max-w-md"
            text="Connect wallet to start"
          />
        </div>
      );
    }

    switch (currentStepIndex) {
      case 0:
        return <UploadSong onComplete={handleUploadComplete} />;
      case 1:
        return songFile && (
          <GenerateVibezReport 
            songFile={songFile} 
            onChooseMint={handleChooseMint}
            onCancel={handleCancelVibezReport}  // Pass the new cancel handler
          />
        );
      case 2:
        return songFile && <GenerateMusicVideo songFile={songFile} onComplete={handleVideoComplete} />;
      case 3:
        return songFile && <MintIP songFile={songFile} onComplete={handleMintComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Background light effects */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <LightBeams beamCount={8} intensity="low" agtStyle={false} />
      </div>
      
      {/* Back Button with enhanced design */}
      <div className="self-start mb-6 z-10">
        <TheatricalButton 
          variant="default"
          className="group relative px-5 py-2.5 text-white/90 hover:text-white transition-all duration-500 
            backdrop-blur-md bg-gradient-to-r from-premium-purple/20 to-premium-navy/20 
            border border-white/10 
            shadow-[0_4px_15px_rgba(108,92,231,0.2)] 
            hover:shadow-[0_8px_25px_rgba(108,92,231,0.4)]
            hover:border-white/20
            hover:-translate-y-0.5"
          onClick={() => navigate('/')}
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
            <span className="font-medium tracking-wide">Back to Home</span>
          </div>
          <div className="absolute inset-0 rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7]/5 to-[#00D2FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6C5CE7]/0 via-[#6C5CE7]/10 to-[#6C5CE7]/0 
              opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
          </div>
        </TheatricalButton>
      </div>

      {/* Page Title Section */}
      <div className="text-center mb-12 mt-8 z-10">
        <TheatricalText 
          as="h1" 
          variant="agt-title"
          glow={true}
          letterSpacing="wider" 
          className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
        >
          VIBEZMASTER
        </TheatricalText>
        <p className="text-gray-400 text-lg tracking-wide relative overflow-hidden">
          <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-[#00D2FF] after:to-[#FF00E5] after:scale-x-0 after:animate-[pulse_4s_ease-in-out_infinite]">
            UniversalAI A&amp;R, Cultural Curator, &amp; Vibezmaster Extraordinare ...
          </span>
        </p>
      </div>
      
      {/* Top Studio Card */}
      <TheatricalGlassCard 
        variant="primary"
        gradient="primary"
        glow="medium"
        hover="raise"
        beams={true}
        noise={true}
        innerGlow={true}
        threed={true}
        className="w-full max-w-3xl mb-8 z-10"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-[#6C5CE7] to-[#6050DC] rounded-full relative overflow-hidden group">
            <Wand2 className="text-white relative z-10" size={24} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D2FF] to-[#FF00E5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6C5CE7] to-[#FF00E5] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Studio</h2>
            <p className="text-gray-400 tracking-wide">Advanced creative wizardry tools</p>
          </div>
          <div className="ml-auto">
            <Sparkles className="text-[#00D2FF] opacity-60 h-5 w-5 animate-pulse" />
          </div>
        </div>
      </TheatricalGlassCard>
      
      {/* Multi-step Creation Flow */}
      <TheatricalGlassCard 
        variant="default"
        gradient="subtle"
        glow="subtle"
        size="default"
        className="w-full max-w-3xl mb-8 z-10"
        noise={true}
      >
        {address && <StepIndicator steps={steps} currentStep={currentStepIndex + 1} />}
        {renderCurrentStep()}
      </TheatricalGlassCard>
    </div>
  );
};

export default HomePage;
