import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  trendValue?: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue,
  color 
}) => {
  const colorClasses = {
    green: 'bg-green-500 text-green-700 bg-green-50 border-green-200',
    blue: 'bg-blue-500 text-blue-700 bg-blue-50 border-blue-200',
    purple: 'bg-purple-500 text-purple-700 bg-purple-50 border-purple-200',
    orange: 'bg-orange-500 text-orange-700 bg-orange-50 border-orange-200'
  };

  const [iconBg, textColor, cardBg, borderColor] = colorClasses[color].split(' ');

  return (
    <div className={`${cardBg} ${borderColor} border rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-${color}-100/50 hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && trendValue && (
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? '+' : '-'}{trendValue}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;