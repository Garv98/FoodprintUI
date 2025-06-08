import React from 'react';
import { Lightbulb, TrendingDown, Star, ArrowRight } from 'lucide-react';

const SmartSuggestions: React.FC = () => {
  const suggestions = [
    {
      id: '1',
      title: 'Switch to Plant-Based Milk',
      description: 'Replace dairy milk with oat or almond alternatives',
      potentialSavings: 4.2,
      difficulty: 'Easy',
      category: 'Dairy Alternatives',
      impact: 'High'
    },
    {
      id: '2',
      title: 'Choose Local Seasonal Fruits',
      description: 'Buy fruits that are in season and locally grown',
      potentialSavings: 2.8,
      difficulty: 'Easy',
      category: 'Fresh Produce',
      impact: 'Medium'
    },
    {
      id: '3',
      title: 'Reduce Meat Consumption',
      description: 'Try 2-3 plant-based meals per week',
      potentialSavings: 8.5,
      difficulty: 'Medium',
      category: 'Protein Sources',
      impact: 'High'
    },
    {
      id: '4',
      title: 'Bulk Purchase Non-Perishables',
      description: 'Buy grains, legumes, and spices in larger quantities',
      potentialSavings: 1.9,
      difficulty: 'Easy',
      category: 'Pantry Staples',
      impact: 'Low'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Smart Suggestions</h3>
          <p className="text-sm text-gray-500">AI-powered eco-friendly recommendations</p>
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="group">
            <div className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{suggestion.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                      {suggestion.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{suggestion.category}</span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-purple-600 hover:bg-purple-100 rounded-lg">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingDown className={`w-4 h-4 ${getImpactColor(suggestion.impact)}`} />
                  <span className="text-sm font-medium text-gray-900">
                    -{suggestion.potentialSavings}kg CO₂/week
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-500">{suggestion.impact} Impact</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors">
          View all suggestions
        </button>
      </div>
    </div>
  );
};

export default SmartSuggestions;