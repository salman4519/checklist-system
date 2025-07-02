import { Link } from 'react-router-dom';

export default function NavigationGrid() {
  const cards = [
    {
      title: 'Opening Checklist',
      icon: 'ri-sun-line',
      href: '/opening',
      description: 'Start your day with systematic opening procedures',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Closing Checklist',
      icon: 'ri-moon-line',
      href: '/closing',
      description: 'End your day with comprehensive closing tasks',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Magister Panel',
      icon: 'ri-settings-line',
      href: '/magister',
      description: 'Advanced management and configuration tools',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {cards.map((card) => (
        <Link
          key={card.title}
          to={card.href}
          className="group cursor-pointer"
        >
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mr-3 sm:mr-4`}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <i className={`${card.icon} text-white text-lg sm:text-xl`}></i>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                {card.title}
              </h3>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
              {card.description}
            </p>
            <div className="flex items-center text-purple-400 text-xs sm:text-sm">
              <span className="mr-2">Access now</span>
              <div className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 