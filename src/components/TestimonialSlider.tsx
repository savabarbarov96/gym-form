import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRound, X, ChevronLeft, ChevronRight } from "lucide-react";

// Testimonial data structure
interface Testimonial {
  name: string;
  text: string;
}

// Define all the testimonials in a single array
const testimonials: Testimonial[] = [
  {
    name: "Камелия",
    text: "Пепи, искам да споделя, че свалих за 1 месец 8кг. Благодаря ти за професионалното отношение с което ми изготви индивидуален план за хранене и тренировка."
  },
  {
    name: "Светла",
    text: "Много добър професионалист, с грижа за всеки един като индивидуалност! Имам пълно доверие в него и тренировките са ми немислими без неговата помощ!"
  },
  {
    name: "Ивана",
    text: "Много професионално отношение, разнообразна програма и учтиво отношение към клиентите."
  },
  {
    name: "Елена",
    text: "Прекрасно отношение с подробни обяснения относно тренировките и конкретните упражнения."
  },
  {
    name: "Иван",
    text: "Петър Асенов е не само изключителен специалист в своята област, но и невероятно отзивчив и разбиращ човек."
  },
  {
    name: "Силвия",
    text: "Имах нужда от правилна мотивация, обяснения, треньор, на когото мога да се доверя и от когото да се уча. Всичко това получих от Петър Асенов!"
  },
  {
    name: "Цвети",
    text: "Изключителен треньор и човек. Винаги изслушващ мнението на клиента. Знае какво прави и със страхотен, индивидуален подход към всеки един."
  },
  {
    name: "Теодора",
    text: "Започнах да тренирам с Пепи като мой персонален треньор. Пепи е професионалист, всеотдаен и мотивиращ."
  },
  {
    name: "Фатиме",
    text: "Пепи искам да изкажа голямата си благодарност за отношението към мен и професионализма с който се отнасяш към работата си!"
  },
  {
    name: "Дани",
    text: "Чудесен треньор. Търпелив, но и достатъчно строг. Обяснява по лесен и разбираем начин, разбира клиентите."
  },
  {
    name: "Красимира",
    text: "Петър е треньор, който обръща персонално внимание и много бързо предразполага към това да задаваш всякакви въпроси."
  },
  {
    name: "Елвина",
    text: "Благодаря ти, Пепи, за високия професионализъм, индивидуалния подход и търпението, които показваш към всяка тренировка!"
  },
  {
    name: "Елена",
    text: "Пепи, пожелавам ти успех във всяко начинание, с което се захванеш, защото се вижда старанието и усилията които полагаш."
  },
  {
    name: "Роси",
    text: "Искам да кажа едно голямо Благодаря на най-добрия треньор! Благодаря за съветите и за това, че ми показа правилния и здравословен начин."
  },
  {
    name: "Мария",
    text: "Изключително впечатлена съм от професионализма и добрата комуникация, с които подхожда Пепи към своите клиенти."
  },
  {
    name: "Рени",
    text: "Ти не само си страхотен треньор, но и страхотен човек! Отдаден си на работата и на това да надъхваш по свой си начин!"
  },
  {
    name: "Весела",
    text: "Две години тренирам с него. Най-силно впечатление са ми направи отговорността, професионализма и доброто отношение."
  },
  {
    name: "Митко",
    text: "Петър е изключително амбициозна, целеустремена и изпълнителна личност. Качества, които непременно треньор трябва да притежава."
  },
  {
    name: "Ася",
    text: "С Пепи работим около 6-7 месеца. През този период той беше плътно до мен в процеса на тренировки. И още за първите два месеца, отбележихме свалени 15кг."
  },
  {
    name: "Константина",
    text: "Петър Асенов е не само перфектен тренер, но и вдъхновител! С него тренировката е удоволствие!"
  },
  {
    name: "Румен",
    text: "Невероятен професионалнист, много дисциплиниран и организиран спрямо работата. Има много добро отношение и е изключително коректен!"
  },
  {
    name: "Микаела",
    text: "Петър е много добър професионалист. Млад и амбициозен е, което прави работата с него приятна и мотивираща."
  },
  {
    name: "Фатме",
    text: "Притежава всички необходими качества, за да бъде един от най-добрите: Отдаденост, желание за развитие, търпение."
  },
  {
    name: "Алина",
    text: "Стремиш се да мотивираш хората, да ги разбираш и да правиш всичко възможно да се чувстват достатъчно добре."
  },
  {
    name: "Ралица",
    text: "Пепи ти си един отдаден фитнес треньор и първия на който се доверих! Подхождаш с внимание към всеки."
  },
  {
    name: "Ирен",
    text: "С коуч Петър Асенов, тренировките не са онези, обичайните тренировки във фитнес зала. С него се работи за повишаване физическата и психическата сила."
  },
  {
    name: "Виктор",
    text: "Уникален треньор с много познания в тази сфера, винаги отворен за помощ. Благодарен съм че ми помогна да сваля 35 кг!"
  },
  {
    name: "Роси",
    text: "Петър Асенов като треньор успя да ми помогне да преодолея притеснението от фитнеса и хранителите режими. Успях да сваля 32 кг."
  },
  {
    name: "Мария",
    text: "Изключителен професионалист, който има необходимия опит и знания, съумява да ми подбира правилния тип тренировки."
  },
  {
    name: "Неби",
    text: "Petar Asenov - момчето чудо. Упорит и добросърдечен. Аз, като негова клиентка мога да споделя с чисто сьрце, че той вдъхва респект."
  }
];

interface TestimonialSliderProps {
  isOpen: boolean;
  onClose: () => void;
  autoScrollInterval?: number;
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ 
  isOpen,
  onClose,
  autoScrollInterval = 10000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Reset index when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  // Auto-scroll effect only when modal is open
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScrollInterval, isOpen]);

  // Navigation handlers
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Animation variants for testimonials
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  // Modal animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Get current testimonial
  const currentTestimonial = testimonials[currentIndex];

  // Calculate truncated text to fit in the available space
  const truncateText = (text: string, maxLength: number = 200): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal container */}
          <motion.div 
            className="bg-zinc-900 w-full max-w-2xl rounded-xl shadow-xl z-10 overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal header */}
            <div className="flex justify-between items-center p-4 border-b border-zinc-800">
              <h3 className="text-xl font-semibold text-white">Мнения на клиенти</h3>
              <button 
                onClick={onClose}
                className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal content - Testimonials */}
            <div className="p-6 relative">
              <div className="relative min-h-[180px] flex items-center justify-center">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute w-full flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center justify-center w-full text-center">
                      <div className="bg-zinc-800/90 p-4 rounded-lg shadow-inner w-full">
                        <div className="flex items-center justify-center mb-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange/20 flex justify-center items-center text-orange mr-3">
                            <UserRound size={20} />
                          </div>
                          <p className="text-xl sm:text-2xl font-medium text-orange-400">
                            {currentTestimonial.name}
                          </p>
                        </div>
                        <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                          {truncateText(currentTestimonial.text, 300)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Navigation arrows */}
              <button 
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700 p-2 rounded-r-lg text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700 p-2 rounded-l-lg text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Pagination indicator */}
              <div className="flex justify-center mt-6">
                <p className="text-sm text-gray-400">
                  {currentIndex + 1} / {testimonials.length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TestimonialSlider; 