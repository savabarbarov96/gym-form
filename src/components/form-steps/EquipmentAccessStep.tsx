import React, { useState, useEffect } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { Check, Plus, X, Award, Dumbbell, Home } from "lucide-react";

interface EquipmentAccessStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
  equipmentData?: { type: string; items: string[] };
  onEquipmentDataChange?: (data: { type: string; items: string[] }) => void;
}

const EquipmentAccessStep: React.FC<EquipmentAccessStepProps> = ({ 
  selected, 
  onSelect,
  equipmentData,
  onEquipmentDataChange
}) => {
  const [customEquipment, setCustomEquipment] = useState<string[]>(equipmentData?.items || []);
  const [newEquipment, setNewEquipment] = useState("");
  
  useEffect(() => {
    if (selected && onEquipmentDataChange) {
      onEquipmentDataChange({
        type: selected,
        items: customEquipment
      });
    }
  }, [selected, customEquipment, onEquipmentDataChange]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const options = [
    { 
      value: "gym", 
      label: "Фитнес зала", 
      icon: <Dumbbell size={24} />,
      description: "Имам достъп до професионална фитнес зала с пълно оборудване"
    },
    { 
      value: "home-basic", 
      label: "Основно домашно оборудване", 
      icon: <Home size={24} />,
      description: "Имам базово оборудване у дома (дъмбели, ластици и др.)"
    },
    { 
      value: "home-advanced", 
      label: "Домашен фитнес", 
      icon: <Award size={24} />,
      description: "Имам добре оборудван домашен фитнес с разнообразни уреди"
    },
    { 
      value: "none", 
      label: "Без оборудване", 
      icon: <X size={24} />,
      description: "Нямам достъп до фитнес оборудване"
    }
  ];

  const commonEquipment = [
    { id: "dumbbells", name: "Дъмбели" },
    { id: "kettlebells", name: "Кетълбели" },
    { id: "resistance-bands", name: "Ластици" },
    { id: "yoga-mat", name: "Постелка за йога" },
    { id: "bench", name: "Пейка" },
    { id: "pull-up-bar", name: "Лост за набиране" },
    { id: "barbell", name: "Щанга" },
    { id: "treadmill", name: "Бягаща пътека" },
    { id: "exercise-bike", name: "Велоергометър" },
  ];

  const handleChange = (value: string) => {
    onSelect(value);
  };

  const handleAddEquipment = () => {
    if (newEquipment.trim() && !customEquipment.includes(newEquipment.trim())) {
      setCustomEquipment([...customEquipment, newEquipment.trim()]);
      setNewEquipment("");
    }
  };

  const handleRemoveEquipment = (item: string) => {
    setCustomEquipment(customEquipment.filter(equipment => equipment !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEquipment();
    }
  };

  const toggleEquipment = (item: string) => {
    if (customEquipment.includes(item)) {
      handleRemoveEquipment(item);
    } else {
      setCustomEquipment([...customEquipment, item]);
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-4 font-exo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Какво фитнес оборудване имате на разположение?
      </motion.h1>
      
      <motion.p
        className="text-lg text-muted-foreground mb-8 font-roboto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Изберете вида оборудване, до което имате достъп за вашите тренировки
      </motion.p>
      
      <motion.div
        className="mt-8 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <RadioGroup 
          value={selected || ""} 
          onValueChange={handleChange} 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {options.map((option) => (
            <motion.div 
              key={option.value}
              variants={itemVariants}
              className={`option-card p-5 flex flex-col items-start text-left transition-all duration-300 hover:translate-y-[-4px] ${
                selected === option.value 
                  ? 'bg-gradient-to-br from-orange/10 to-orange/20 border-2 border-orange shadow-lg' 
                  : 'hover:bg-secondary/80'
              }`}
              onClick={() => handleChange(option.value)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full ${selected === option.value ? 'bg-orange text-white' : 'bg-secondary text-muted-foreground'}`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold font-exo">{option.label}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-2 font-roboto">{option.description}</p>
              
              <div className={`w-full h-1 mt-2 rounded-full ${selected === option.value ? 'bg-orange' : 'bg-secondary'}`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    selected === option.value ? 'w-full bg-gradient-to-r from-orange to-orange-600' : 'w-0'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </RadioGroup>
        
        {(selected === "home-basic" || selected === "home-advanced") && (
          <motion.div 
            className="mt-8 bg-card border border-border rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4 font-exo text-left">Изберете оборудването, което имате:</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {commonEquipment.map((item) => (
                <div 
                  key={item.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    customEquipment.includes(item.name) 
                      ? 'bg-orange/10 border border-orange' 
                      : 'bg-secondary/50 border border-secondary hover:bg-secondary'
                  }`}
                  onClick={() => toggleEquipment(item.name)}
                >
                  <div className={`w-5 h-5 flex items-center justify-center rounded-full mr-2 flex-shrink-0 ${
                    customEquipment.includes(item.name) 
                      ? "bg-orange text-white" 
                      : "border border-muted-foreground"
                  }`}>
                    {customEquipment.includes(item.name) && <Check size={12} />}
                  </div>
                  <span className="font-roboto text-sm">{item.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <label className="block text-left text-lg font-bold mb-2 font-exo">Добавете друго оборудване:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Напр. тежести, боксов чувал..."
                  className="flex-1 p-3 rounded-lg border border-border bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange font-roboto"
                />
                <button 
                  onClick={handleAddEquipment}
                  className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-hover transition-colors flex items-center justify-center"
                  disabled={!newEquipment.trim()}
                >
                  <Plus size={24} />
                </button>
              </div>
              
              {customEquipment.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {customEquipment.filter(item => !commonEquipment.some(ce => ce.name === item)).map((item, index) => (
                    <div key={index} className="flex items-center bg-orange/10 text-orange px-3 py-1 rounded-full font-roboto">
                      <span>{item}</span>
                      <button 
                        className="ml-2 hover:bg-orange/20 rounded-full p-1"
                        onClick={() => handleRemoveEquipment(item)}
                        aria-label="Remove equipment"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {selected === "gym" && (
          <motion.div 
            className="mt-6 p-6 bg-card rounded-xl border border-orange/50 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-block p-3 bg-orange/10 rounded-full mb-4">
              <Dumbbell size={32} className="text-orange" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-exo text-orange">Отлично! 🏋️‍♂️</h3>
            <p className="font-roboto">Ще Ви предоставим тренировъчна програма, която максимално използва оборудването във фитнес залата за оптимални резултати.</p>
          </motion.div>
        )}
        
        {selected === "none" && (
          <motion.div 
            className="mt-6 p-6 bg-card rounded-xl border border-orange/50 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-block p-3 bg-orange/10 rounded-full mb-4">
              <Award size={32} className="text-orange" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-exo">Без проблем!</h3>
            <p className="font-roboto">Ще Ви предоставим ефективна програма с упражнения с тежестта на тялото, която не изисква специално оборудване.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EquipmentAccessStep; 