
import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, CheckCircle, AlertCircle, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransactionButton } from '@/components/TransactionWrapper';

interface MintIPProps {
  songFile: File;
  onComplete: () => void;
}

type MintingStatus = 'idle' | 'preparing' | 'waiting' | 'mining' | 'success' | 'error';

const MintIP: React.FC<MintIPProps> = ({ songFile, onComplete }) => {
  const [status, setStatus] = useState<MintingStatus>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMint = () => {
    setStatus('preparing');
    
    // Simulate preparing transaction
    setTimeout(() => {
      setStatus('waiting');
      
      // Simulate waiting for user confirmation
      setTimeout(() => {
        setStatus('mining');
        
        // Simulate transaction mining
        setTimeout(() => {
          // 90% chance of success
          if (Math.random() > 0.1) {
            setStatus('success');
            setTxHash('0x' + Math.random().toString(16).substr(2, 64));
            onComplete();
          } else {
            setStatus('error');
            setError('Transaction was rejected by the network');
          }
        }, 3000);
      }, 2000);
    }, 1500);
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'preparing':
        return 'Preparing your minting transaction...';
      case 'waiting':
        return 'Please confirm the transaction in your wallet...';
      case 'mining':
        return 'Transaction submitted. Waiting for confirmation...';
      case 'success':
        return 'Successfully minted your IP on Story Protocol!';
      case 'error':
        return error || 'An error occurred during minting';
      default:
        return 'Ready to mint your IP on Story Protocol';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-lg p-6 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-purple-600/80 rounded-full mr-4">
            <Key className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Mint IP on Story Protocol</h3>
            <p className="text-gray-400">{getStatusMessage()}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="text-white font-medium mb-2">Assets to be minted</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-300">
                <div className="w-5 h-5 bg-indigo-600/30 rounded flex items-center justify-center mt-0.5 mr-2">
                  <span className="text-xs text-indigo-400">1</span>
                </div>
                <div>
                  <p className="text-gray-200">{songFile.name}</p>
                  <p className="text-gray-500 text-sm">Original Audio Track</p>
                </div>
              </li>
              <li className="flex items-start text-gray-300">
                <div className="w-5 h-5 bg-indigo-600/30 rounded flex items-center justify-center mt-0.5 mr-2">
                  <span className="text-xs text-indigo-400">2</span>
                </div>
                <div>
                  <p className="text-gray-200">Vibez Report</p>
                  <p className="text-gray-500 text-sm">AI Analysis & Commercial Insights</p>
                </div>
              </li>
              <li className="flex items-start text-gray-300">
                <div className="w-5 h-5 bg-indigo-600/30 rounded flex items-center justify-center mt-0.5 mr-2">
                  <span className="text-xs text-indigo-400">3</span>
                </div>
                <div>
                  <p className="text-gray-200">Generated Music Video</p>
                  <p className="text-gray-500 text-sm">AI-Generated Visual Content</p>
                </div>
              </li>
            </ul>
          </div>

          {status === 'success' && txHash && (
            <div className="bg-green-950/30 border border-green-800/30 rounded-lg p-4">
              <div className="flex items-center text-green-400 mb-2">
                <CheckCircle className="h-5 w-5 mr-2" />
                <h4 className="font-medium">Transaction Complete</h4>
              </div>
              <p className="text-gray-300 text-sm mb-2">Your IP has been successfully minted on the blockchain.</p>
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-gray-400">Transaction:</span>
                <a 
                  href={`https://sepolia.basescan.org/tx/${txHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  {txHash.substring(0, 6)}...{txHash.substring(txHash.length - 4)}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4">
              <div className="flex items-center text-red-400 mb-2">
                <AlertCircle className="h-5 w-5 mr-2" />
                <h4 className="font-medium">Transaction Failed</h4>
              </div>
              <p className="text-gray-300 text-sm">{error}</p>
              <Button 
                onClick={() => setStatus('idle')}
                className="mt-3 bg-red-800/50 hover:bg-red-800/70 text-white text-sm px-3 py-1 h-auto"
              >
                Try Again
              </Button>
            </div>
          )}

          {status === 'idle' && (
            <div className="flex space-x-4">
              <Button
                onClick={handleMint}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-6 text-lg"
              >
                Mint on Story Protocol
              </Button>
              <TransactionButton 
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-6 text-lg" 
                withIcon={true}
              >
                <Wallet className="mr-2" /> Transact
              </TransactionButton>
            </div>
          )}

          {['preparing', 'waiting', 'mining'].includes(status) && (
            <Button
              disabled
              className="w-full bg-gradient-to-r from-purple-800/70 to-indigo-800/70 py-6 text-lg opacity-80 cursor-not-allowed"
            >
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {status === 'preparing' ? 'Preparing...' : status === 'waiting' ? 'Awaiting Confirmation...' : 'Processing...'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintIP;
