
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:-translate-y-1">
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
      </div>
      <div className="bg-gray-700 p-3 rounded-full text-primary">
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;
