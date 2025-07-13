
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { DishCard } from "@/components/DishCard";
import { MapView } from "@/components/MapView";
import { RecommendationTabs } from "@/components/RecommendationTabs";
import { HeroSection } from "@/components/HeroSection";

// Sample dishes data based on the provided JSON structure
const sampleDishes = [
  {
    id: "dish_001",
    restaurant_id: "rest_001",
    name: "ხინკალი ხორცითა და ყველით",
    description: "ტრადიციული ქართული ხინკალი, მომზადებული ღორისა და ძროხის ხორცისგან, მდიდარი იუხითა და სანელებლებით.",
    price: 12.00,
    image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ingredients: ["ხორცი", "ყველი", "ფქვილი", "ხახვი", "კინძი"],
    tags: ["ტრადიციული", "მთავარი კერძი", "ქართული"],
    allergens: ["ფქვილი", "რძის პროდუქტები"]
  },
  {
    id: "dish_002",
    restaurant_id: "rest_002", 
    name: "აჯარული ხაჭაპური",
    description: "გახსნილი ლოდისფორმის ხაჭაპური ყველით, კვერცხითა და კარაქით, აჯარეთის ტრადიციული რეცეპტით.",
    price: 15.00,
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ingredients: ["ფქვილი", "ყველი", "კვერცხი", "კარაქი", "რძე"],
    tags: ["ტრადიციული", "ღუმელში გამომცხვარი", "აჯარული"],
    allergens: ["ფქვილი", "რძის პროდუქტები", "კვერცხი"]
  },
  {
    id: "dish_003",
    restaurant_id: "rest_003",
    name: "მჟავე კბილის სუპი",
    description: "ტრადიციული ქართული სუპი მჟავე კბილით, ხორცით და ბრინჯით, მდიდარი გემოთი.",
    price: 8.50,
    image_url: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ingredients: ["მჟავე კბილი", "ხორცი", "ბრინჯი", "ხახვი", "ნაცარი"],
    tags: ["სუპი", "ტრადიციული", "ცხელი"],
    allergens: []
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDishes, setFilteredDishes] = useState(sampleDishes);
  const [activeView, setActiveView] = useState<'cards' | 'map'>('cards');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredDishes(sampleDishes);
    } else {
      const filtered = sampleDishes.filter(dish => 
        dish.name.toLowerCase().includes(query.toLowerCase()) ||
        dish.description.toLowerCase().includes(query.toLowerCase()) ||
        dish.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredDishes(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        
        <div className="mt-8 mb-6 flex justify-center">
          <div className="flex bg-white rounded-lg shadow-sm border p-1">
            <button
              onClick={() => setActiveView('cards')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeView === 'cards' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dish Cards
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeView === 'map' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Map View
            </button>
          </div>
        </div>

        {activeView === 'cards' ? (
          <>
            <RecommendationTabs />
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                {searchQuery ? `Results for "${searchQuery}"` : "Featured Dishes"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
              
              {filteredDishes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No dishes found matching your search.</p>
                  <p className="text-gray-400 mt-2">Try searching for "ხინკალი" or "ხაჭაპური"</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <MapView dishes={filteredDishes} />
        )}
      </div>
    </div>
  );
};

export default Index;
