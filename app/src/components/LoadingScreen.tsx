import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'KyyChan sedang menyiapkan halamanmu!' }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-[#FFF7FB] via-[#FFF0F7] to-[#F0F5FF] z-50 flex flex-col items-center justify-center"
    >
      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 60 + i * 20,
              height: 60 + i * 20,
              background: i % 2 === 0 
                ? 'linear-gradient(135deg, rgba(255, 158, 207, 0.2), rgba(255, 158, 207, 0.05))'
                : 'linear-gradient(135deg, rgba(167, 199, 255, 0.2), rgba(167, 199, 255, 0.05))',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Chibi KyyChan */}
      <motion.div
        className="relative mb-8"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src="/kyychan-chibi.png"
            alt="KyyChan"
            className="w-40 h-40 object-contain drop-shadow-2xl"
          />
        </motion.div>
        
        {/* Sparkles around chibi */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: i < 2 ? '-20%' : '80%',
              left: i % 2 === 0 ? '-20%' : '100%',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill={i % 2 === 0 ? '#FF9ECF' : '#A7C7FF'}
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* Loading text */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center px-4"
        style={{
          background: 'linear-gradient(135deg, #FF9ECF, #A7C7FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {message}
      </motion.h2>

      {/* Loading dots */}
      <div className="flex gap-2 mt-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full"
            style={{
              background: i % 2 === 0 
                ? 'linear-gradient(135deg, #FF9ECF, #FFB8DA)'
                : 'linear-gradient(135deg, #A7C7FF, #B8D4FF)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
