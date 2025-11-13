import { Bell, Search, User, ArrowLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HRHeader({ title = "HR Dashboard", onBack, canGoBack }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // useRef to create a reference to the profile button and dropdown for click detection
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside both the dropdown and the profile button, close the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event) => {
    // Stop propagation to prevent the document-level click listener from immediately closing it
    event.stopPropagation();
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogoutClick = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Close dropdown
    setIsDropdownOpen(false);
    
    // Redirect to login page
    navigate('/');
  };

  const backButtonClasses = `p-2 rounded-lg transition-colors duration-200 ${
    canGoBack 
      ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100' 
      : 'text-gray-300 cursor-not-allowed'
  }`;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={canGoBack ? onBack : undefined}
            className={backButtonClasses}
            disabled={!canGoBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">Engineers India Limited</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              ref={profileButtonRef} // Attach ref to the button
              onClick={toggleDropdown}
              className="bg-transparent border-none"
            >
              <img src="../../../src/assets/profile.svg" alt="Profile" className="w-[7] h-[7] border-2 border-white rounded-full p-1 bg-blue-900" ></img>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef} // Attach ref to the dropdown div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="profile-menu-button"
              >
                <button
                  onClick={handleLogoutClick}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 rounded-b-md bg-transparent border-none"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            )}
            <span className="text-gray-700 font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}