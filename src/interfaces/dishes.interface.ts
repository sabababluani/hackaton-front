export interface RestaurantInterface {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  workingHours: string;
  phone: string;
  priceRange: number;
  atmosphere: string[];
  dishes: DishInterface[];
}

export interface DishInterface {
  id: number;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  tags: string[];
  allergens: string[];
}
