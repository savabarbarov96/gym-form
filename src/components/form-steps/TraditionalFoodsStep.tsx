import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBasket, 
  Search, 
  Check,
  X, 
  Plus,
  ChevronRight,
  Tag,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface TraditionalFoodsStepProps {
  selectedFoods: string[];
  onSelect: (foods: string[]) => void;
  customFood?: string | null;
  onCustomFoodChange?: (customFood: string | null) => void;
}

const TraditionalFoodsStep = ({ 
  selectedFoods = [], // Provide default empty array to prevent undefined error
  onSelect,
  customFood = null,
  onCustomFoodChange = () => {} 
}: TraditionalFoodsStepProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [customFoods, setCustomFoods] = useState<string[]>(customFood ? [customFood] : []);
  const [notification, setNotification] = useState<{message: string, visible: boolean}>({message: "", visible: false});
  const [displayLimit, setDisplayLimit] = useState(12); // Initial number of items to display

  // Log props for debugging
  useEffect(() => {
    console.log("TraditionalFoodsStep props:", { 
      selectedFoods, 
      customFood,
      selectedFoodsType: typeof selectedFoods,
      selectedFoodsIsArray: Array.isArray(selectedFoods)
    });
    
    // Initialize custom foods from props if available
    if (customFood && !customFoods.includes(customFood)) {
      setCustomFoods([...customFoods, customFood]);
    }
  }, [selectedFoods, customFood]);

  // Common Bulgarian market items with categories
  const marketItems = [
    // ХЛЕБНИ
    { 
      label: "Бял хляб (Питка)", 
      id: "white_bread", 
      category: "Хлебни"
    },
    { 
      label: "Пълнозърнест хляб", 
      id: "whole_grain_bread", 
      category: "Хлебни"
    },
    {
      label: "Лаваш",
      id: "lavash",
      category: "Хлебни"
    },
    {
      label: "Тортиля",
      id: "tortilla",
      category: "Хлебни"
    },
    {
      label: "Питка за бургер (пълнозърнеста)",
      id: "burger_bun",
      category: "Хлебни"
    },
    {
      label: "Юфка",
      id: "yufka",
      category: "Хлебни"
    },
    {
      label: "Пълнозърнеста юфка с фибри",
      id: "whole_grain_yufka",
      category: "Хлебни"
    },
    
    // МЛЕЧНИ
    { 
      label: "Мляко", 
      id: "milk", 
      category: "Млечни"
    },
    { 
      label: "Кисело мляко", 
      id: "yogurt", 
      category: "Млечни"
    },
    { 
      label: "Сирене", 
      id: "white_cheese", 
      category: "Млечни"
    },
    { 
      label: "Яйца", 
      id: "eggs", 
      category: "Млечни"
    },
    { 
      label: "Масло", 
      id: "butter", 
      category: "Млечни"
    },
    {
      label: "Cottage Cheese (без мазнини)",
      id: "cottage_cheese",
      category: "Млечни"
    },
    {
      label: "Извара (без мазнини)",
      id: "quark",
      category: "Млечни"
    },
    {
      label: "Скир (без мазнини)",
      id: "skyr",
      category: "Млечни"
    },
    {
      label: "Скир без лактоза (без мазнини)",
      id: "lactose_free_skyr",
      category: "Млечни"
    },
    {
      label: "Гръцки йогурт",
      id: "greek_yogurt",
      category: "Млечни"
    },
    {
      label: "Нискомаслен гръцки йогурт",
      id: "low_fat_greek_yogurt",
      category: "Млечни"
    },
    {
      label: "Моцарела (нискомаслена)",
      id: "low_fat_mozzarella",
      category: "Млечни"
    },
    {
      label: "Кашкавал",
      id: "kashkaval",
      category: "Млечни"
    },
    
    // МАСЛА
    { 
      label: "Слънчогледово олио", 
      id: "sunflower_oil", 
      category: "Масла"
    },
    { 
      label: "Други растителни масла", 
      id: "vegetable_oils", 
      category: "Масла"
    },
    {
      label: "Зехтин",
      id: "olive_oil",
      category: "Масла"
    },
    {
      label: "Масло (за готвене)",
      id: "cooking_butter",
      category: "Масла"
    },
    
    // ЗА ПЕЧЕНЕ
    { 
      label: "Захар", 
      id: "sugar", 
      category: "За печене"
    },
    { 
      label: "Брашно", 
      id: "flour", 
      category: "За печене"
    },
    
    // ЗЪРНЕНИ
    { 
      label: "Ориз", 
      id: "rice", 
      category: "Зърнени"
    },
    { 
      label: "Макарони", 
      id: "pasta", 
      category: "Зърнени"
    },
    { 
      label: "Бобови (боб, леща)", 
      id: "legumes", 
      category: "Зърнени"
    },
    {
      label: "Бял ориз",
      id: "white_rice",
      category: "Зърнени"
    },
    {
      label: "Пълнозърнест кафяв ориз",
      id: "brown_rice",
      category: "Зърнени"
    },
    {
      label: "Черен ориз Императорски",
      id: "black_rice",
      category: "Зърнени"
    },
    {
      label: "Оризов грис",
      id: "rice_semolina",
      category: "Зърнени"
    },
    {
      label: "Оризовки",
      id: "rice_cakes",
      category: "Зърнени"
    },
    {
      label: "Овес",
      id: "oats",
      category: "Зърнени"
    },
    {
      label: "Булгур",
      id: "bulgur",
      category: "Зърнени"
    },
    {
      label: "Пшеничен грис",
      id: "wheat_semolina",
      category: "Зърнени"
    },
    {
      label: "Нахут",
      id: "chickpeas",
      category: "Зърнени"
    },
    
    // ЗЕЛЕНЧУЦИ
    { 
      label: "Картофи", 
      id: "potatoes", 
      category: "Зеленчуци"
    },
    { 
      label: "Домати", 
      id: "tomatoes", 
      category: "Зеленчуци"
    },
    { 
      label: "Краставици", 
      id: "cucumbers", 
      category: "Зеленчуци"
    },
    { 
      label: "Чушки", 
      id: "bell_peppers", 
      category: "Зеленчуци"
    },
    { 
      label: "Лук", 
      id: "onions", 
      category: "Зеленчуци"
    },
    { 
      label: "Чесън", 
      id: "garlic", 
      category: "Зеленчуци"
    },
    { 
      label: "Моркови", 
      id: "carrots", 
      category: "Зеленчуци"
    },
    {
      label: "Обикновен картоф",
      id: "regular_potato",
      category: "Зеленчуци"
    },
    {
      label: "Сладък картоф (батат)",
      id: "sweet_potato",
      category: "Зеленчуци"
    },
    {
      label: "Червен картоф",
      id: "red_potato",
      category: "Зеленчуци"
    },
    {
      label: "Маруля",
      id: "lettuce",
      category: "Зеленчуци"
    },
    {
      label: "Айсберг",
      id: "iceberg",
      category: "Зеленчуци"
    },
    {
      label: "Рукола",
      id: "arugula",
      category: "Зеленчуци"
    },
    {
      label: "Спанак",
      id: "spinach",
      category: "Зеленчуци"
    },
    {
      label: "Кейл",
      id: "kale",
      category: "Зеленчуци"
    },
    {
      label: "Зеле (бяло, червено, китайско)",
      id: "cabbage",
      category: "Зеленчуци"
    },
    {
      label: "Репички",
      id: "radishes",
      category: "Зеленчуци"
    },
    {
      label: "Броколи",
      id: "broccoli",
      category: "Зеленчуци"
    },
    {
      label: "Карфиол",
      id: "cauliflower",
      category: "Зеленчуци"
    },
    {
      label: "Аспержи",
      id: "asparagus",
      category: "Зеленчуци"
    },
    {
      label: "Целина",
      id: "celery",
      category: "Зеленчуци"
    },
    {
      label: "Тиквички",
      id: "zucchini",
      category: "Зеленчуци"
    },
    {
      label: "Гъби (печурки, кладница, шийтаке)",
      id: "mushrooms",
      category: "Зеленчуци"
    },
    {
      label: "Зелен фасул",
      id: "green_beans",
      category: "Зеленчуци"
    },
    {
      label: "Патладжан",
      id: "eggplant",
      category: "Зеленчуци"
    },
    {
      label: "Праз лук",
      id: "leek",
      category: "Зеленчуци"
    },
    {
      label: "Брюкселско зеле",
      id: "brussels_sprouts",
      category: "Зеленчуци"
    },
    {
      label: "Царевица",
      id: "corn",
      category: "Зеленчуци"
    },
    {
      label: "Грах",
      id: "peas",
      category: "Зеленчуци"
    },
    
    // ПЛОДОВЕ
    { 
      label: "Ябълки", 
      id: "apples", 
      category: "Плодове"
    },
    { 
      label: "Банани", 
      id: "bananas", 
      category: "Плодове"
    },
    { 
      label: "Цитрусови плодове", 
      id: "citrus_fruits", 
      category: "Плодове"
    },
    {
      label: "Круша",
      id: "pear",
      category: "Плодове"
    },
    {
      label: "Праскова",
      id: "peach",
      category: "Плодове"
    },
    {
      label: "Нектарина",
      id: "nectarine",
      category: "Плодове"
    },
    {
      label: "Грозде",
      id: "grapes",
      category: "Плодове"
    },
    {
      label: "Череши",
      id: "cherries",
      category: "Плодове"
    },
    {
      label: "Диня",
      id: "watermelon",
      category: "Плодове"
    },
    {
      label: "Пъпеш",
      id: "melon",
      category: "Плодове"
    },
    {
      label: "Киви",
      id: "kiwi",
      category: "Плодове"
    },
    {
      label: "Ананас",
      id: "pineapple",
      category: "Плодове"
    },
    {
      label: "Кайсия",
      id: "apricot",
      category: "Плодове"
    },
    {
      label: "Слива",
      id: "plum",
      category: "Плодове"
    },
    {
      label: "Смокиня",
      id: "fig",
      category: "Плодове"
    },
    {
      label: "Фурми",
      id: "dates",
      category: "Плодове"
    },
    {
      label: "Портокал",
      id: "orange",
      category: "Плодове"
    },
    {
      label: "Мандарина",
      id: "tangerine",
      category: "Плодове"
    },
    {
      label: "Лимон",
      id: "lemon",
      category: "Плодове"
    },
    {
      label: "Грейпфрут",
      id: "grapefruit",
      category: "Плодове"
    },
    {
      label: "Нар",
      id: "pomegranate",
      category: "Плодове"
    },
    {
      label: "Ягоди",
      id: "strawberries",
      category: "Плодове"
    },
    {
      label: "Малини",
      id: "raspberries",
      category: "Плодове"
    },
    {
      label: "Къпини",
      id: "blackberries",
      category: "Плодове"
    },
    {
      label: "Боровинки",
      id: "blueberries",
      category: "Плодове"
    },
    {
      label: "Замразени плодове микс",
      id: "frozen_fruit_mix",
      category: "Плодове"
    },
    {
      label: "Помело",
      id: "pomelo",
      category: "Плодове"
    },
    {
      label: "Стафиди",
      id: "raisins",
      category: "Плодове"
    },
    {
      label: "Джинджифил",
      id: "ginger",
      category: "Плодове"
    },
    
    // МЕСО
    { 
      label: "Пилешко месо", 
      id: "chicken", 
      category: "Месо"
    },
    { 
      label: "Свинско месо", 
      id: "pork", 
      category: "Месо"
    },
    {
      label: "Телешко (шол)",
      id: "beef_round",
      category: "Месо"
    },
    {
      label: "Пилешко (гърди)",
      id: "chicken_breast",
      category: "Месо"
    },
    {
      label: "Пуешко (гърди)",
      id: "turkey_breast",
      category: "Месо"
    },
    {
      label: "Свинско (бонфиле)",
      id: "pork_tenderloin",
      category: "Месо"
    },
    
    // МОРСКИ
    { 
      label: "Риба", 
      id: "fish", 
      category: "Морски"
    },
    { 
      label: "Консерва риба тон", 
      id: "canned_tuna", 
      category: "Морски"
    },
    {
      label: "Хек",
      id: "hake",
      category: "Морски"
    },
    {
      label: "Лаврак",
      id: "sea_bass",
      category: "Морски"
    },
    {
      label: "Пангасиус",
      id: "pangasius",
      category: "Морски"
    },
    {
      label: "Треска",
      id: "cod",
      category: "Морски"
    },
    {
      label: "Сьомга/Сьомгова пъстърва",
      id: "salmon",
      category: "Морски"
    },
    {
      label: "Скумрия",
      id: "mackerel",
      category: "Морски"
    },
    {
      label: "Херинга",
      id: "herring",
      category: "Морски"
    },
    {
      label: "Сардини",
      id: "sardines",
      category: "Морски"
    },
    {
      label: "Скариди",
      id: "shrimp",
      category: "Морски"
    },
    {
      label: "Миди",
      id: "mussels",
      category: "Морски"
    },
    {
      label: "Октопод",
      id: "octopus",
      category: "Морски"
    },
    {
      label: "Калмари",
      id: "calamari",
      category: "Морски"
    },
    
    // ПРЕРАБОТЕНИ
    { 
      label: "Колбаси", 
      id: "sausages", 
      category: "Преработени"
    },
    
    // НАПИТКИ
    { 
      label: "Минерална вода", 
      id: "mineral_water", 
      category: "Напитки"
    },
    
    // ВЕГАН/ВЕГЕТАРИАНСКИ
    {
      label: "Тофу",
      id: "tofu",
      category: "Веган/Вегетариански"
    },
    
    // МАЗНИНИ
    {
      label: "Авокадо",
      id: "avocado",
      category: "Мазнини"
    },
    {
      label: "Черен шоколад (75%+)",
      id: "dark_chocolate",
      category: "Мазнини"
    },
    {
      label: "Кокосови стърготини",
      id: "coconut_flakes",
      category: "Мазнини"
    },
    {
      label: "Орехи (сурови)",
      id: "walnuts",
      category: "Мазнини"
    },
    {
      label: "Бадеми (сурови)",
      id: "almonds",
      category: "Мазнини"
    },
    {
      label: "Кашу (сурови)",
      id: "cashews",
      category: "Мазнини"
    },
    {
      label: "Лешници (сурови)",
      id: "hazelnuts",
      category: "Мазнини"
    },
    {
      label: "Фъстъци",
      id: "peanuts",
      category: "Мазнини"
    },
    {
      label: "Маслини",
      id: "olives",
      category: "Мазнини"
    },
    {
      label: "Фъстъчен тахан/масло",
      id: "peanut_butter",
      category: "Мазнини"
    },
    {
      label: "Бадемов тахан",
      id: "almond_butter",
      category: "Мазнини"
    }
  ];

  // Extract all unique categories
  const categories = Array.from(new Set(marketItems.map(item => item.category)));

  // Filter items based on search term and selected category
  const getFilteredItems = () => {
    let filteredItems = marketItems;
    
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    return filteredItems;
  };

  // Get items to display with limit
  const getDisplayedItems = () => {
    const filteredItems = getFilteredItems();
    return filteredItems.slice(0, displayLimit);
  };

  // Check if there are more items to load
  const hasMoreItems = () => {
    return getFilteredItems().length > displayLimit;
  };

  // Load more items
  const loadMoreItems = () => {
    setDisplayLimit(prev => prev + 12); // Load 12 more items
  };

  // Reset display limit when category or search changes
  useEffect(() => {
    setDisplayLimit(12);
  }, [category, searchTerm]);

  const toggleFood = (id: string) => {
    console.log("Toggle food:", id, "Current selectedFoods:", selectedFoods);
    if (selectedFoods.includes(id)) {
      onSelect(selectedFoods.filter(item => item !== id));
    } else {
      onSelect([...selectedFoods, id]);
    }
  };

  const showNotification = (message: string) => {
    setNotification({
      message,
      visible: true
    });
    
    // Also use the toast if available
    try {
      toast.success(message, {
        duration: 3000,
      });
    } catch (error) {
      console.log("Toast not available:", error);
    }
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({...prev, visible: false}));
    }, 3000);
  };

  const handleSaveCustomFood = () => {
    if (customInput.trim()) {
      const newFood = customInput.trim();
      console.log("Saving custom food:", newFood);
      
      // Check if this food is already added
      if (customFoods.includes(newFood)) {
        toast.error("Тази храна вече е добавена!");
        return;
      }
      
      // Add to custom foods array
      setCustomFoods(prev => [...prev, newFood]);
      
      // Also update parent component if needed
      if (onCustomFoodChange) {
        onCustomFoodChange(newFood); // Just pass the new food, don't concatenate
      }
      
      // Show notification
      showNotification(`Добавена храна: ${newFood}`);
      
      // Clear input but keep custom input box open
      setCustomInput("");
    }
  };

  const handleCancelCustomFood = () => {
    setCustomInput("");
    setShowCustomInput(false);
  };

  const handleRemoveCustomFood = (food: string) => {
    setCustomFoods(prev => prev.filter(item => item !== food));
    
    // Also update parent component
    if (onCustomFoodChange) {
      // Remove just this food from the parent
      onCustomFoodChange(null);
      
      // If there are other foods, add them back one by one
      const remaining = customFoods.filter(item => item !== food);
      remaining.forEach(item => {
        onCustomFoodChange(item);
      });
    }
  };

  const getSelectedCount = (categoryName: string) => {
    return marketItems
      .filter(item => item.category === categoryName)
      .filter(item => selectedFoods.includes(item.id))
      .length;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Какви храни консумирате редовно?
        </h1>
        
        <p className="text-muted-foreground text-xl mb-8">
          Вашият хранителен план ще бъде персонализиран въз основа на типичните български хранителни продукти
        </p>
      </motion.div>
      
      {/* Notification */}
      <AnimatePresence>
        {notification.visible && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-4 right-4 z-50 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Selected items summary */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex flex-wrap gap-2 mb-4 min-h-14 p-4 bg-muted/30 rounded-lg">
          {selectedFoods.length === 0 && customFoods.length === 0 && (
            <p className="text-muted-foreground italic w-full text-center">Изберете продукти, които обикновено купувате от магазина</p>
          )}
          
          {selectedFoods.map(id => {
            const item = marketItems.find(item => item.id === id);
            return item ? (
              <Badge 
                key={id} 
                variant="secondary"
                className="px-3 py-1.5 text-sm gap-2 group bg-orange/10 hover:bg-orange/20 text-foreground"
              >
                {item.label}
                <X 
                  className="h-3.5 w-3.5 cursor-pointer opacity-70 group-hover:opacity-100" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFood(id);
                  }}
                />
              </Badge>
            ) : null;
          })}
          
          {/* Custom foods badges */}
          {customFoods.map((food, index) => (
            <Badge 
              key={`custom-${index}-${food}`}
              variant="secondary"
              className="px-3 py-1.5 text-sm gap-2 group bg-primary/10 hover:bg-primary/20 text-foreground"
            >
              {food}
              <X 
                className="h-3.5 w-3.5 cursor-pointer opacity-70 group-hover:opacity-100" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveCustomFood(food);
                }}
              />
            </Badge>
          ))}
        </div>
      </motion.div>
      
      {/* Search and filter */}
      <motion.div
        className="mb-6 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Търсене на храни..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Button
            type="button"
            variant={category === null ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(null)}
            className="whitespace-nowrap"
          >
            Всички
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              type="button"
              variant={category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat} {getSelectedCount(cat) > 0 && <span className="ml-1 text-xs">({getSelectedCount(cat)})</span>}
            </Button>
          ))}
        </div>
      </motion.div>
      
      {/* Food items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {getDisplayedItems().map((item, index) => {
          const isSelected = selectedFoods.includes(item.id);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className={cn(
                "relative rounded-lg border cursor-pointer transition-all",
                isSelected 
                  ? "border-orange bg-orange/5 shadow-sm" 
                  : "border-border hover:border-orange/20 hover:bg-muted/20"
              )}
              onClick={() => toggleFood(item.id)}
            >
              <div className="p-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                </div>
                <div className={cn(
                  "h-5 w-5 rounded-full border flex items-center justify-center transition-all",
                  isSelected 
                    ? "border-orange bg-orange text-white" 
                    : "border-muted-foreground"
                )}>
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Load more button */}
      {hasMoreItems() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mb-8"
        >
          <Button 
            type="button" 
            variant="outline" 
            onClick={loadMoreItems}
            className="gap-2"
          >
            <ChevronDown className="h-4 w-4" />
            Покажи още ({getFilteredItems().length - displayLimit})
          </Button>
        </motion.div>
      )}
      
      {/* Custom food item input */}
      {!showCustomInput ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mb-6"
        >
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowCustomInput(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Добавяне на друга храна
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 rounded-lg border border-dashed border-muted-foreground/30 p-4"
        >
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Добавяне на друга храна
          </h3>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Въведете храна..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customInput.trim()) {
                  handleSaveCustomFood();
                }
              }}
            />
            <Button 
              type="button" 
              disabled={!customInput.trim()} 
              onClick={handleSaveCustomFood}
              size="sm"
            >
              Добави
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancelCustomFood}
              size="sm"
            >
              Отказ
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Можете да добавите няколко храни една след друга
          </div>
        </motion.div>
      )}
      
      {/* Nutrition tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground mt-6"
      >
        <p>Завършете избора си, за да ни помогнете да създадем балансиран хранителен план, който включва предпочитаните от Вас храни.</p>
      </motion.div>
    </div>
  );
};

export default TraditionalFoodsStep; 