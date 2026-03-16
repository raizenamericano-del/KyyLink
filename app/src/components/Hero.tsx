import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Star, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 40 + i * 15,
              height: 40 + i * 15,
              background: i % 2 === 0 
                ? `linear-gradient(135deg, rgba(255, 158, 207, ${0.1 + i * 0.02}), rgba(255, 158, 207, 0.02))`
                : `linear-gradient(135deg, rgba(167, 199, 255, ${0.1 + i * 0.02}), rgba(167, 199, 255, 0.02))`,
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Star 
              className="w-4 h-4" 
              fill={i % 2 === 0 ? '#FF9ECF' : '#A7C7FF'}
              stroke="none"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#FF9ECF]" />
              <span className="text-sm font-medium text-gray-600">Your Cute Anime Bio Link</span>
              <Heart className="w-4 h-4 text-[#FF9ECF] fill-[#FF9ECF]" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-['Poppins'] leading-tight mb-6"
            >
              <span className="text-gray-800">Create Your</span>
              <br />
              <span className="text-gradient-pink">Anime Bio Link</span>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block ml-2"
              >
                ✨
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Collect all your social links in one cute page. 
              Stand out with our kawaii anime-themed bio link creator!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="kyy-button flex items-center justify-center gap-2 group"
                >
                  Create My Link
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/explore">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="kyy-button-blue flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Explore Links
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-10"
            >
              {[
                { value: '10K+', label: 'Users' },
                { value: '50K+', label: 'Links' },
                { value: '100%', label: 'Free' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-gradient-pink">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Mascot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative flex justify-center"
          >
            {/* Glow effect behind mascot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-80 h-80 rounded-full bg-gradient-to-r from-[#FF9ECF] to-[#A7C7FF] blur-3xl" />
            </motion.div>

            {/* Mascot Image */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10"
            >
              <img
                src="/kyychan-mascot.png"
                alt="KyyChan - Your cute anime mascot"
                className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
              />
              
              {/* Speech bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -top-4 -right-4 md:top-0 md:right-0 bg-white rounded-3xl p-4 shadow-kyy border-2 border-pink-100 max-w-[200px]"
              >
                <p className="text-sm text-gray-700 font-medium">
                  "Hai! Aku KyyChan! Buat bio link lucu kamu di sini! 💕"
                </p>
                <div className="absolute -bottom-3 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-pink-100 transform rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
