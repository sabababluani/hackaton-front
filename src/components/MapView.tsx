
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DishInterface } from "@/interfaces/dishes.interface";


interface MapViewProps {
  dishes: DishInterface[];
}

export const MapView = ({ dishes }: MapViewProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Map Header */}
      <div className="bg-primary text-white p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Restaurant Locations
        </h2>
        <p className="text-primary-foreground/80 mt-1">
          Discover great dishes near you
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 relative flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map Coming Soon</h3>
          <p className="text-gray-500">We're working on an amazing map experience</p>
        </div>

        {/* Mock location pins */}
        <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Restaurants with Your Dishes</h3>
        <div className="space-y-3">
          {dishes.slice(0, 3).map((dish, index) => (
            <div key={dish.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={dish.image_url}
                alt={dish.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{dish.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    Restaurant #{dish.restaurantId.replace('rest_', '')}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">4.8</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary">₾{dish.price.toFixed(2)}</div>
                <div className="text-xs text-gray-500">2.3 km</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
