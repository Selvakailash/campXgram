import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, ArrowLeft, Users, Hash } from 'lucide-react';
import { clubs } from './data/clubsData';
import { clubMessages } from './data/messagesData';
import { profanityWords, commonEmojis } from './data/constantsData';
import { checkForProfanity } from './utils/moderationUtils';
import ClubsList from './components/ClubsList';
import ChatHeader from './components/ChatHeader';
import MessagesList from './components/MessagesList';
import MessageInput from './components/MessageInput';
import WarningModal from './components/WarningModal';

const ClubChatSystem = () => {
  const [currentView, setCurrentView] = useState('clubs');
  const [selectedClub, setSelectedClub] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userWarnings, setUserWarnings] = useState(0);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timeoutEnd, setTimeoutEnd] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleWarningSystem = () => {
    const newWarningCount = userWarnings + 1;
    setUserWarnings(newWarningCount);
    
    if (newWarningCount === 1) {
      setWarningMessage('⚠️ Warning 1/2: Please keep the conversation respectful. Hate speech and profanity are not allowed.');
      setShowWarningModal(true);
    } else if (newWarningCount === 2) {
      setWarningMessage('⚠️ Final Warning 2/2: This is your last warning. Any further inappropriate messages will result in a timeout.');
      setShowWarningModal(true);
    } else if (newWarningCount >= 3) {
      const timeoutDuration = 10 * 60 * 1000;
      const endTime = new Date(Date.now() + timeoutDuration);
      setTimeoutEnd(endTime);
      setIsTimedOut(true);
      setWarningMessage('🚫 You have been timed out for 10 minutes due to repeated inappropriate messages. Please reflect on maintaining respectful communication.');
      setShowWarningModal(true);
      
      setTimeout(() => {
        setIsTimedOut(false);
        setTimeoutEnd(null);
        setUserWarnings(0);
      }, timeoutDuration);
    }
  };

  const getRemainingTimeoutTime = () => {
    if (!timeoutEnd) return '';
    const now = new Date();
    const remaining = timeoutEnd - now;
    if (remaining <= 0) return '';
    
    const minutes = Math.floor(remaining / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClubSelect = (club) => {
    setSelectedClub(club);
    setMessages(clubMessages[club.id] || []);
    setCurrentView('chat');
  };

  const handleBackToClubs = () => {
    setCurrentView('clubs');
    setSelectedClub(null);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    if (isTimedOut) {
      setWarningMessage(`🚫 You are still timed out. Time remaining: ${getRemainingTimeoutTime()}`);
      setShowWarningModal(true);
      return;
    }
    
    if (checkForProfanity(newMessage, profanityWords)) {
      handleWarningSystem();
      setNewMessage('');
      return;
    }

    const message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
      isCurrentUser: true,
      avatar: 'ME'
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'Great point!',
        'Thanks for sharing!',
        'I totally agree 💯',
        'Interesting perspective!',
        'Love this discussion!'
      ];
      const response = {
        id: messages.length + 2,
        sender: 'Club Member',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isCurrentUser: false,
        avatar: 'CM'
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        content: `📎 Shared a file: ${file.name}`,
        timestamp: new Date(),
        isCurrentUser: true,
        avatar: 'ME',
        isFile: true
      };
      setMessages([...messages, message]);
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (currentView === 'clubs') {
    return <ClubsList clubs={clubs} onClubSelect={handleClubSelect} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <ChatHeader 
        selectedClub={selectedClub}
        onBackToClubs={handleBackToClubs}
      />

      <MessagesList 
        messages={messages}
        selectedClub={selectedClub}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        isTimedOut={isTimedOut}
        getRemainingTimeoutTime={getRemainingTimeoutTime}
        selectedClub={selectedClub}
        userWarnings={userWarnings}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        onEmojiClick={handleEmojiClick}
        onFileSelect={handleFileSelect}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
      />

      <WarningModal
        showWarningModal={showWarningModal}
        setShowWarningModal={setShowWarningModal}
        userWarnings={userWarnings}
        warningMessage={warningMessage}
        getRemainingTimeoutTime={getRemainingTimeoutTime}
      />
    </div>
  );
};

export default ClubChatSystem;