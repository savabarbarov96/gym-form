import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogoPlaceholder from "@/components/LogoPlaceholder";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, Dumbbell, Salad, Trophy, ChevronRight, Star, MessageSquareQuote, ChevronDown, Heart, Instagram, UserRound } from "lucide-react";
import { preloadImages, getBackgroundPaths, detectBackgroundCount, getSafeBackgroundPath } from "@/utils/imagePreloader";
import TestimonialSlider from "@/components/TestimonialSlider";

// Actual testimonials from real clients
const testimonials = [
  {
    id: 1,
    name: "Камелия",
    role: "Клиент",
    content: "Пепи, искам да споделя, че свалих за 1 месец 8кг. Благодаря ти за професионалното отношение с което ми изготви индивидуален план за хранене и тренировка.",
    rating: 5
  },
  {
    id: 2,
    name: "Светла",
    role: "Клиент",
    content: "Много добър професионалист, с грижа за всеки един като индивидуалност! Имам пълно доверие в него и тренировките са ми немислими без неговата помощ!",
    rating: 5
  },
  {
    id: 3,
    name: "Елена",
    role: "Клиент",
    content: "Прекрасно отношение с подробни обяснения относно тренировките и конкретните упражнения. Човек, който вече 4 месеца ме мотивира да правя редовни тренировки.",
    rating: 5
  }
];

