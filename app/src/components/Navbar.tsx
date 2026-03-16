import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/create', label: 'Create Link' },
    { to: '/explore', label: 'Explore' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b-2 border-pink-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Sparkles className="w-8 h-8 text-[#FF9ECF]" />
              <motion.div
                className="absolute inset-0 bg-[#FF9ECF] rounded-full blur-xl opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-2xl font-bold font-['Poppins']">
              <span className="text-gradient-pink">Kyy</span>
              <span className="text-gradient-blue">Link</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'text-white'
                    : 'text-gray-600 hover:text-[#FF9ECF]'
                }`}
              >
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-[#FF9ECF] to-[#FFB8DA] rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="kyy-button text-sm py-3 px-6"
              >
                Create My Link
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-pink-50 text-[#FF9ECF]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t-2 border-pink-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-gradient-to-r from-[#FF9ECF] to-[#FFB8DA] text-white'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-[#FF9ECF]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/create" onClick={() => setIsOpen(false)}>
                <button className="w-full kyy-button text-sm py-3 mt-2">
                  Create My Link
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
