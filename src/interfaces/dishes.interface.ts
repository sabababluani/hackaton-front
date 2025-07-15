// Restaurant Interface
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
}

// Dish Interface (with restaurant relation)
export interface DishInterface {
    id: number;
    restaurantId: string;
    restaurant?: RestaurantInterface; // Optional relation
    name: string;
    description: string;
    price: number;
    image_url: string;
    ingredients: string[];
    tags: string[];
    allergens: string[];
}
