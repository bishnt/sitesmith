import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hammer, Code, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-950 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Hammer className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            SiteSmith
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-green-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          {location.pathname === '/editor' && (
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              <Code className="w-4 h-4" />
              <span>Editor</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;