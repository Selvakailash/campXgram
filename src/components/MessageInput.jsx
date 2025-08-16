import React from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

const MessageInput = ({ 
  newMessage, 
  setNewMessage,
  onSendMessage,
  onKeyPress,
  isTimedOut,
  getRemainingTimeoutTime,
  selectedClub,
  userWarnings,
  showEmojiPicker,
  setShowEmojiPicker,
  onEmojiClick,
  onFileSelect,
  fileInputRef,
  onFileChange
}) => {
  return (
    <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 relative">
      {showEmojiPicker && (
        <EmojiPicker onEmojiClick={onEmojiClick} />
      )}

      <div className="flex items-center space-x-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept="*/*"
        />
        
        <button 
          onClick={onFileSelect}
          className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={isTimedOut ? `Timed out - ${getRemainingTimeoutTime()} remaining` : `Message #${selectedClub.name.toLowerCase().replace(' ', '-')}`}
            disabled={isTimedOut}
            className={`w-full px-4 py-3 border border-gray-600 rounded-3xl focus:outline-none focus:ring-2 focus:border-transparent resize-none text-white placeholder-gray-400 ${
              isTimedOut 
                ? 'bg-red-900/20 focus:ring-red-500 cursor-not-allowed' 
                : 'bg-gray-700 focus:ring-purple-500'
            }`}
            rows="1"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          {userWarnings > 0 && !isTimedOut && (
            <div className="absolute -top-8 left-0 text-xs text-yellow-400">
              ⚠️ Warnings: {userWarnings}/2
            </div>
          )}
        </div>
        
        <button 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>
        
        <button
          onClick={onSendMessage}
          disabled={!newMessage.trim() || isTimedOut}
          className={`p-2 rounded-full transition-colors ${
            newMessage.trim() && !isTimedOut
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;