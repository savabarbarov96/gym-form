import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBasket, 
  Search, 
  Check,
  X, 
  Plus,
  ChevronRight,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const [customInput, setCustomInput] = useState(customFood || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  // Log props for debugging
  useEffect(() => {
    console.log("TraditionalFoodsStep props:", { 
      selectedFoods, 
      customFood,
      selectedFoodsType: typeof selectedFoods,
      selectedFoodsIsArray: Array.isArray(selectedFoods)
    });
  }, [selectedFoods, customFood]);

  // Common Bulgarian market items with categories
  const marketItems = [
    { 
      label: "White Bread (Pitka)", 
      id: "white_bread", 
      category: "Bakery"
    },
    { 
      label: "Whole Grain Bread", 
      id: "whole_grain_bread", 
      category: "Bakery"
    },
    { 
      label: "Milk", 
      id: "milk", 
      category: "Dairy"
    },
    { 
      label: "Bulgarian Yogurt (Kiselo Mlyako)", 
      id: "yogurt", 
      category: "Dairy"
    },
    { 
      label: "White Brined Cheese (Sirene)", 
      id: "white_cheese", 
      category: "Dairy"
    },
    { 
      label: "Eggs", 
      id: "eggs", 
      category: "Dairy"
    },
    { 
      label: "Butter", 
      id: "butter", 
      category: "Dairy"
    },
    { 
      label: "Sunflower Oil", 
      id: "sunflower_oil", 
      category: "Oils"
    },
    { 
      label: "Other Vegetable Oils", 
      id: "vegetable_oils", 
      category: "Oils"
    },
    { 
      label: "Sugar", 
      id: "sugar", 
      category: "Baking"
    },
    { 
      label: "Flour", 
      id: "flour", 
      category: "Baking"
    },
    { 
      label: "Rice", 
      id: "rice", 
      category: "Grains"
    },
    { 
      label: "Pasta", 
      id: "pasta", 
      category: "Grains"
    },
    { 
      label: "Potatoes", 
      id: "potatoes", 
      category: "Vegetables"
    },
    { 
      label: "Tomatoes", 
      id: "tomatoes", 
      category: "Vegetables"
    },
    { 
      label: "Cucumbers", 
      id: "cucumbers", 
      category: "Vegetables"
    },
    { 
      label: "Bell Peppers", 
      id: "bell_peppers", 
      category: "Vegetables"
    },
    { 
      label: "Onions", 
      id: "onions", 
      category: "Vegetables"
    },
    { 
      label: "Garlic", 
      id: "garlic", 
      category: "Vegetables"
    },
    { 
      label: "Carrots", 
      id: "carrots", 
      category: "Vegetables"
    },
    { 
      label: "Apples", 
      id: "apples", 
      category: "Fruits"
    },
    { 
      label: "Bananas", 
      id: "bananas", 
      category: "Fruits"
    },
    { 
      label: "Citrus Fruits", 
      id: "citrus_fruits", 
      category: "Fruits"
    },
    { 
      label: "Chicken Meat", 
      id: "chicken", 
      category: "Meat"
    },
    { 
      label: "Pork Meat", 
      id: "pork", 
      category: "Meat"
    },
    { 
      label: "Fish", 
      id: "fish", 
      category: "Seafood"
    },
    { 
      label: "Sausages", 
      id: "sausages", 
      category: "Processed Meat"
    },
    { 
      label: "Canned Tuna", 
      id: "canned_tuna", 
      category: "Seafood"
    },
    { 
      label: "Legumes (beans, lentils)", 
      id: "legumes", 
      category: "Grains"
    },
    { 
      label: "Mineral Water", 
      id: "mineral_water", 
      category: "Beverages"
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

  const toggleFood = (id: string) => {
    console.log("Toggle food:", id, "Current selectedFoods:", selectedFoods);
    if (selectedFoods.includes(id)) {
      onSelect(selectedFoods.filter(item => item !== id));
    } else {
      onSelect([...selectedFoods, id]);
    }
  };

  const handleSaveCustomFood = () => {
    if (customInput.trim()) {
      console.log("Saving custom food:", customInput.trim());
      onCustomFoodChange(customInput.trim());
      setShowCustomInput(false);
    }
  };

  const handleCancelCustomFood = () => {
    setCustomInput("");
    setShowCustomInput(false);
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
          What Foods Do You Regularly Eat?
        </h1>
        
        <p className="text-muted-foreground text-xl mb-8">
          Your diet plan will be personalized based on your typical Bulgarian market items
        </p>
      </motion.div>
      
      {/* Selected items summary */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex flex-wrap gap-2 mb-4 min-h-14 p-4 bg-muted/30 rounded-lg">
          {selectedFoods.length === 0 && (
            <p className="text-muted-foreground italic w-full text-center">Select items you typically buy at the market</p>
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
          {customFood && (
            <Badge 
              variant="secondary"
              className="px-3 py-1.5 text-sm gap-2 group bg-primary/10 hover:bg-primary/20 text-foreground"
            >
              {customFood}
              <X 
                className="h-3.5 w-3.5 cursor-pointer opacity-70 group-hover:opacity-100" 
                onClick={(e) => {
                  e.stopPropagation();
                  onCustomFoodChange(null);
                }}
              />
            </Badge>
          )}
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
            placeholder="Search foods..."
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
            All Items
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {getFilteredItems().map((item, index) => {
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
            Add Custom Food Item
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
            Add Custom Food Item
          </h3>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter food item..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button 
              type="button" 
              disabled={!customInput.trim()} 
              onClick={handleSaveCustomFood}
              size="sm"
            >
              Add
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancelCustomFood}
              size="sm"
            >
              Cancel
            </Button>
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
        <p>Complete your selection to help us create a balanced nutrition plan that incorporates your preferred foods.</p>
      </motion.div>
    </div>
  );
};

export default TraditionalFoodsStep; 