import React from 'react';
import { commonEmojis } from '../data/constantsData';

const EmojiPicker = ({ onEmojiClick }) => {
  return (
    <div className="absolute bottom-20 left-6 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-4 z-10">
      <div className="grid grid-cols-6 gap-2 w-64">
        {commonEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiClick(emoji)}
            className="text-2xl hover:bg-gray-700 rounded p-2 transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;