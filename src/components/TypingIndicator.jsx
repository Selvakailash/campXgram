import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-end space-x-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium bg-gray-600">
          CM
        </div>
        <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;