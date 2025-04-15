
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const Header = () => {
  const { address } = useAccount();

  return (
    <header className="bg-gray-900/40 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-white hover:text-purple-400 transition-colors">
                AGENTS GOT TALENT
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/studio"
                className="border-transparent text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
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
    </header>
  );
};

export default Header;
