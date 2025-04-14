
'use client';
import { ExternalLink, Sparkles, Wand2 } from 'lucide-react';

export default function Index() {
  return (
    <div className="flex flex-col items-center">
      {/* Page Title Section */}
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">WZRD.tech Studio</h1>
        <p className="text-gray-400 text-lg">Create magical digital experiences...</p>
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
      
      {/* Middle Two Horizontal Cards */}
      <div className="w-full max-w-3xl space-y-6 mb-10">
        {/* WZRD.tech Creative Studio Card */}
        <div className="rounded-lg p-6 relative bg-gradient-to-r from-purple-500/70 via-indigo-600/70 to-blue-700/70 backdrop-blur-sm border border-purple-500/30">
          <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
          </div>
          
          <div className="ml-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">WZRD.tech Creative Studio</h2>
              <p className="text-gray-200 mt-1">Design, create, and collaborate on digital experiences</p>
            </div>
            <button className="flex items-center gap-1 bg-white/90 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-white">
              Visit WZRD.tech <ExternalLink size={16} />
            </button>
          </div>
        </div>
        
        {/* WZRD.Work Card */}
        <div className="rounded-lg p-6 relative bg-gradient-to-r from-cyan-600/70 via-blue-700/70 to-indigo-800/70 backdrop-blur-sm border border-blue-500/30">
          <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
          </div>
          
          <div className="ml-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">WZRD.Work</h2>
              <p className="text-gray-200 mt-1">Enhance workflow productivity with magical tools</p>
            </div>
            <button className="flex items-center gap-1 bg-white/90 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-white">
              Visit WZRD.Work <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Three Vertical Cards */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Visual Design Tools Card */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-gray-800 font-semibold text-lg">Visual Design Tools</h3>
          <p className="text-gray-600 text-sm mt-1">Create stunning visuals with intuitive design tools</p>
        </div>
        
        {/* AI Content Generation Card */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-gray-800 font-semibold text-lg">AI Content Generation</h3>
          <p className="text-gray-600 text-sm mt-1">Generate text, images, and code with advanced AI</p>
        </div>
        
        {/* Interactive Prototyping Card */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-gray-800 font-semibold text-lg">Interactive Prototyping</h3>
          <p className="text-gray-600 text-sm mt-1">Build interactive demos and prototypes quickly</p>
        </div>
      </div>
    </div>
  );
}
