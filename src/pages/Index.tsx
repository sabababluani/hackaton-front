import { useEffect, useState } from "react";
import axios from "axios";
import { DishCard } from "@/components/DishCard";
import { HeroSection } from "@/components/HeroSection";
import { RestaurantInterface } from "@/interfaces/dishes.interface";
import { useForm } from "react-hook-form";
import { ImageIcon, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormInputsPropsInterface {
  text?: string;
  image?: FileList;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, watch } =
    useForm<FormInputsPropsInterface>();

  const selectedImage = watch("image");

  useEffect(() => {
    const fetchDishes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://hackathon-back-crmr.onrender.com/restaurants"
        );

        const restaurants: RestaurantInterface[] = response.data;

        setRestaurants(restaurants);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    if (selectedImage && selectedImage.length > 0) {
      const file = selectedImage[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [selectedImage]);

  const onHandleSubmit = async (value: FormInputsPropsInterface) => {
    const data = new FormData();

    // Check if we have either text or image
    const hasText = value.text && value.text.trim() !== "";
    const hasImage = value.image && value.image.length > 0;

    if (!hasText && !hasImage) {
      alert("გთხოვთ შეიყვანოთ ტექსტი ან ატვირთოთ სურათი");
      return;
    }

    if (hasText) {
      data.append("text", value.text!.trim());
    }

    if (hasImage) {
      data.append("image", value.image![0]);
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://hackathon-back-crmr.onrender.com/restaurants/search-ai",
        data
      );

      setRestaurants(response.data);
      setSearchQuery(hasText ? value.text! : "სურათით ძიება");

      reset();
      setImagePreview(null);
    } catch (error) {
      alert(
        `შეცდომა ძებნისას: ${error.response?.status || "Unknown error"} - ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
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
                  placeholder="მოძებნე კერძები, მაგალითად: 'ხინკალი', 'ხაჭაპური'... ან ატვირთე სურათი"
                  {...register("text")}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-none outline-none placeholder-gray-400"
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center gap-2 mr-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("fileUpload")?.click()
                    }
                    disabled={isLoading}
                    className={`p-2 rounded-xl transition ${
                      selectedImage && selectedImage.length > 0
                        ? "bg-green-100 text-green-600"
                        : "hover:bg-gray-100 text-gray-500"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <ImageIcon className="w-6 h-6" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    id="fileUpload"
                    {...register("image")}
                    style={{ display: "none" }}
                    disabled={isLoading}
                  />
                  {selectedImage && selectedImage.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>მოძებნა...</span>
                    </div>
                  ) : (
                    "მოძებნა"
                  )}
                </Button>
              </div>
            </div>

            {imagePreview && (
              <div className="mt-4 flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200 w-fit">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Selected preview"
                    className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      reset({ image: undefined });
                      setImagePreview(null);
                    }}
                    disabled={isLoading}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex justify-center text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    x
                  </button>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    არჩეული სურათი
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {searchQuery ? `"${searchQuery}"-ის შედეგი` : "გამორჩეული კერძები"}
          </h2>

          <div className="flex flex-col gap-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex flex-col">
                <div className="relative p-6 bg-gradient-to-r from-orange-50 via-white to-red-50 shadow-xl rounded-2xl border border-orange-200 flex w-fit gap-4 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-orange-400 to-red-400 rounded-l-2xl" />
                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full shadow-inner border-2 border-orange-200">
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label="restaurant"
                    >
                      🍽️
                    </span>
                  </div>
                  <div className="z-10 ml-2">
                    <h3 className="text-xl font-bold text-gray-700">
                      რესტორანი:
                      <span className="ml-3 text-2xl md:text-3xl font-extrabold text-orange-600 drop-shadow-sm">
                        {restaurant.name}
                      </span>
                    </h3>
                  </div>
                </div>

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

          {restaurants.length === 0 && searchQuery && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                თქვენი ძიების შესაბამისი კერძები ვერ მოიძებნა.
              </p>
              <p className="text-gray-400 mt-2">
                მოძებნე "ხინკალი" ან "ხაჭაპური"
              </p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12">
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                <p className="text-gray-600 text-lg">იტვირთება...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
