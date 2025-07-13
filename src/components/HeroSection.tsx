
import { Utensils, MapPin, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative georgian-gradient text-white py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full float-animation"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full float-animation" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            S.U.P.R.A.
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 opacity-90 font-light">
            Search Utility for Personalized Restaurant Analytics
          </p>
          
          <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto leading-relaxed">
            Discover authentic Georgian cuisine with AI-powered recommendations. 
            Find your perfect dish, not just restaurants.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Utensils className="w-5 h-5" />
              <span>Dish-Based Search</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <MapPin className="w-5 h-5" />
              <span>Location-Smart</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Sparkles className="w-5 h-5" />
              <span>AI-Powered</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            "Craving Something Delicious? Let S.U.P.R.A. Guide You."
          </h2>
        </div>
      </div>
    </div>
  );
};
