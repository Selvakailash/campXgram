export const checkForProfanity = (message, profanityWords) => {
  const lowerMessage = message.toLowerCase();
  
  for (const language in profanityWords) {
    for (const word of profanityWords[language]) {
      const lowerWord = word.toLowerCase();
      if (lowerMessage.includes(lowerWord)) {
        return true;
      }
      
      const wordBoundaryRegex = new RegExp(`\\b${lowerWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (wordBoundaryRegex.test(lowerMessage)) {
        return true;
      }
    }
  }
  
  const hatePatterns = [
    /\b(kill\s*(yourself|urself|u)|kys|go\s*die)\b/i,
    /\b(fuck\s*(off|you|this)|fucking\s*(idiot|moron))\b/i,
    /\b(rape|molest|terrorist)\b/i
  ];
  
  return hatePatterns.some(pattern => pattern.test(lowerMessage));
};