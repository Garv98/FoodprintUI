import React, { useState } from 'react';
import { History, Filter, Calendar, ShoppingCart } from 'lucide-react';
import { useTransactions } from '../hooks/useData';
import { useAuth } from '../contexts/AuthContext';

const TransactionHistory: React.FC = () => {
  const { user } = useAuth();
  const { transactions, loading } = useTransactions(user?.id || '');
  const [filter, setFilter] = useState('all');

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
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

  const getEmissionColor = (emissions: number) => {
    if (emissions >= 10) return 'text-red-600 bg-red-100';
    if (emissions >= 5) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'fruits':
      case 'vegetables':
        return '🥬';
      case 'meat':
        return '🥩';
      case 'plant-based':
        return '🌱';
      default:
        return '🛒';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <History className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            <p className="text-sm text-gray-500">Recent purchases and their impact</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="group">
            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                  {getCategoryIcon(transaction.category)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{transaction.productName}</p>
                  {transaction.brand && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {transaction.brand}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{transaction.store}</span>
                  <span>Qty: {transaction.quantity}</span>
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmissionColor(transaction.emissions)}`}>
                  {transaction.emissions}kg CO₂
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          View all transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;