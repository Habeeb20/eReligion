import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activePage, setActivePage] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'About us', link: '/about' },
    { name: 'Religion', link: '/religion' },
    { name: 'Report', link: '/report' },
    { name: 'Profile', link: '/login' },
    { name: 'Blacklist', link: '/blacklist' },
  ];

  return (
    <nav className="bg-indigo-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bolder text-white">e-religion</h1>

        {/* Mobile hamburger menu */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className={`py-2 px-4 rounded ${
                activePage === item.name
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white hover:text-black'
              }`}
              onClick={() => setActivePage(item.name)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-indigo-900 px-6 space-y-2 pb-4">
          {navItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className={`py-2 px-4 rounded ${
                activePage === item.name
                  ? 'bg-white text-black'
                  : 'text-black hover:bg-white hover:text-black'
              }`}
              onClick={() => setActivePage(item.name)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
