import { MapPin, Star, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DishInterface } from "@/interfaces/dishes.interface";
import { useEffect, useState } from "react";
import axios from "axios";

interface DishCardProps {
  dish: DishInterface;
}

export const DishCard = ({ dish }: DishCardProps) => {
  const [restaurant, setRestaurant] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://hackathon-back-crmr.onrender.com/restaurants/${dish.restaurantId}`
      )
      .then((res) => setRestaurant(res.data.name));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.image_url}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-semibold">
          ₾{dish.price}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {dish.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {dish.description}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Ingredients:
          </h4>
          <div className="flex flex-wrap gap-1">
            {dish.ingredients.slice(0, 4).map((ingredient, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {ingredient}
              </Badge>
            ))}
            {dish.ingredients.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{dish.ingredients.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {dish.allergens.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-semibold text-gray-700">
                Allergens:
              </h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {dish.allergens.map((allergen, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Restaurant: {restaurant}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.8</span>
            </div>

            <Button size="sm" className="bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
