
export const useSurveyQuotes = () => {
  // Generate motivational quote based on name
  const generateQuote = (name: string): string => {
    if (!name) return "";
    
    const quotes = [
      `${name} is gonna carry the boats!`,
      `${name}, today is your day to become the best version of yourself!`,
      `${name}, you're stronger than your excuses!`,
      `Every champion was once a contender who refused to give up. You've got this, ${name}!`,
      `${name}, you're not just building a body, you're building character!`,
      `${name}, dream it. Believe it. Achieve it.`,
      `${name}, strength doesn't come from what you can do. It comes from overcoming what you once couldn't.`,
      `The only bad workout is the one that didn't happen. Let's crush it, ${name}!`
    ];
    
    // Get a stable quote based on the first letter of the name
    const nameFirstChar = name.charAt(0).toLowerCase();
    const index = nameFirstChar.charCodeAt(0) % quotes.length;
    
    return quotes[index];
  };

  return {
    generateQuote
  };
};
