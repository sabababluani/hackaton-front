
import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for dishes like 'ხინკალი', 'ხაჭაპური' or 'vegetarian'..."
              value={query}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-none outline-none placeholder-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-2 mr-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Location
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
            
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl"
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Quick search suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {["ხინკალი", "ხაჭაპური", "vegetarian", "spicy", "traditional"].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion);
            }}
            className="px-4 py-2 bg-white/70 hover:bg-white rounded-full text-sm text-gray-600 hover:text-primary border border-gray-200 hover:border-primary/30 transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
