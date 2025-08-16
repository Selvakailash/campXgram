import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const MessagesList = ({ messages, selectedClub, isTyping, messagesEndRef }) => {
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="text-center py-12">
          <div className={`${selectedClub.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <selectedClub.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Welcome to {selectedClub.name}!</h3>
          <p className="text-gray-400">{selectedClub.description}</p>
          <p className="text-gray-500 text-sm mt-2">Start a conversation with your club members</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;