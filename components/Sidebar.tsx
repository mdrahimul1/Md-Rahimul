import React, { useEffect, useRef } from 'react';
import HomeIcon from './icons/HomeIcon';
import UsersIcon from './icons/UsersIcon';
import CogIcon from './icons/CogIcon';
import XIcon from './icons/XIcon';
import VideoCameraIcon from './icons/VideoCameraIcon';
import PhotographIcon from './icons/PhotographIcon';
import UserGroupIcon from './icons/UserGroupIcon';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, activePage, setActivePage }) => {
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const NavLink: React.FC<{ children: React.ReactNode; pageName: string; }> = ({ children, pageName }) => (
    <button 
      onClick={() => {
        setActivePage(pageName);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${activePage === pageName ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
      {children}
    </button>
  );
  
  const NavIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-6 h-6 mr-3">{children}</div>
  );

  return (
    <>
      {/* Sidebar backdrop (mobile) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-auto no-scrollbar w-64 p-4 transition-all duration-200 ease-in-out bg-gray-800 shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
             <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/></svg>
            <h1 className="text-2xl font-bold text-white ml-2">Movie Admin</h1>
          </div>
          <button
            ref={trigger}
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <XIcon />
          </button>
        </div>

        <nav className="space-y-2">
          <NavLink pageName="Dashboard">
            <NavIcon><HomeIcon /></NavIcon>
            <span>Dashboard</span>
          </NavLink>
          <NavLink pageName="Movies">
            <NavIcon><VideoCameraIcon /></NavIcon>
            <span>Movies</span>
          </NavLink>
          <NavLink pageName="Sliders">
            <NavIcon><PhotographIcon /></NavIcon>
            <span>Sliders</span>
          </NavLink>
           <NavLink pageName="Groups">
            <NavIcon><UserGroupIcon /></NavIcon>
            <span>Group Add</span>
          </NavLink>
          <NavLink pageName="Members">
            <NavIcon><UsersIcon /></NavIcon>
            <span>How To Member</span>
          </NavLink>
        </nav>
        
        <div className="mt-auto">
          <NavLink pageName="Settings">
            <NavIcon><CogIcon /></NavIcon>
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;