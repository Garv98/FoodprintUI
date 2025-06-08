import React from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useLeaderboard } from '../hooks/useData';
import { useAuth } from '../contexts/AuthContext';

const CommunityLeaderboard: React.FC = () => {
  const { leaderboard, loading } = useLeaderboard();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
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

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Medal className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
        2: 'bg-gradient-to-r from-gray-300 to-gray-400',
        3: 'bg-gradient-to-r from-amber-500 to-amber-600'
      };
      return colors[rank as keyof typeof colors];
    }
    return 'bg-gray-100';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
          <Trophy className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Community Leaderboard</h3>
          <p className="text-sm text-gray-500">Top eco-warriors this month</p>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {leaderboard.map((entry) => (
          <div 
            key={entry.userId} 
            className={`group p-3 rounded-xl transition-all duration-200 ${
              entry.userId === user?.id 
                ? 'bg-green-50 border border-green-200 shadow-sm' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(entry.rank)}`}>
                  {entry.rank <= 3 ? (
                    <Medal className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs font-bold text-gray-600">#{entry.rank}</span>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                {entry.profileImage ? (
                  <img 
                    src={entry.profileImage} 
                    alt={entry.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-medium text-sm">
                      {entry.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className={`text-sm font-medium truncate ${
                    entry.userId === user?.id ? 'text-green-800' : 'text-gray-900'
                  }`}>
                    {entry.username}
                    {entry.userId === user?.id && (
                      <span className="ml-2 text-xs text-green-600">(You)</span>
                    )}
                  </p>
                  {entry.rank <= 3 && (
                    <Award className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{entry.emissionsSaved}kg CO₂ saved</span>
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-bold text-gray-900">{entry.points.toLocaleString()}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Your rank: #{user ? 7 : '—'}</span>
          <button className="text-yellow-600 hover:text-yellow-800 font-medium transition-colors">
            View full leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;