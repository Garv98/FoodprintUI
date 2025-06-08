import React from 'react';
import { AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';
import { useHighImpactProducts } from '../hooks/useData';

const HighImpactProducts: React.FC = () => {
  const { products, loading } = useHighImpactProducts();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getHarmfulnessColor = (level: string) => {
    switch (level) {
      case 'extreme': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">High-Impact Products</h3>
          <p className="text-sm text-gray-500">Items with highest carbon footprint</p>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="group">
            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div className="w-2 h-8 bg-gradient-to-t from-red-500 to-orange-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHarmfulnessColor(product.harmfulnessLevel)}`}>
                    {product.harmfulnessLevel}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{product.category}</span>
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{product.avgEmissions}kg CO₂</span>
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <Lightbulb className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Alternatives (shown on hover) */}
            <div className="hidden group-hover:block ml-12 mt-2 p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-xs font-medium text-green-800 mb-2">Eco-friendly alternatives:</p>
              <div className="flex flex-wrap gap-1">
                {product.alternatives?.map((alt, i) => (
                  <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighImpactProducts;