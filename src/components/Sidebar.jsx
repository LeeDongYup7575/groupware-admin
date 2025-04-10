import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import '../styles/glassmorphism.css';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700 hover:bg-indigo-50';
  };
  
  return (
    <div className="glass-dark h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-white mb-1">그룹웨어 관리자</h2>
        <p className="text-gray-300 text-sm mb-8">Admin Portal</p>
        
        {user && (
          <div className="mb-6 pb-6 border-b border-gray-600">
            <p className="text-white font-medium">{user.name}</p>
            <p className="text-gray-300 text-sm">{user.departmentName} | {user.positionTitle}</p>
            <p className="text-gray-300 text-xs mt-1">{user.email}</p>
          </div>
        )}
        
        <nav className="space-y-2">
          <Link
            to="/"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/')}`}
          >
            <FiHome className="text-lg" />
            <span>대시보드</span>
          </Link>
          
          <Link
            to="/employees"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/employees')}`}
          >
            <FiUsers className="text-lg" />
            <span>임직원 관리</span>
          </Link>
          
          <Link
            to="/bookings"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/bookings')}`}
          >
            <FiCalendar className="text-lg" />
            <span>예약 관리</span>
          </Link>
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-4">
        <button
          onClick={logout}
          className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-red-500 rounded-lg transition-colors duration-200"
        >
          <FiLogOut />
          <span>그룹웨어 홈으로</span>
        </button>
        
        <div className="text-gray-400 text-xs text-center mt-4">
          © 2025 TechX 관리자 시스템
        </div>
      </div>
    </div>
  );
};

export default Sidebar;