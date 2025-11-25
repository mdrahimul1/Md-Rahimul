import React from 'react';
import SearchIcon from './icons/SearchIcon';
import BellIcon from './icons/BellIcon';
import MenuIcon from './icons/MenuIcon';
import { useAuth } from '../AuthContext';


interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="sticky top-0 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex items-center">
            {/* Hamburger button */}
            <button
              className="text-gray-400 hover:text-gray-200 lg:hidden mr-4"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon />
            </button>

            {/* Search */}
            <div className="relative hidden sm:block">
              <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-700 border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:ring-primary focus:border-primary"
              />
            </div>
          </div>


          <div className="flex items-center space-x-5">
            <button className="relative text-gray-400 hover:text-white">
              <BellIcon />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-3">
              <img src={`https://ui-avatars.com/api/?name=${currentUser?.email}&background=6366f1&color=fff`} alt="User" className="w-10 h-10 rounded-full" />
              <div className="hidden md:block">
                <p className="font-semibold text-white truncate max-w-28">{currentUser?.email}</p>
                 <button onClick={logout} className="text-xs text-red-400 hover:underline">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;