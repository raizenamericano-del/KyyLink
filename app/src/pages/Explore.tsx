import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, User, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useBioLink } from '@/hooks/useBioLink';
import { LoadingScreen } from '@/components/LoadingScreen';

export function Explore() {
  const { getAllProfiles, isLoaded } = useBioLink();
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState<ReturnType<typeof getAllProfiles>>([]);

  useEffect(() => {
    if (isLoaded) {
      setProfiles(getAllProfiles());
    }
  }, [isLoaded, getAllProfiles]);

  const filteredProfiles = profiles.filter(p => 
    p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded) {
    return <LoadingScreen message="KyyChan sedang mengumpulkan link-link lucu!" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF7FB]"
    >
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 font-['Poppins']">
              <span className="text-gradient-pink">Explore</span>{' '}
              <span className="text-gradient-blue">KyyLinks</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover cute bio links created by our amazing community!
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="kyy-input w-full pl-12"
              />
            </div>
          </motion.div>

          {/* Profiles Grid */}
          {filteredProfiles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile, index) => (
                <motion.div
                  key={profile.username}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link to={`/${profile.username}`}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="kyy-card p-6 group cursor-pointer"
                    >
                      {/* Avatar */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF9ECF] to-[#A7C7FF] p-1">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {profile.avatar ? (
                              <img 
                                src={profile.avatar} 
                                alt={profile.displayName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-8 h-8 text-gray-300" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 truncate font-['Poppins']">
                            {profile.displayName}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">@{profile.username}</p>
                        </div>
                      </div>

                      {/* Bio */}
                      {profile.bio && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {profile.bio}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-[#FF9ECF]" />
                            {profile.links.length} links
                          </span>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#FF9ECF] group-hover:bg-[#FF9ECF] group-hover:text-white transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img
                  src="/kyychan-chibi.png"
                  alt="KyyChan"
                  className="w-32 h-32 mx-auto mb-6 opacity-50"
                />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Poppins']">
                {searchQuery ? 'No users found' : 'No profiles yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? 'Try a different search term' 
                  : 'Be the first to create a cute bio link!'}
              </p>
              {!searchQuery && (
                <Link to="/create">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="kyy-button flex items-center gap-2 mx-auto"
                  >
                    <Heart className="w-5 h-5" />
                    Create Your Link
                  </motion.button>
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