const LandingPage = () => {
  // Background logic
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBackgrounds, setTotalBackgrounds] = useState(5);
  const [backgroundPaths, setBackgroundPaths] = useState<string[]>([]);
  const [opacity, setOpacity] = useState(0);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 200], [0, -50]);
  
  // Load background images
  useEffect(() => {
    const detectBackgrounds = async () => {
      setIsLoading(true);
      try {
        const result = await detectBackgroundCount(40);
        const { count } = result;
        setTotalBackgrounds(count);
        
        // Preload the detected images
        const paths = getBackgroundPaths();
        setBackgroundPaths(paths);
        
        await preloadImages(paths);
        
        // Set initial random index
        if (count > 0) {
          const randomIndex = Math.floor(Math.random() * count);
          setCurrentBgIndex(randomIndex);
        } else {
          setCurrentBgIndex(0);
        }
      } catch (error) {
        console.error("Failed during background detection or preloading:", error);
      } finally {
        setIsLoading(false);
        setTimeout(() => setOpacity(1), 300);
      }
    };
    
    detectBackgrounds();
  }, []);
  
  // Background rotation
  useEffect(() => {
    if (isLoading || backgroundPaths.length === 0) return;
    
    const rotateBackground = () => {
      if (totalBackgrounds > 1) {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * totalBackgrounds);
        } while (newIndex === currentBgIndex && totalBackgrounds > 1);
        
        setCurrentBgIndex(newIndex);
      }
    };
    
    const intervalId = setInterval(rotateBackground, 10000);
    
    return () => clearInterval(intervalId);
  }, [totalBackgrounds, isLoading, currentBgIndex, backgroundPaths]);
  
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get current image path safely with fallback
  const getCurrentImagePath = () => {
    if (backgroundPaths.length === 0) return getSafeBackgroundPath();
    
    const path = backgroundPaths[currentBgIndex % backgroundPaths.length];
    return path && path.trim() !== '' ? path : getSafeBackgroundPath();
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Scroll to features section
  const featuresRef = useRef(null);
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Single Background image with overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black z-30 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white text-lg">Зареждане на фона...</p>
            </div>
          </div>
        )}
        
        {/* Background image container - now single image */}
        <div className="flex h-full w-full transition-opacity duration-700" style={{ opacity: isLoading ? 0 : 1 }}>
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img 
              src={getCurrentImagePath()} 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="py-3 px-4 sm:px-6 md:px-8 border-b border-border/50 bg-zinc-900/80 backdrop-blur-sm z-10 relative shadow-md flex justify-between items-center">
        <div className="flex items-start">
          <LogoPlaceholder className="h-14 w-auto" />
        </div>
        
        {/* Testimonials button */}
        <button
          onClick={() => setIsTestimonialsOpen(true)}
          className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow transition-all duration-200 transform hover:scale-105"
        >
          <MessageSquareQuote size={20} className="mr-2" />
          <span className="hidden sm:inline">Мнения на клиенти</span>
          <span className="sm:hidden">Мнения</span>
        </button>
      </header>

      {/* Render testimonial slider at the root level */}
      <TestimonialSlider 
        isOpen={isTestimonialsOpen} 
        onClose={() => setIsTestimonialsOpen(false)}
        autoScrollInterval={10000}
      />

      {/* Hero Section with Prominent CTA */}
      <section 
        ref={heroRef}
        className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center pt-8 pb-16 px-4"
      >
        <motion.div
          style={{ opacity, y }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
          onClick={scrollToFeatures}
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
        >
          <ChevronDown size={36} className="text-white/80" />
        </motion.div>

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side: Hero Text */}
          <motion.div 
            className="text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-[2.5rem] sm:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 text-white leading-[1.1] tracking-tight"
              variants={fadeInUp}
            >
              <span className="block mb-3">Свали 5 до 20 кг</span>
              <span className="text-orange block mb-3">с Персонален Режим,</span>
              <span className="block">Създаден Специално за Теб</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-200 max-w-xl mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              Свали излишните килограми и изгради тялото, което винаги си искал – с персонален план за хранене и тренировки, направен според твоите цели, начин на живот и време.
            </motion.p>

            <motion.p 
              className="text-base md:text-lg text-gray-200 max-w-xl mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              Тялото, за което мечтаеш, е само на 2 минути разстояние. Попълни въпросите и започни сега.
            </motion.p>

            <motion.div 
              className="flex flex-col gap-4 mt-2 md:mt-4"
              variants={fadeInUp}
            >
              <motion.div
                variants={pulseAnimation}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex justify-center"
              >
                <Link 
                  to="/form" 
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base md:text-lg font-medium text-white bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange rounded-lg shadow-lg transition-all duration-300 w-full sm:w-auto"
                >
                  Попълни въпросите
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </motion.div>
              <div className="text-center text-gray-300 text-xs sm:text-sm italic">
                Отнема под 2 минути, а режимът ти ще е готов веднага след това.
              </div>
            </motion.div>
          </motion.div>

          {/* Right side: Interactive Element - displayed only on large screens */}
          <motion.div 
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="relative p-4 w-full max-w-md">
              <motion.div 
                className="absolute -top-10 -left-10 w-32 h-32 bg-orange/20 rounded-full blur-2xl z-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop" as const
                }}
              />
              <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange/20 rounded-full blur-2xl z-0"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "loop" as const,
                  delay: 0.5
                }}
              />
              <div className="relative z-10 p-6 bg-card/80 backdrop-blur-md rounded-2xl border border-orange/30 shadow-xl overflow-hidden">
                {/* Animated background elements */}
                <motion.div 
                  className="absolute -top-12 -right-12 w-48 h-48 bg-orange/10 rounded-full blur-3xl z-0"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 15, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.div 
                  className="absolute -bottom-16 -left-16 w-56 h-56 bg-orange/10 rounded-full blur-3xl z-0"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, -20, 0]
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2
                  }}
                />
                
                <div className="relative z-10">
                  <motion.h3 
                    className="text-xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Персонализирана фитнес програма без ограничения
                  </motion.h3>
                  
                  <div className="space-y-3 mb-4">
                    {/* Equipment icon with text */}
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.div 
                        className="mt-0.5 p-1.5 rounded-full bg-orange/20 text-orange flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <Dumbbell size={16} />
                      </motion.div>
                      <p className="text-gray-200 text-sm">
                        <span className="font-medium text-orange">Без необходимо оборудване</span> - тренирайте навсякъде, но ако имате достъп до уреди, програмата ще се адаптира за още по-добри резултати.
                      </p>
                    </motion.div>
                    
                    {/* Food icon with text */}
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <motion.div 
                        className="mt-0.5 p-1.5 rounded-full bg-orange/20 text-orange flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <Salad size={16} />
                      </motion.div>
                      <p className="text-gray-200 text-sm">
                        <span className="font-medium text-orange">Персонализирана диета</span> - съобразена с наличните за вас храни и вашите специфични предпочитания.
                      </p>
                    </motion.div>
                    
                    {/* Heart icon with text */}
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <motion.div 
                        className="mt-0.5 p-1.5 rounded-full bg-orange/20 text-orange flex-shrink-0"
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <Heart size={16} />
                      </motion.div>
                      <p className="text-gray-200 text-sm">
                        <span className="font-medium text-orange">Адаптивна програма</span> - постоянно се оптимизира според вашия прогрес и обратна връзка.
                      </p>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="flex justify-center mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/form" 
                      className="inline-flex items-center justify-center px-6 py-3 w-full font-medium text-white bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange rounded-lg shadow-lg transition-all duration-300"
                    >
                      <motion.span
                        animate={{ 
                          x: [0, 5, 0],
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        Вземи своя план
                      </motion.span>
                      <motion.div
                        animate={{ 
                          x: [0, 5, 0],
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <ArrowRight className="ml-2" size={20} />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content - Simplified and optimized for mobile */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center max-w-7xl mx-auto">
        {/* Features */}
        <motion.div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="bg-card/80 backdrop-blur-sm p-5 rounded-lg border border-orange/20 overflow-hidden relative group"
            variants={fadeInUp}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 10px 25px -5px rgba(255, 115, 0, 0.2)",
              transition: { duration: 0.3, ease: "easeOut" } 
            }}
          >
            <motion.div 
              className="absolute -top-8 -right-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl z-0 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.5 }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <motion.div 
                  className="p-2.5 rounded-full bg-orange/10 text-orange mr-3 relative overflow-hidden"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                  initial={{ boxShadow: "0 0 0 0 rgba(255, 115, 0, 0)" }}
                  whileInView={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 115, 0, 0)",
                      "0 0 0 8px rgba(255, 115, 0, 0.1)",
                      "0 0 0 0 rgba(255, 115, 0, 0)"
                    ],
                    transition: { 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Brain size={22} />
                  </motion.div>
                </motion.div>
                <motion.h3 
                  className="text-lg font-bold"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  Научно обосновани тренировки
                </motion.h3>
              </div>
              
              <motion.p 
                className="text-gray-300 text-sm"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Постигай реални и устойчиви резултати с програми, изградени върху научно доказани принципи. Всеки план е персонално съобразен с твоите цели, физическо състояние и начин на живот, за да осигури най-ефективния път към промяната.
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card/80 backdrop-blur-sm p-5 rounded-lg border border-orange/20 overflow-hidden relative group"
            variants={fadeInUp}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 10px 25px -5px rgba(255, 115, 0, 0.2)",
              transition: { duration: 0.3, ease: "easeOut" } 
            }}
          >
            <motion.div 
              className="absolute -top-8 -right-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl z-0 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.5 }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <motion.div 
                  className="p-2.5 rounded-full bg-orange/10 text-orange mr-3 relative overflow-hidden"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                  initial={{ boxShadow: "0 0 0 0 rgba(255, 115, 0, 0)" }}
                  whileInView={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 115, 0, 0)",
                      "0 0 0 8px rgba(255, 115, 0, 0.1)",
                      "0 0 0 0 rgba(255, 115, 0, 0)"
                    ],
                    transition: { 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.3
                    }
                  }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -3, 0, 3, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Salad size={22} />
                  </motion.div>
                </motion.div>
                <motion.h3 
                  className="text-lg font-bold"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  Хранителен План
                </motion.h3>
              </div>
              
              <motion.p 
                className="text-gray-300 text-sm"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Персонализиран хранителен план, съобразен с целта ти и начина ти на живот – за да постигаш резултати без крайни лишения, без безкрайни часове в кухнята и без да се чудиш какво можеш да ядеш.
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card/80 backdrop-blur-sm p-5 rounded-lg border border-orange/20 overflow-hidden relative group"
            variants={fadeInUp}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 10px 25px -5px rgba(255, 115, 0, 0.2)",
              transition: { duration: 0.3, ease: "easeOut" } 
            }}
          >
            <motion.div 
              className="absolute -top-8 -right-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl z-0 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.5 }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <motion.div 
                  className="p-2.5 rounded-full bg-orange/10 text-orange mr-3 relative overflow-hidden"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                  initial={{ boxShadow: "0 0 0 0 rgba(255, 115, 0, 0)" }}
                  whileInView={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 115, 0, 0)",
                      "0 0 0 8px rgba(255, 115, 0, 0.1)",
                      "0 0 0 0 rgba(255, 115, 0, 0)"
                    ],
                    transition: { 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.6
                    }
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -8, 0, 8, 0] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Dumbbell size={22} />
                  </motion.div>
                </motion.div>
                <motion.h3 
                  className="text-lg font-bold"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  Тренировъчен План
                </motion.h3>
              </div>
              
              <motion.p 
                className="text-gray-300 text-sm"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Тренировъчна програма, изградена според твоята цел, ежедневие и налично оборудване – за да постигаш резултати, независимо дали тренираш вкъщи или във фитнеса. Без излишни усложнения. Само ясен път към промяната.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Benefits summary section - after benefits grid */}
        <motion.div 
          className="w-full max-w-5xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-900 rounded-xl border border-orange/10 shadow-lg relative overflow-hidden"
            whileHover={{ y: -5 }}
          >
            {/* Decorative background elements */}
            <motion.div 
              className="absolute top-0 right-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl z-0"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />

            <div className="relative z-10">
              <motion.h3 
                className="text-xl font-bold text-center mb-8"
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  initial={{ backgroundSize: "0% 2px" }}
                  whileInView={{ backgroundSize: "100% 2px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="bg-gradient-to-r from-orange to-orange-600 bg-no-repeat bg-bottom pb-1"
                  style={{ backgroundPosition: "0 100%" }}
                >
                  Вашият Път Към По-Здравословен Живот
                </motion.span>
              </motion.h3>
              
              {/* Content */}
              <motion.p 
                className="text-center text-gray-300 max-w-3xl mx-auto mb-8"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Започнете днес своята трансформация с нашата иновативна фитнес програма, базирана на изкуствен интелект, която се адаптира към вашите нужди, график и цели.
              </motion.p>
              
              <motion.div 
                className="flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/form" 
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange rounded-lg shadow-lg transition-all duration-300"
                  >
                    Започнете Вашия План
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Embedded Testimonial Slider Section */}
        <motion.div 
          className="w-full max-w-5xl mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-center mb-4 text-orange-400"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Над 180 човека ни се довериха, виж какво казват те
          </motion.h2>
          
          <motion.h3 
            className="text-xl font-bold text-center mb-8 relative"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              initial={{ backgroundSize: "0% 2px" }}
              whileInView={{ backgroundSize: "100% 2px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-gradient-to-r from-orange to-orange-600 bg-no-repeat bg-bottom pb-1"
              style={{ backgroundPosition: "0 100%" }}
            >
              Мнения на Нашите Клиенти
            </motion.span>
          </motion.h3>
          
          {/* Embedded slider with custom styling */}
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-800/50 overflow-hidden shadow-xl">
            <div className="p-6 relative">
              {/* Static slider component with similar functionality to the modal version */}
              <div className="min-h-[220px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30
                    }}
                    className="w-full"
                  >
                    <div className="flex flex-col items-center justify-center w-full text-center">
                      <div className="bg-zinc-800/60 p-6 rounded-lg shadow-inner w-full">
                        <div className="flex items-center justify-center mb-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange/20 flex justify-center items-center text-orange mr-3">
                            <UserRound size={20} />
                          </div>
                          <p className="text-xl sm:text-2xl font-medium text-orange-400">
                            {testimonials[currentTestimonialIndex].name}
                          </p>
                        </div>
                        <p className="text-base sm:text-lg text-white/90 leading-relaxed italic">
                          "{testimonials[currentTestimonialIndex].content}"
                        </p>
                        <div className="mt-4 flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              size={16} 
                              className={i < testimonials[currentTestimonialIndex].rating ? "text-orange fill-orange" : "text-gray-400"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* View more button */}
              <motion.div 
                className="flex justify-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={() => setIsTestimonialsOpen(true)}
                  className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-orange/20 to-orange/30 text-orange hover:from-orange/30 hover:to-orange/40 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Вижте всички мнения</span> 
                  <ChevronRight size={18} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Social Media Section - New Section */}
        <motion.div 
          className="w-full max-w-5xl mb-12 bg-gradient-to-r from-zinc-900/90 via-zinc-800/50 to-zinc-900/90 backdrop-blur-md p-8 rounded-2xl border border-zinc-700/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-xl font-bold text-center mb-6 relative"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              initial={{ backgroundSize: "0% 2px" }}
              whileInView={{ backgroundSize: "100% 2px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-gradient-to-r from-orange to-orange-600 bg-no-repeat bg-bottom pb-1"
              style={{ backgroundPosition: "0 100%" }}
            >
              Последвайте Ни в Социалните Мрежи
            </motion.span>
          </motion.h3>
          
          <motion.p
            className="text-center text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Следете ни за ежедневна мотивация, съвети за тренировки и хранене, истории на успеха и много други!
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="https://www.instagram.com/palm_fitness1"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 p-0.5 mb-3 relative overflow-hidden"
                whileHover={{ boxShadow: "0 0 30px 5px rgba(219, 39, 119, 0.5)" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="bg-zinc-900 rounded-full w-full h-full flex items-center justify-center relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0, -10, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Instagram size={36} className="text-pink-500 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.span 
                className="font-medium text-white"
                animate={{ 
                  color: ["#f9f9f9", "#f472b6", "#f9f9f9"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                Instagram
              </motion.span>
              <span className="text-xs text-gray-400">@palm_fitness1</span>
            </motion.a>
            
            <motion.a
              href="https://www.tiktok.com/@palm_fitness1?_t=ZN-8uptWNUc5e2&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-black to-gray-700 p-0.5 mb-3 relative overflow-hidden"
                whileHover={{ boxShadow: "0 0 30px 5px rgba(0, 0, 0, 0.5)" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-teal-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="bg-zinc-900 rounded-full w-full h-full flex items-center justify-center relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, -10, 0, 10, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.5
                    }}
                  >
                    {/* Custom TikTok icon */}
                    <svg 
                      width="36" 
                      height="36" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-white group-hover:stroke-black transition-colors duration-300"
                    >
                      <path 
                        d="M9 12C7.34315 12 6 13.3431 6 15C6 16.6569 7.34315 18 9 18C10.6569 18 12 16.6569 12 15V4C12.3357 5.10212 13.3131 5.99951 14.5 6.33M16.5 9.5V3.5M13 6.5H20" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
              <motion.span 
                className="font-medium text-white"
                animate={{ 
                  color: ["#f9f9f9", "#22d3ee", "#ec4899", "#f9f9f9"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                TikTok
              </motion.span>
              <span className="text-xs text-gray-400">@palm_fitness1</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Final CTA Button */}
        <motion.div 
          className="flex flex-col items-center w-full mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
        >
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 md:right-8 z-50 w-full flex justify-center md:justify-end md:w-auto"
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 300, damping: 15 }}
      >
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-orange/30 blur-md"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop" as const
            }}
          />
          
          <Link
            to="/form"
            className="bg-gradient-to-r from-orange to-orange-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center relative z-10"
          >
            <Dumbbell size={20} className="mr-2" />
            <span className="font-semibold text-sm">Започнете Сега</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border/50 bg-zinc-900/90 backdrop-blur-sm z-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <motion.div 
              className="mb-6 md:mb-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <LogoPlaceholder className="h-10 w-auto" />
            </motion.div>
            
            {/* Additional Footer Info - replaces the button */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-400 text-center"
            >
              <p>Персонализирани фитнес планове</p>
              <p className="text-xs mt-1">Адаптирани специално за вас</p>
            </motion.div>
          </div>
          
          <div className="border-t border-zinc-800 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <motion.p 
                className="text-gray-400 text-xs mb-3 sm:mb-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                &copy; {new Date().getFullYear()} Palm Fitness AI. Всички права запазени.
              </motion.p>
              
              <motion.div 
                className="flex items-center text-orange"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-xs text-gray-400 flex items-center">
                  Създадено с
                  <motion.span 
                    className="mx-1"
                    animate={{ 
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Heart size={12} className="fill-orange" /> 
                  </motion.span>
                  от Automation Aid
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 
