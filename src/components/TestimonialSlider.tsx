import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRound, X, ChevronLeft, ChevronRight, Star } from "lucide-react";

// Testimonial data structure
interface Testimonial {
  name: string;
  text: string;
}

// Define all the testimonials in a single array
const testimonials: Testimonial[] = [
  {
    name: "Камелия",
    text: "Пепи, искам да споделя, че свалих за 1 месец 8кг. Благодаря ти за професионалното отношение с което ми изготви индивидуален план за хранене и тренировка. Благодаря ти за ежедневната подкрепа, мотивацията и позитивното отношение, благодарение на които АЗ започнах моята промяна към по-добра визия и тонус! Ти ми показа, как стига да поискам ще успея! Ключът е постоянство и усмивка!"
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
    text: "Прекрасно отношение с подробни обяснения относно тренировките и конкретните упражнения. Човек, който вече 4 месеца ме мотивира да правя редовни тренировки, без да се замислям да се откажа и в следствие на което имам повече от добри постижения. Комбинацията от хранителен режим и тренировки проработи прекрасно. Благодаря ти!"
  },
  {
    name: "Иван",
    text: "Петър Асенов е не само изключителен специалист в своята област, но и невероятно отзивчив и разбиращ човек. Познавам го от години и винаги съм бил впечатлен от неговия начин на работа - смесица от професионализъм и лично отношение. Работата с него е удоволствие, тъй като той знае как да постига резултати, които наистина имат значение. Можете да сте спокойни, че вашето здраве е в добри ръце с такъв професионален фитнес треньор."
  },
  {
    name: "Силвия",
    text: "Имах нужда от правилна мотивация, обяснения, треньор, на когото мога да се доверя и от когото да се уча. Всичко това, та и повече получих от Петър Асенов! Благодаря!"
  },
  {
    name: "Цвети",
    text: "Изключителен треньор и човек. Винаги изслушващ мнението на клиента. Знае какво прави и със страхотен, индивидуален подход към всеки един. Разбира си от хобито, което се е превърнало в негова работа. Мил и едновременно строг, особено в храненето. Знае как да стимулира без да влиза в излишни обяснения!"
  },
  {
    name: "Теодора",
    text: "Започнах да тренирам с Пепи, като мой персонален треньор преди време. Пепи е професионалист, всеотдаен и мотивиращ. Горещо препоръчвам на всеки, който има желание да тренира, нека му се довери, ще остане доволен."
  },
  {
    name: "Фатиме",
    text: "Пепи искам да изкажа голямата си благодарност за отношението към мен и професионализма с който се отнасяш към работата си! Резултатите са повече от перфектни. Без куража който ми даваше нямаше да постигна своите цели, за което ти благодаря!"
  },
  {
    name: "Дани",
    text: "Чудесен треньор. Търпелив, но и достатъчно строг. Обяснява по лесен и разбираем начин, разбира клиентите и дава най-доброто от себе си."
  },
  {
    name: "Красимира",
    text: "Петър е треньор, който обръща персонално внимание и много бързо предразполага към това да задаваш всякакви въпроси, относно тренировки и хранене, което прави по-лесен и приятен пътя към успеха."
  },
  {
    name: "Елвина",
    text: "Благодаря ти, Пепи, за високия професионализъм, индивидуалния подход и търпението, които показваш към всяка тренировка! Твоите способи ме мотивират и ми носят удовлетворение от взаимната ни работа! Доволна съм от постигнатите резултати и продължаваме напред! Горещо те препоръчвам на всеки, който желае да постигне успех!"
  },
  {
    name: "Елена",
    text: "Пепи, пожелавам ти успех във всяко начинание, с което се захванеш, защото се вижда старанието и усилията които полагаш. Продължавай все така да следваш целите си и да стигаш високи нива. Успех и отново огромни благодарности!"
  },
  {
    name: "Роси",
    text: "Искам да кажа едно голямо Благодаря на най-добрия треньор! Благодаря за съветите и за това, че ми показа правилния и здравословен начин. Без твоята помощ нямаше да постигна толкова добри резултати за толкова кратко време. Продължавай да бъдеш все така всеотдаен в работата си и да помагаш на хората да се чувстват добре в телата си."
  },
  {
    name: "Елена",
    text: "Пепка, искам да ти благодаря за това, че ми показа правилния начин за добро здраве и силно тяло. Без теб нямаше да постигна тези резултати за толкова кратко време. Не спирай да помагаш и да мотивираш хората да постигат мечтите си."
  },
  {
    name: "Мария",
    text: "Изключително впечатлена съм от професионализма и добрата комуникация, с които подхожда Пепи към своите клиенти. Внимателен и отзивчив, следи напредъка и винаги дава конкретни предложения за надграждане. Силно препоръчвам за тези, които още се колебаят да започнат!"
  },
  {
    name: "Елена",
    text: "Благодаря ти за вниманието и времето, което отделяш. За прецизността с която вършиш твоята работа.. Ти ме научи на едно от най-важните качества, а именно дисциплината!"
  },
  {
    name: "Рени",
    text: "Ти не само си страхотен треньор, но и страхотен човек! Отдаден си на работата и на това да надъхваш по свой си начин! От теб разбрах, че не е важно само да тренираш, а и да се храниш здравословно! Благодарение на теб промених много неща в себе си, за което съм ти много благодарна! Ти си страхотен! Продължавай да правиш всичко с толкова голямо желание! Радвам се, че познавам такъв човек като теб и нямам търпение за всяка една тренировка!!!"
  },
  {
    name: "Весела",
    text: "Две години тренирам с него. Най-силно впечатление са ми направи отговорността, професионализма и доброто отношение. В 21-век все неща който се срещат рядко (да не каже, че Не се) зрял и отговорен за годините си. Да не говоря за вече многото на брой добри резултати, който постига с клиентите, който му се доверяват. Препоръчвам го на всеки, който иска да постигне невероятни резултати със себе си..."
  },
  {
    name: "Митко",
    text: "Петър е изключително амбициозна, целеустремена и изпълнителна личност. Качества, които непременно треньор трябва да притежава. Ако трябва да бъда искрен, не е това, което ме спечели като негов клиент. Заразяващото чувство за хумор, което има е той е може би главната причина. Именно заради това, той е намерил начин да не усещаш тренировката като тягостно задължение, което трябва да отметнеш в списъка със задачи. Успял е да интегрира и вплете заедно дисциплина и забава, което непременно те кара да се завърнеш обратно точно при него."
  },
  {
    name: "Роси",
    text: "Запознах се с Петър Асенов преди три месеца покрай жена, тренирана от него, бях впечатлена от резултата, а аз изобщо не бях влизала в зала! Успява да те нахъса и амбицира, започнах да идвам редовно и с желание! Към всеки има индивидуален подход и отношение, прави индивидуална програма! Има сериозни познания за храненето и физическите упражнения, което те мотивира да си отговорен и редовен! Горещо препоръчвам вече на всеки да се обръща към него за съвети и да му прави тренировките!"
  },
  {
    name: "Ася",
    text: "С Пепи работим около 6-7 месеца. През този период той беше плътно до мен в процеса на тренировки и отговаряше на всички въпроси. Срещнах подкрепа в най-трудните моменти и той беше човека, който ми помогна да не се отказвам и да продължим. И още за първите два месеца, отбележихме свалени 15кг."
  },
  {
    name: "Мирослав",
    text: "Индивидуално изготвени тренировъчни програми съобразени с нуждите и травмите на всеки. Хранителният режим е разнообразен и засищащ. Отношението е професионално и винаги подробно описано и обяснено при въпроси."
  },
  {
    name: "Константина",
    text: "Петър Асенов е не само перфектен тренер, но и вдъхновител! С него тренировката е удоволствие, неговото отношение и търпение са причината за страхотните успехи и резултати, които се постигат от клиентите му!"
  },
  {
    name: "Румен",
    text: "Невероятен професионалнист, много дисциплиниран и организиран спрямо работата. Има много добро отношение и е изключително коректен! Желая ти успех!"
  },
  {
    name: "Микаела",
    text: "Петър е много добър професионалист. Млад и амбициозен е, което прави работата с него приятна и мотивираща. Тренировките с него освен, че дават добри резултати, внасят и забавление и винаги научавам нещо ново! Трудно бих се доверила на друг треньор."
  },
  {
    name: "Фатме",
    text: "Притежава всички необходими качества, за да бъде един от най - добрите: Отдаденост - обича работата си и това си личи; Желание за развитие - постоянно се стреми да се самоусъвършенства и да следи новите тенденции; Търпение - разбира индивидуалността в напредъка и моментите на обезкуражаване; Добри комуникативни умения - умее да казва точните думи в точния момент, за да поддържа хъс в клиентите си; Организираност относно графика; Умее да вдъхновява и мотивира;"
  },
  {
    name: "Алина",
    text: "За да бъде компетентен, треньорът трябва да притежава необходимите знания, умения и ефективен начин на мислене и отношение към работата си. Бих казала, че във времето разбрах, че притежаваш тези качества в пъти повече от необходимото. Стремиш се да мотивираш хората, да ги разбираш и да правиш всичко възможно да се чувстват достатъчно добре, че да не се отказват и да продължават напред, за да постигат целите си. Целта на добрия треньор е не само да развива пълният потенциал на хората, а също така и онези навици на тялото и съзнанието, които ще обогатяват и усъвършенстват качествата им за в бъдеще, и според мен ти си идеалният пример за не добър ами уникален човек и треньор."
  },
  {
    name: "Ралица",
    text: "Пепи ти си един отдаден фитнес треньор и първия на който се доверих! Подхождаш с внимание към всеки и даваш съвети за подобряването на качеството на живот. Позитивно настроен, мотивиращ и целеустремен, радвам се, че избрах теб и благодаря за търпението към мен!"
  },
  {
    name: "Красимира",
    text: "Каквото и да кажа за Пепи ще бъде малко. Той не просто е треньор, а също така и приятел. Пепи ми помогна не само да променя себе си визуално, но да се чувствам добре в кожата си, да бода здрава и енергична. Пепи е човек отдаден на работата си на 100%, професионалист, който с всеки изминал ден надгражда себе си."
  },
  {
    name: "Ирен",
    text: "С коуч Петър Асенов, тренировките не са онези, обичайните тренировки във фитнес зала. С него се работи за повишаване, както на физическата, така и на психическата сила. Целта е по-добър и пълноценен живот. Петър има за цел да вдъхнови любов към живота, не само към фитнеса. Резултатите са впечатляващи!"
  },
  {
    name: "Мария",
    text: "Пепи има индивидуално отношение към всеки, когото тренира, приятелски настроен е, следи всеки резултат и се старае заедно да го подобряваме което го прави истински професионалист!"
  },
  {
    name: "Станимир",
    text: "Изключителен професионалист, позитивно настроен, мотивиращ и целеустремен. Винаги насреща за въпроси и готов да помогне за правилното изпълнение на упражненията."
  },
  {
    name: "Стоян",
    text: "Много ти благодаря Пепи за търпението и професионално отношение към мен което имаш. Благодаря за безупречната програма която наистина ми действа."
  },
  {
    name: "Николай",
    text: "Изключително подготвен, професионалист с индивидуално отношение и подход към всеки. Ако искате видими резултати, които да отговарят на вашите изисквания ви препоръчвам Петър, който винаги ще ви влезне в положение и ще ви изготви правилните режими!"
  },
  {
    name: "Мария",
    text: "Мотивиращ, търпелив, положително зареждащ, индивидуален подход към всеки. При спазване на изготвения от него режим и тренировъчен план резултатите стават бързо видими."
  },
  {
    name: "Вили",
    text: "Ако не знаете как да се храните или да тренирате - обърнете се към подходящия треньор. Това е Пепи! Той е този, който ще ви изготви хранителен режим, тренировъчна програма за вашата уникална индивидуалност и ще сътвори чудеса с вашето тяло, ако му се доверите! Не се колебайте! Той е един изключителен треньор, който ще намерите едно оптимално решение за вашия проблем! Благодаря ти Пепи!"
  },
  {
    name: "Ваня",
    text: "Има хора, за които фитнес треньор не е просто работа, а призвание! Пепи, това си ти!"
  },
  {
    name: "Виктор",
    text: "Уникален треньор с много познания в тази сфера, винаги отворен за помощ. Благодарен съм че ми помогна да сваля 35 кг!"
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
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = '';
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
    };
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

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Get current testimonial
  const currentTestimonial = testimonials[currentIndex];

  // Calculate truncated text to fit in the available space
  const truncateText = (text: string, maxLength: number = 250): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[9999]">
      {/* Backdrop overlay with blur effect */}
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Main modal container */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="w-[95%] max-w-3xl bg-gradient-to-b from-zinc-800/95 to-zinc-900/95 rounded-xl shadow-2xl z-[10000] overflow-hidden border border-zinc-700/50 relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/90 to-zinc-900/90">
            <h3 className="text-2xl font-semibold text-white flex items-center">
              <span className="text-orange mr-2 text-3xl">❝</span> 
              Мнения на нашите клиенти
            </h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-700/70 hover:bg-orange/70 text-white transition-all duration-200 transform hover:scale-110 active:scale-95"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Modal content - Testimonials carousel */}
          <div className="p-6 md:p-8 relative">
            <div className="relative min-h-[250px] flex items-center justify-center">
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
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute w-full flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center w-full text-center">
                    <div className="bg-gradient-to-r from-zinc-800/90 to-zinc-800/70 p-6 md:p-8 rounded-lg shadow-inner w-full border border-orange/20">
                      {/* Testimonial avatar and name */}
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-3">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-orange/30 to-orange/20 flex justify-center items-center text-orange shadow-lg shadow-orange/10">
                          <UserRound size={28} />
                        </div>
                        <div className="text-center sm:text-left">
                          <p className="text-2xl sm:text-3xl font-medium text-orange-400 mb-1">
                            {currentTestimonial.name}
                          </p>
                          <div className="flex justify-center sm:justify-start">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                size={16} 
                                className="text-orange fill-orange" 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Testimonial text */}
                      <p className="text-base sm:text-lg text-white/90 leading-relaxed italic">
                        "{truncateText(currentTestimonial.text, 350)}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-2">
              <button 
                onClick={handlePrevious}
                className="pointer-events-auto bg-zinc-800/90 hover:bg-orange-500/90 p-3 rounded-r-lg text-white transition-all duration-200 shadow-lg ml-1 transform hover:scale-110 active:scale-95 focus:outline-none"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={handleNext}
                className="pointer-events-auto bg-zinc-800/90 hover:bg-orange-500/90 p-3 rounded-l-lg text-white transition-all duration-200 shadow-lg mr-1 transform hover:scale-110 active:scale-95 focus:outline-none"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Pagination indicator */}
            <div className="flex justify-center mt-6">
              <div className="bg-gradient-to-r from-zinc-800/90 to-zinc-800/70 px-4 py-2 rounded-full border border-orange/20 shadow-lg">
                <p className="text-sm text-white">
                  {currentIndex + 1} / {testimonials.length}
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom pagination dots */}
          <div className="flex justify-center gap-1.5 py-4 px-6 bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 border-t border-zinc-700/30">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  index === currentIndex
                    ? "bg-orange scale-110"
                    : "bg-zinc-600 hover:bg-orange/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Footer with close button */}
          <div className="bg-gradient-to-b from-zinc-800/90 to-zinc-900/90 p-4 flex justify-center border-t border-zinc-700/30">
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-orange/90 to-orange-600/90 hover:from-orange hover:to-orange-600 text-white rounded-lg shadow-lg transition-all duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Затвори
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialSlider; 