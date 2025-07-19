import { MapPin, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DishInterface } from "@/interfaces/dishes.interface";

interface DishCardProps {
  dish: DishInterface;
  restaurant: string;
  priceRange: number;
}

export const DishCard = ({ dish, restaurant, priceRange }: DishCardProps) => {
  console.log(priceRange);

  return (
    <div className="max-w-[430px] w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-semibold">
          ₾{dish.price}
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between h-[350px]">
        <div className="flex-1 flex flex-col">
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
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Restaurant: {restaurant}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(4)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < priceRange ? "disabledDollar2.svg" : "dollar2.svg"
                  }
                  className="w-4"
                  alt="dollar icon"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
