import { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "@/components/SearchBar";
import { DishCard } from "@/components/DishCard";
import { MapView } from "@/components/MapView";
import { RecommendationTabs } from "@/components/RecommendationTabs";
import { HeroSection } from "@/components/HeroSection";
import { DishInterface } from "@/interfaces/dishes.interface";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState<DishInterface[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<DishInterface[]>([]);
  const [activeView, setActiveView] = useState<"cards" | "map">("cards");

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(
          "https://hackathon-back-crmr.onrender.com/dishes"
        );

        const normalized: DishInterface[] = response.data.map((dish) => ({
          id: dish.id,
          restaurantId: dish.restaurantId,
          name: dish.name,
          description: dish.description,
          price: dish.price,
          imageUrl: dish.imageUrl,
          ingredients: dish.ingredients || [],
          tags: dish.tags || [],
          allergens: dish.allergens || [],
        }));

        setDishes(normalized);
        setFilteredDishes(normalized);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredDishes(dishes);
    } else {
      const filtered = dishes.filter(
        (dish) =>
          dish.name.toLowerCase().includes(query.toLowerCase()) ||
          dish.description.toLowerCase().includes(query.toLowerCase()) ||
          dish.ingredients?.some((ingredient: string) =>
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
              onClick={() => setActiveView("cards")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeView === "cards"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dish Cards
            </button>
            <button
              onClick={() => setActiveView("map")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeView === "map"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Map View
            </button>
          </div>
        </div>

        {activeView === "cards" ? (
          <>
            <RecommendationTabs />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : "Featured Dishes"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>

              {filteredDishes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No dishes found matching your search.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Try searching for "ხინკალი" or "ხაჭაპური"
                  </p>
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
