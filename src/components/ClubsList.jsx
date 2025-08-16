import React from 'react';
import { Users } from 'lucide-react';

const ClubsList = ({ clubs, onClubSelect }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">campXgram Clubs</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>Add Clubs +</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => {
            const IconComponent = club.icon;
            return (
              <div
                key={club.id}
                onClick={() => onClubSelect(club)}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 hover:border-purple-500/50 transition-all duration-200 cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${club.color} p-3 rounded-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-500">{club.lastActivity}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{club.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{club.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{club.members} members</span>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 font-medium text-sm">
                    Join Club Chatroom →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClubsList;