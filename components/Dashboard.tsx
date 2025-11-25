import React from 'react';
import VideoCameraIcon from './icons/VideoCameraIcon';
import PhotographIcon from './icons/PhotographIcon';
import UsersIcon from './icons/UsersIcon';
import UserGroupIcon from './icons/UserGroupIcon';

interface DashboardProps {
  setActivePage: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {

  const NavCard: React.FC<{ title: string; page: string; icon: React.ReactNode }> = ({ title, page, icon }) => (
    <button
      onClick={() => setActivePage(page)}
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-primary/30"
    >
      <div className="bg-gray-700 p-4 rounded-full text-primary mb-4">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-gray-400 mt-1">Click to manage</p>
    </button>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Welcome, Admin!</h1>
      <p className="text-gray-400 mb-8">Select a category below to start managing your movie app content.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NavCard title="Manage Movies" page="Movies" icon={<VideoCameraIcon className="w-8 h-8"/>} />
        <NavCard title="Manage Sliders" page="Sliders" icon={<PhotographIcon className="w-8 h-8"/>} />
        <NavCard title="Manage Groups" page="Groups" icon={<UserGroupIcon className="w-8 h-8"/>} />
        <NavCard title="Manage Members" page="Members" icon={<UsersIcon className="w-8 h-8"/>} />
      </div>
    </div>
  );
};

export default Dashboard;