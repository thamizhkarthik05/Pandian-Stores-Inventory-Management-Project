// src/components/layout/Header.jsx
// Top header bar with shop name and date/time
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

/**
 * Header Component - Top navigation bar with real-time clock
 * @param {object} props - Component props
 * @param {function} props.setIsMobileOpen - Function to open mobile menu
 */
const Header = ({ setIsMobileOpen }) => {
  // 1. Initialize state with the current date/time
  const [currentTime, setCurrentTime] = useState(new Date());

  // 2. Set up an interval to update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 3. Clean up the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Retail Shop Management
            </h2>
            <p className="text-sm text-gray-500">
              Ungal Anbil,Engal Aanandham
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-m font-medium text-gray-700">
            {currentTime.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-xs text-gray-500">
            {currentTime.toLocaleTimeString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;