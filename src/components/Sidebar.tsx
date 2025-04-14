
import { useAccount } from 'wagmi';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  RadioTower, 
  Book, 
  BrainCircuit, 
  Headphones, 
  Infinity, 
  Users, 
  FolderKanban, 
  Bot, 
  Building, 
  Share2, 
  Landmark, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Avatar, Name } from '@coinbase/onchainkit/identity';

const Sidebar = () => {
  const { address } = useAccount();

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-indigo-900 to-blue-950 text-gray-200 flex flex-col">
      {/* Logo/Header Section */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          5
        </div>
        <div>
          <h1 className="font-bold text-lg">UniversalAI</h1>
          <p className="text-xs text-gray-400">Next-Gen Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-2 py-4">
        <ul className="space-y-1">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-2 py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/wzrd" 
              className={({ isActive }) => 
                `flex items-center gap-2 py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <RadioTower size={18} />
              <span>WZRD.tech</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/studio" 
              className={({ isActive }) => 
                `flex items-center gap-2 py-2 px-4 pl-8 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <span>Studio</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/library" 
              className={({ isActive }) => 
                `flex items-center gap-2 py-2 px-4 pl-8 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <span>Library</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/deep-research" 
              className={({ isActive }) => 
                `flex items-center gap-2 py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <BrainCircuit size={18} />
              <span>DeepResearch</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/podcasts" 
              className={({ isActive }) => 
                `flex items-center gap-2 py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <Headphones size={18} />
              <span>Generative Podcasts</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/infinite-library" 
              className={({ isActive }) => 
                `flex items-center gap-2 py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <Infinity size={18} />
              <span>Infinite Library</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/companions" 
              className={({ isActive }) => 
                `flex items-center gap-2 py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <Users size={18} />
              <span>Companions</span>
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                `flex items-center justify-between py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <div className="flex items-center gap-2">
                <FolderKanban size={18} />
                <span>Projects</span>
              </div>
              <ChevronRight size={16} />
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/agents" 
              className={({ isActive }) => 
                `flex items-center justify-between py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <div className="flex items-center gap-2">
                <Bot size={18} />
                <span>Agents</span>
              </div>
              <ChevronRight size={16} />
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/assets" 
              className={({ isActive }) => 
                `flex items-center justify-between py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <div className="flex items-center gap-2">
                <Building size={18} />
                <span>Real World Assets</span>
              </div>
              <ChevronRight size={16} />
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/distribution" 
              className={({ isActive }) => 
                `flex items-center justify-between py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <div className="flex items-center gap-2">
                <Share2 size={18} />
                <span>Distribution</span>
              </div>
              <ChevronRight size={16} />
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/treasury" 
              className={({ isActive }) => 
                `flex items-center justify-between py-2 px-4 rounded-md ${isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-800'}`
              }
            >
              <div className="flex items-center gap-2">
                <Landmark size={18} />
                <span>Treasury</span>
              </div>
              <ChevronRight size={16} />
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Divider */}
      <hr className="border-gray-700 my-2 mx-4" />

      {/* Wallet Connection/Logout Section */}
      <div className="p-4">
        {address ? (
          <Wallet>
            <div className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-blue-800">
              <Avatar className="h-6 w-6" />
              <Name />
            </div>
          </Wallet>
        ) : (
          <ConnectWallet 
            text="Connect Wallet" 
            className="w-full flex items-center gap-2 py-2 px-4 rounded-md hover:bg-blue-800"
          >
            <LogOut size={18} />
            <span>Connect Wallet</span>
          </ConnectWallet>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
