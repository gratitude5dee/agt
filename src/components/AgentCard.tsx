
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AgentProps {
  agent: {
    name: string;
    specialty: string;
    avatar: string;
    color: string;
  };
}

const AgentCard: React.FC<AgentProps> = ({ agent }) => {
  return (
    <div className="relative group w-full h-full">
      {/* Card background with gradient */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${agent.color} opacity-50 transform transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-70`}></div>
      
      {/* Card content */}
      <div className="relative bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden flex flex-col h-[320px] transform transition-all duration-300 group-hover:scale-[1.02]">
        {/* Avatar */}
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
            <img 
              src={agent.avatar} 
              alt={agent.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
        </div>
        
        {/* Details */}
        <div className="p-6 bg-gray-900/80 backdrop-blur-sm text-center">
          <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
          <p className="text-gray-300 text-sm mb-4">{agent.specialty}</p>
          <a 
            href="#" 
            className="inline-flex items-center text-sm font-medium text-white bg-gray-800/60 hover:bg-gray-700/60 px-4 py-2 rounded-lg transition-colors"
          >
            View Profile
            <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
