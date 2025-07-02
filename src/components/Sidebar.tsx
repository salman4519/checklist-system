import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: 'ri-dashboard-line' },
    { name: 'Opening', href: '/opening', icon: 'ri-sun-line' },
    { name: 'Closing', href: '/closing', icon: 'ri-moon-line' },
    { name: 'Magister Panel', href: '/magister', icon: 'ri-admin-line' },
  ];

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Brand */}
        <div className="flex items-center px-6 py-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white font-pacifico">
            Curiosity Weekends
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                location.pathname === item.href
                  ? 'bg-purple-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center mr-3">
                <i className={item.icon}></i>
              </div>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
} 