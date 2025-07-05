import React from 'react';
import { Sidebar, X } from 'lucide-react';

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 lg:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {isMenuOpen ? <X size={20} /> : <Sidebar size={20} />}
            </div>
          </button>

          {/* Brand */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-white font-pacifico">
              Curiosity Weekends
            </h1>
          </div>

          {/* Spacer to balance the layout */}
          <div className="w-10"></div>
        </div>
      </div>
    </nav>
  );
} 