import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Instagram, Award, ArrowRight, Share2, Users, MessageCircle } from "lucide-react";

// Custom YouTube icon since Lucide doesn't have one
const YouTubeIcon = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current"
  >
    <path 
      d="M22.54 6.42C22.4212 5.94541 22.1792 5.51057 21.8386 5.15941C21.498 4.80824 21.0707 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16137 5.19941C1.82077 5.55057 1.57878 5.98541 1.46 6.46C1.14522 8.20556 0.991228 9.97631 1 11.75C0.988807 13.537 1.14279 15.3213 1.46 17.08C1.57886 17.5398 1.81983 17.9581 2.15887 18.2945C2.49791 18.631 2.91275 18.8738 3.38 19C5.1 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0707 18.8668 21.498 18.6118 21.8386 18.2606C22.1792 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 22.9948 13.5103 23 11.75C23.0112 9.96295 22.8572 8.1787 22.54 6.42Z" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Custom TikTok icon
const TikTokIcon = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current"
  >
    <path 
      d="M9 12C7.34315 12 6 13.3431 6 15C6 16.6569 7.34315 18 9 18C10.6569 18 12 16.6569 12 15V4C12.3357 5.10212 13.3131 5.99951 14.5 6.33M16.5 9.5V3.5M13 6.5H20" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const SuccessState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-1 shadow-2xl overflow-hidden"
      >
        <div className="relative rounded-xl overflow-hidden bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40"></div>
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            {/* Success badge */}
            <div className="flex justify-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20, 
                  delay: 0.2 
                }}
                className="bg-gradient-to-r from-orange to-orange-600 p-4 rounded-full shadow-lg"
              >
                <CheckCircle size={52} className="text-white" strokeWidth={1.5} />
              </motion.div>
            </div>
            
            {/* Main text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Благодарим за поръчката!
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                Планът ти вече се обработва и се преглежда от наш експерт, за да е напълно съобразен с твоите отговори.
              </p>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                ⏳ <span className="font-semibold text-orange">Ще го получиш на имейла си до 1.5–2 часа.</span>
              </p>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                Нищо тук не е автоматично — всяка програма минава през човек.
              </p>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                Ако не го видиш навреме, провери "Спам" или "Промоции". Ако има проблем, просто ни пиши.
              </p>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-semibold">
                Благодарим, че ни се довери. Готов си да влезеш във формата, която винаги си искал. 💪
              </p>
            </motion.div>
            
            {/* Social Media - Featured prominently */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Станете част от нашата общност</h2>
              
              <div className="max-w-2xl mx-auto mb-10 bg-gradient-to-r from-orange/10 to-orange/20 backdrop-blur-md p-6 rounded-xl border border-orange/20">
                <div className="flex items-center mb-4 text-left">
                  <Users className="text-orange h-7 w-7 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">
                    Присъединете се към <span className="font-bold text-orange">над 853</span> души, които вече трансформираха своя живот с нашата програма!
                  </p>
                </div>
                <div className="flex items-center mb-4 text-left">
                  <Share2 className="text-orange h-7 w-7 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">
                    Споделете своя прогрес и вдъхновете другите в нашата активна и подкрепяща общност.
                  </p>
                </div>
                <div className="flex items-center text-left">
                  <MessageCircle className="text-orange h-7 w-7 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">
                    Получете допълнителни съвети, мотивация и отговори на всички ваши въпроси директно от нашите експерти!
                  </p>
                </div>
              </div>
              
              <h3 className="text-white text-2xl font-semibold mb-6">Последвайте ни в социалните мрежи</h3>
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <motion.a 
                  href="https://www.instagram.com/palm_fitness1" 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 mb-2">
                    <Instagram size={32} className="text-white" />
                  </div>
                  <span className="text-white font-medium">Instagram</span>
                </motion.a>
                
                <motion.a 
                  href="https://www.tiktok.com/@palm_fitness1?_t=ZN-8uptWNUc5e2&_r=1" 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-black to-gray-800 hover:shadow-lg hover:shadow-gray-700/20 transition-all duration-300 mb-2">
                    <TikTokIcon />
                  </div>
                  <span className="text-white font-medium">TikTok</span>
                </motion.a>
              </div>
              
              <p className="text-gray-300 mb-4 max-w-xl mx-auto">
                Последвайте ни за ежедневна доза мотивация, съвети за тренировка и хранене, и истории на успеха от нашата общност.
              </p>
              <p className="text-orange font-semibold">
                Използвайте хаштаг <span className="bg-orange/10 px-2 py-1 rounded">#МоятаФитнесТрансформация</span> когато споделяте своя прогрес!
              </p>
            </motion.div>
            
            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center mt-8"
            >
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange to-orange-600 text-white font-semibold rounded-full hover:shadow-lg hover:from-orange-600 hover:to-orange transition-all duration-300"
              >
                Към началната страница
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>
          
          {/* Animated particles for premium feel */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-1 bg-orange rounded-full opacity-70"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%", 
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, Math.random() * 100 + "%"], 
                  opacity: [0, 0.6, 0] 
                }}
                transition={{ 
                  duration: Math.random() * 5 + 10, 
                  repeat: Infinity, 
                  delay: Math.random() * 5 
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessState;
