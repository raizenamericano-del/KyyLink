import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-white border-t-2 border-pink-100">
      {/* Decorative top wave */}
      <div className="absolute -top-px left-0 right-0 h-4 bg-gradient-to-r from-[#FF9ECF] via-[#A7C7FF] to-[#FF9ECF] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-[#FF9ECF]" />
              <span className="text-2xl font-bold font-['Poppins']">
                <span className="text-gradient-pink">Kyy</span>
                <span className="text-gradient-blue">Link</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-sm">
              Your cute anime bio link creator. Collect all your social links in one adorable page!
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Github, href: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#FF9ECF] hover:bg-[#FF9ECF] hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 font-['Poppins']">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/create', label: 'Create Link' },
                { to: '/explore', label: 'Explore' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to}
                    className="text-gray-600 hover:text-[#FF9ECF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 font-['Poppins']">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-gray-600 hover:text-[#FF9ECF] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#FF9ECF] fill-[#FF9ECF]" /> by KyyLink Team
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 KyyLink. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating chibi decoration */}
      <motion.div
        className="absolute bottom-4 right-4 hidden lg:block"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src="/kyychan-chibi.png"
          alt="KyyChan"
          className="w-20 h-20 object-contain opacity-50"
        />
      </motion.div>
    </footer>
  );
}
