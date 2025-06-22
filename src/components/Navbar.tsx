import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, ChefHat, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import NotificationBell from './NotificationBell';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <ChefHat className="h-8 w-8 text-bakery-primary group-hover:scale-110 transition-transform" />
            <span className="font-playfair text-2xl font-bold text-bakery-dark group-hover:text-bakery-primary transition-colors">
              Mr Bakers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">Contact</Link>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
              <a href="https://www.instagram.com/muhammadmudassar115/" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-pink-500 transition-colors transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://web.facebook.com/profile.php?id=100054751252870" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@mudassarrajput346?_t=ZS-8xOQ9f8UqEi&_r=1" target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-black transition-colors transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Greeting */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-3 bg-bakery-secondary px-3 py-2 rounded-lg">
                <UserCircle className="h-5 w-5 text-bakery-primary" />
                <span className="text-sm font-medium text-bakery-dark">
                  Hello, {user?.name?.split(' ')[0]}!
                </span>
              </div>
            )}

            {/* Notifications Bell */}
            {isAuthenticated && (
              <NotificationBell />
            )}
            
            {/* Shopping Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-bakery-primary transition-colors group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bakery-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-bakery-primary transition-colors p-2 rounded-lg hover:bg-bakery-secondary"
                >
                  <User className="h-6 w-6" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-bakery-secondary transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <UserCircle className="h-4 w-4 inline mr-2" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signup" className="bg-bakery-primary text-white px-4 py-2 rounded-lg hover:bg-bakery-accent transition-colors font-medium">
                Sign Up
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-bakery-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">Products</Link>
              <Link to="/about" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">Contact</Link>
              {isAuthenticated && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <UserCircle className="h-4 w-4 text-bakery-primary" />
                    <span className="text-sm font-medium text-bakery-dark">Hello, {user?.name}!</span>
                  </div>
                  <Link to="/profile" className="text-gray-700 hover:text-bakery-primary transition-colors font-medium">My Profile</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;