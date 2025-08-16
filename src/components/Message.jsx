import React from 'react';

const Message = ({ message }) => {
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getAvatarColor = (sender) => {
    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-indigo-500', 'bg-amber-500'];
    return colors[sender.length % colors.length];
  };

  return (
    <div className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-xs lg:max-w-md ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {!message.isCurrentUser && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAvatarColor(message.sender)} flex-shrink-0`}>
            {message.avatar}
          </div>
        )}
        
        <div className="flex flex-col">
          {!message.isCurrentUser && (
            <span className="text-xs text-gray-500 mb-1 px-2">{message.sender}</span>
          )}
          <div
            className={`px-4 py-2 rounded-2xl ${
              message.isCurrentUser
                ? 'bg-purple-600 text-white rounded-br-sm'
                : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-sm'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <p className={`text-xs mt-1 ${message.isCurrentUser ? 'text-purple-200' : 'text-gray-500'}`}>
              {formatTime(message.timestamp)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;