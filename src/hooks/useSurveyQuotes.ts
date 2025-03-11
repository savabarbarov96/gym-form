export const useSurveyQuotes = () => {
  // Generate motivational quote based on name
  const generateQuote = (name: string): string => {
    if (!name) return "";
    
    const quotes = [
      `${name}, ти ще успееш!`,
      `${name}, днес е твоят ден да станеш най-добрата версия на себе си!`,
      `${name}, ти си по-силен/на от твоите оправдания!`,
      `Всеки шампион някога е бил претендент, който е отказал да се предаде. Ти ще успееш, ${name}!`,
      `${name}, не просто изграждаш тяло, а изграждаш характер!`,
      `${name}, мечтай за това. Повярвай в него. Постигни го.`,
      `${name}, силата не идва от това, което можеш да направиш. Тя идва от преодоляването на това, което някога не си могъл.`,
      `Единствената лоша тренировка е тази, която не се е случила. Да го направим, ${name}!`
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
