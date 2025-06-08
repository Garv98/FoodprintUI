import React from 'react';
import { TreePine, TrendingDown, Star, Users } from 'lucide-react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import HighImpactProducts from '../components/HighImpactProducts';
import TransactionHistory from '../components/TransactionHistory';
import SmartSuggestions from '../components/SmartSuggestions';
import CommunityLeaderboard from '../components/CommunityLeaderboard';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Calculate tree equivalent (roughly 22kg CO2 per tree per year)
  const treesEquivalent = Math.round(user.totalEmissions / 22);
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Carbon Emissions"
            value={`${user.totalEmissions.toLocaleString()}kg`}
            subtitle={`Equals ${treesEquivalent} trees for a year`}
            icon={TreePine}
            color="orange"
            trend="down"
            trendValue="2.1%"
          />
          <StatsCard
            title="Emissions Saved"
            value={`${user.emissionsSaved.toLocaleString()}kg`}
            subtitle="Through sustainable choices"
            icon={TrendingDown}
            color="green"
            trend="up"
            trendValue="12.5%"
          />
          <StatsCard
            title="EcoPoints"
            value={user.points.toLocaleString()}
            subtitle="Ranking #7 globally"
            icon={Star}
            color="purple"
            trend="up"
            trendValue="34"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HighImpactProducts />
          <TransactionHistory />
          <SmartSuggestions />
          <CommunityLeaderboard />
        </div>

        {/* Quick Stats Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                <p className="text-sm text-gray-500">Your impact at a glance</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">This Week</span>
                <span className="text-sm font-bold text-green-700">-15.2kg CO₂</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">This Month</span>
                <span className="text-sm font-bold text-blue-700">-67.8kg CO₂</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Best Streak</span>
                <span className="text-sm font-bold text-purple-700">12 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Total Transactions</span>
                <span className="text-sm font-bold text-orange-700">156</span>
              </div>
            </div>
          </div>
          
          {/* Environmental Impact Summary */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TreePine className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Environmental Impact</h3>
                <p className="text-sm text-gray-500">Your positive contributions</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Trees Saved</span>
                <span className="text-sm font-bold text-green-700">{Math.round(user.emissionsSaved / 22)} trees</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Water Saved</span>
                <span className="text-sm font-bold text-blue-700">{Math.round(user.emissionsSaved * 2.3)}L</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Energy Saved</span>
                <span className="text-sm font-bold text-purple-700">{Math.round(user.emissionsSaved * 1.8)}kWh</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Waste Reduced</span>
                <span className="text-sm font-bold text-orange-700">{Math.round(user.emissionsSaved * 0.5)}kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;