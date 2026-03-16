import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Send, 
  Twitter, 
  Globe, 
  ShoppingBag, 
  Mail, 
  Music2,
  Share2,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Heart,
  Check
} from 'lucide-react';
import { useBioLink } from '@/hooks/useBioLink';
import { LoadingScreen } from '@/components/LoadingScreen';
import { SOCIAL_PLATFORMS } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Instagram,
  Youtube,
  MessageCircle,
  Send,
  Twitter,
  Globe,
  ShoppingBag,
  Mail,
  Music2,
};

export function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const { getProfile } = useBioLink();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ReturnType<typeof getProfile>>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate loading for cute animation
    const timer = setTimeout(() => {
      if (username) {
        setProfile(getProfile(username));
      }
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [username, getProfile]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.displayName}'s Bio Link`,
          text: `Check out ${profile?.displayName}'s links on KyyLink!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copy
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return <LoadingScreen message={`KyyChan sedang menyiapkan halaman @${username}!`} />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FFF7FB] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="kyy-card p-8 text-center max-w-md"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src="/kyychan-chibi.png"
              alt="KyyChan"
              className="w-32 h-32 mx-auto mb-4"
            />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-['Poppins']">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The user <span className="text-[#FF9ECF] font-medium">@{username}</span> doesn't exist yet.
          </p>
          <Link to="/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="kyy-button"
            >
              Create Your Own
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7FB]">
      {/* Floating bubbles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 30 + i * 10,
              height: 30 + i * 10,
              background: i % 2 === 0 
                ? `linear-gradient(135deg, rgba(255, 158, 207, ${0.1 + i * 0.01}), transparent)`
                : `linear-gradient(135deg, rgba(167, 199, 255, ${0.1 + i * 0.01}), transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b-2 border-pink-100"
      >
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="text-gradient-pink font-bold font-['Poppins']">KyyLink</span>
          </Link>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#FF9ECF] hover:bg-[#FF9ECF] hover:text-white transition-colors"
            >
              {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="relative inline-block mb-4"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#FF9ECF] via-[#FFB8DA] to-[#A7C7FF] p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt={profile.displayName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-[#FF9ECF]">
                        {profile.displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Verified badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-[#FF9ECF] to-[#A7C7FF] rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>

            {/* Name & Bio */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-800 mb-1 font-['Poppins']"
            >
              {profile.displayName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500 mb-3"
            >
              @{profile.username}
            </motion.p>
            {profile.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 max-w-sm mx-auto"
              >
                {profile.bio}
              </motion.p>
            )}
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {profile.links.map((link, index) => {
                const Icon = iconMap[link.icon] || Globe;
                const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
                
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="kyy-link-button group relative overflow-hidden"
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${platform?.color}20, transparent)`,
                      }}
                    />
                    
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{ backgroundColor: `${platform?.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: platform?.color }} />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 relative z-10">
                      <p className="font-semibold text-gray-800">{link.title}</p>
                    </div>
                    
                    {/* Arrow */}
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#FF9ECF] transition-colors relative z-10" />
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Create yours CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm mb-4">Want your own cute bio link?</p>
            <Link to="/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 text-sm bg-white border-2 border-pink-200 text-[#FF9ECF] px-6 py-3 rounded-full hover:bg-pink-50 transition-colors"
              >
                <Heart className="w-4 h-4" />
                Create Your KyyLink
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2"
      >
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-[#FF9ECF] transition-colors">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs">Powered by KyyLink</span>
        </Link>
      </motion.div>
    </div>
  );
}
