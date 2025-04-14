
import { Settings } from 'lucide-react';
import { ONCHAINKIT_LINK } from '@/links';
import OnchainkitSvg from '@/svg/OnchainkitSvg';
import LoginButton from '@/components/LoginButton';
import SignupButton from '@/components/SignupButton';
import { useAccount } from 'wagmi';

export default function Header() {
  const { address } = useAccount();

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-gray-900/30">
      <div className="flex items-center">
        <a
          href={ONCHAINKIT_LINK}
          title="onchainkit"
          target="_blank"
          rel="noreferrer"
          className="text-white"
        >
          <OnchainkitSvg />
        </a>
      </div>
      
      <div className="flex items-center gap-3">
        <SignupButton />
        {!address && <LoginButton />}
        <button 
          className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
          aria-label="Settings"
        >
          <Settings className="text-gray-300" size={20} />
        </button>
      </div>
    </header>
  );
}
