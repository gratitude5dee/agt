import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Star } from 'lucide-react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
const Header = () => {
  const {
    address
  } = useAccount();
  return <header className="bg-gray-900/40 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl flex items-center group">
                <Star className="h-6 w-6 mr-2 text-yellow-500 group-hover:text-yellow-400 transition-colors animate-golden-pulse" />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 group-hover:from-yellow-300 group-hover:to-yellow-600 transition-colors duration-300 font-bold tracking-wider">
                  AGENTS GOT TALENT
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="judge-nameplate inline-flex items-center px-3 pt-1 border-b-2 border-yellow-500 text-sm font-medium transition-all duration-300 hover:text-yellow-300 nameplate-shine py-[3px]">
                Home
              </Link>
              <Link to="/studio" className="judge-nameplate inline-flex items-center px-3 pt-1 border-b-2 border-transparent hover:border-purple-500 hover:text-white text-sm font-medium transition-all duration-300 nameplate-shine">
                Studio
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <SignupButton />
                {!address && <LoginButton />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;