
import { useState } from "react";
import { Trophy, MapPin, Compass } from "lucide-react";

export const RecommendationTabs = () => {
  const [activeTab, setActiveTab] = useState<'best' | 'nearest' | 'explore'>('best');

  const tabs = [
    {
      id: 'best' as const,
      label: 'Best Option',
      icon: Trophy,
      description: 'Top-rated dishes based on quality and reviews'
    },
    {
      id: 'nearest' as const,
      label: 'Nearest Best',
      icon: MapPin,
      description: 'Great dishes closest to your location'
    },
    {
      id: 'explore' as const,
      label: 'Best to Explore',  
      icon: Compass,
      description: 'Hidden gems and unique dining experiences'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Personalized Recommendations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  activeTab === tab.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-semibold ${
                    activeTab === tab.id ? 'text-primary' : 'text-gray-800'
                  }`}>
                    {tab.label}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {tab.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
