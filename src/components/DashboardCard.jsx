import React from 'react';
import '../styles/glassmorphism.css';

const DashboardCard = ({ title, value, icon, color = 'blue', onClick }) => {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
  };
  
  const gradientClass = colorClasses[color] || colorClasses.blue;
  
  return (
    <div 
      className="glass-card p-6 rounded-xl relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
      onClick={onClick}
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${gradientClass} opacity-30`}></div>
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <div className="text-3xl font-bold text-gray-800">{value}</div>
        </div>
        
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;