import { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "@/components/SearchBar";
import { DishCard } from "@/components/DishCard";
import { HeroSection } from "@/components/HeroSection";
import {
  DishInterface,
  RestaurantInterface,
} from "@/interfaces/dishes.interface";
import { useForm } from "react-hook-form";
import { ImageIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormInputsPropsInterface {
  searchQuery: string;
  image: FileList;
}

const Index = () => {
  const [filteredDishes, setFilteredDishes] = useState<DishInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>([]);
  const { register, handleSubmit, reset } = useForm<FormInputsPropsInterface>();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(
          "https://hackathon-back-crmr.onrender.com/restaurants"
        );

        const restaurants: RestaurantInterface[] = response.data;

        const allDishes: (DishInterface & { restaurantName: string })[] =
          restaurants.flatMap((restaurant) =>
            restaurant.dishes.map((dish) => ({
              ...dish,
              restaurantName: restaurant.name,
            }))
          );

        setRestaurants(restaurants);
        setFilteredDishes(allDishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  const onHandleSubmit = async (value: FormInputsPropsInterface) => {
    const data = new FormData();
    data.append("searchQuery", value.searchQuery);
    data.append("file", value.image[0]);

    for (const [key, val] of data.entries()) {
      console.log(`${key}:`, val);
    }

    try {
      const response = await axios.post(
        "https://hackathon-back-crmr.onrender.com/dishes/search",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the backend response and map the results
      // const searchResults: DishInterface[] = response.data.map((dish: any) => ({
      //   id: dish.id,
      //   restaurantId: dish.restaurantId,
      //   name: dish.name,
      //   description: dish.description,
      //   price: dish.price,
      //   imageUrl: dish.imageUrl,
      //   ingredients: dish.ingredients || [],
      //   tags: dish.tags || [],
      //   allergens: dish.allergens || [],
      // }));

      // // Update the filtered dishes with search results
      setFilteredDishes(response.data);
      setSearchQuery(value.searchQuery);

      reset();
    } catch (error) {
      alert("შეცდომა ძებნისას, გთხოვთ სცადოთ თავიდან");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onHandleSubmit)} className="relative">
            <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="მოძებნე კერძები, მაგალითად: 'ხინკალი', 'ხაჭაპური'..."
                  {...register("searchQuery", {
                    required: "მოთხოვნილია ძებნის ველი",
                  })}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-none outline-none placeholder-gray-400"
                />
              </div>

              <div className="flex items-center gap-2 mr-2">
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("fileUpload")?.click()
                    }
                    className="p-2 rounded-xl hover:bg-gray-100 transition"
                  >
                    <ImageIcon className="w-6 h-6 text-gray-500" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    id="fileUpload"
                    {...register("image", {
                      required: "მოთხოვნილია ფაილის ატვირთვა",
                    })}
                    style={{ display: "none" }}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl"
                >
                  მოძებნა
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {searchQuery ? `"${searchQuery}"-ის შედეგი` : "გამორჩეული კერძები"}
          </h2>

          <div className="flex flex-col gap-8">
            {restaurants.map((restaurant) => (
              <div className="flex flex-col">
                <h3 className="font-bold text-2xl">
                  რესტორიანი:
                  <span className="underline italic"> {restaurant.name}</span>
                </h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  {restaurant.dishes.map((dish) => (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      restaurant={restaurant.name}
                      priceRange={restaurant.priceRange}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                თქვენი ძიების შესაბამისი კერძები ვერ მოიძებნა.
              </p>
              <p className="text-gray-400 mt-2">
                მოძებნე "ხინკალი" ან "ხაჭაპური"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
