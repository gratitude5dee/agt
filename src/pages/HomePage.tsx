
import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { useAccount } from 'wagmi';
import WalletWrapper from '@/components/WalletWrapper';
import StepIndicator from '@/components/steps/StepIndicator';
import UploadSong from '@/components/steps/UploadSong';
import GenerateVibezReport from '@/components/steps/GenerateVibezReport';
import GenerateMusicVideo from '@/components/steps/GenerateMusicVideo';
import MintIP from '@/components/steps/MintIP';

type Step = {
  id: number;
  label: string;
  status: 'upcoming' | 'current' | 'completed';
};

const HomePage = () => {
  const { address } = useAccount();
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
    if (shouldMint) {
      setCurrentStepIndex(3); // Move to Mint IP step
    }
  };

  const handleMintComplete = () => {
    // Reset the flow or show a completion screen
    console.log("Minting complete");
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
        return songFile && <GenerateVibezReport songFile={songFile} onChooseMint={handleChooseMint} />;
      case 2:
        return songFile && <GenerateMusicVideo songFile={songFile} onComplete={handleVideoComplete} />;
      case 3:
        return songFile && <MintIP songFile={songFile} onComplete={handleMintComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Page Title Section */}
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">VIBEZMASTER</h1>
        <p className="text-gray-400 text-lg">UniversalAI A&amp;R, Cultural Curator, &amp; Vibezmaster Extraordinare ...</p>
      </div>
      
      {/* Top Studio Card */}
      <div className="w-full max-w-3xl bg-gray-800/50 backdrop-blur-md rounded-lg p-4 mb-8 border border-gray-700/30">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-full">
            <Wand2 className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Studio</h2>
            <p className="text-gray-400">Advanced creative wizardry tools</p>
          </div>
        </div>
      </div>
      
      {/* Multi-step Creation Flow */}
      <div className="w-full max-w-3xl bg-gray-800/30 backdrop-blur-md rounded-lg p-6 mb-8 border border-gray-700/20">
        {address && <StepIndicator steps={steps} currentStep={currentStepIndex + 1} />}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default HomePage;
