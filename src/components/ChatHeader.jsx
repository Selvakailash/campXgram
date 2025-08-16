import React from 'react';
import { ArrowLeft, Users, Hash } from 'lucide-react';

const ChatHeader = ({ selectedClub, onBackToClubs }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button 
          onClick={onBackToClubs}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </button>
        
        <div className={`${selectedClub.color} p-2 rounded-lg`}>
          <selectedClub.icon className="w-6 h-6 text-white" />
        </div>
        
        <div>
          <h2 className="font-semibold text-white flex items-center">
            <Hash className="w-4 h-4 mr-1 text-gray-500" />
            {selectedClub.name}
          </h2>
          <p className="text-sm text-gray-400">{selectedClub.members} members</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-full transition-colors">
          <Users className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;