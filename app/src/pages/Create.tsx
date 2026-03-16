import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  Camera,
  Check,
  AlertCircle,
  ArrowLeft,
  GripVertical,
  Instagram,
  Youtube,
  MessageCircle,
  Send,
  Twitter,
  Globe,
  ShoppingBag,
  Mail,
  Music2
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useBioLink } from '@/hooks/useBioLink';
import type { SocialLink } from '@/types';
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

export function Create() {
  const navigate = useNavigate();
  const { saveProfile, usernameExists } = useBioLink();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add link modal state
  const [showAddLink, setShowAddLink] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateUsername = () => {
    if (!username.trim()) {
      setError('Username is required');
      return false;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return false;
    }
    if (usernameExists(username)) {
      setError('Username already exists');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateUsername()) {
      setStep(2);
    }
  };

  const handleAddLink = () => {
    if (!selectedPlatform || !linkUrl) return;
    
    const platform = SOCIAL_PLATFORMS.find(p => p.id === selectedPlatform);
    if (!platform) return;

    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: selectedPlatform,
      url: linkUrl,
      title: linkTitle || platform.name,
      icon: platform.icon,
    };

    setLinks([...links, newLink]);
    setShowAddLink(false);
    setSelectedPlatform('');
    setLinkUrl('');
    setLinkTitle('');
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const handleSubmit = async () => {
    if (!displayName.trim()) {
      setError('Display name is required');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));

    saveProfile(username, {
      username: username.toLowerCase(),
      displayName,
      bio,
      avatar,
      links,
      theme: 'pink',
    });

    navigate(`/${username}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF7FB]"
    >
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#FF9ECF] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step 
                      ? 'bg-gradient-to-r from-[#FF9ECF] to-[#FFB8DA] text-white' 
                      : 'bg-white border-2 border-pink-200 text-gray-400'
                  }`}
                  animate={s === step ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </motion.div>
                {s < 2 && (
                  <div className={`w-16 h-1 rounded-full ${
                    s < step ? 'bg-gradient-to-r from-[#FF9ECF] to-[#A7C7FF]' : 'bg-pink-100'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="kyy-card p-8"
              >
                <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Poppins']">
                  Choose Your Username
                </h1>
                <p className="text-gray-600 mb-8">
                  This will be your unique link: kyylink.com/username
                </p>

                <div className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        kyylink.com/
                      </span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase())}
                        placeholder="yourname"
                        className="kyy-input w-full pl-36"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="kyy-button w-full flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Profile & Links */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Left: Editor */}
                <div className="space-y-6">
                  {/* Profile Card */}
                  <div className="kyy-card p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Poppins']">
                      Profile Info
                    </h2>

                    {/* Avatar Upload */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#FF9ECF] to-[#A7C7FF] p-1">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {avatar ? (
                              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <Camera className="w-10 h-10 text-gray-300" />
                            )}
                          </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#FF9ECF] rounded-full flex items-center justify-center">
                          <Plus className="w-4 h-4 text-white" />
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </motion.div>
                    </div>

                    {/* Display Name */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name *
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your Name"
                        className="kyy-input w-full"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="kyy-input w-full resize-none"
                      />
                    </div>
                  </div>

                  {/* Links Card */}
                  <div className="kyy-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-800 font-['Poppins']">
                        Your Links
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddLink(true)}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-[#FF9ECF] to-[#FFB8DA] text-white px-4 py-2 rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                        Add Link
                      </motion.button>
                    </div>

                    {/* Links List */}
                    <div className="space-y-3">
                      {links.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <LinkIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No links yet. Add your first link!</p>
                        </div>
                      ) : (
                        links.map((link) => {
                          const Icon = iconMap[link.icon] || Globe;
                          const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
                          return (
                            <motion.div
                              key={link.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-3 bg-white border-2 border-pink-100 rounded-xl p-3"
                            >
                              <GripVertical className="w-5 h-5 text-gray-300 cursor-move" />
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${platform?.color}20` }}
                              >
                                <Icon className="w-5 h-5" style={{ color: platform?.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate">{link.title}</p>
                                <p className="text-xs text-gray-500 truncate">{link.url}</p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemoveLink(link.id)}
                                className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="kyy-button w-full flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Create My Bio Link
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Right: Preview */}
                <div className="lg:sticky lg:top-24 h-fit">
                  <div className="kyy-card p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Poppins']">
                      Preview
                    </h2>
                    <div className="bg-gradient-to-b from-[#FFF7FB] to-white rounded-2xl p-6 border-2 border-pink-100">
                      {/* Profile Preview */}
                      <div className="text-center mb-6">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[#FF9ECF] to-[#A7C7FF] p-1 mb-3">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {avatar ? (
                              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-10 h-10 text-gray-300" />
                            )}
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {displayName || 'Your Name'}
                        </h3>
                        <p className="text-sm text-gray-500">@{username}</p>
                        {bio && (
                          <p className="text-sm text-gray-600 mt-2">{bio}</p>
                        )}
                      </div>

                      {/* Links Preview */}
                      <div className="space-y-3">
                        {links.length === 0 ? (
                          <p className="text-center text-gray-400 text-sm py-4">
                            Your links will appear here
                          </p>
                        ) : (
                          links.map((link) => {
                            const Icon = iconMap[link.icon] || Globe;
                            const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
                            return (
                              <div
                                key={link.id}
                                className="flex items-center gap-3 bg-white border border-pink-200 rounded-xl p-3 shadow-sm"
                              >
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: `${platform?.color}20` }}
                                >
                                  <Icon className="w-4 h-4" style={{ color: platform?.color }} />
                                </div>
                                <span className="font-medium text-gray-700 text-sm">{link.title}</span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Add Link Modal */}
      <AnimatePresence>
        {showAddLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddLink(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="kyy-card w-full max-w-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Poppins']">
                Add New Link
              </h3>

              {/* Platform Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SOCIAL_PLATFORMS.map((platform) => {
                    const Icon = iconMap[platform.icon] || Globe;
                    return (
                      <motion.button
                        key={platform.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedPlatform(platform.id);
                          setLinkTitle(platform.name);
                        }}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                          selectedPlatform === platform.id
                            ? 'border-[#FF9ECF] bg-pink-50'
                            : 'border-pink-100 hover:border-pink-200'
                        }`}
                      >
                        <Icon 
                          className="w-6 h-6" 
                          style={{ color: platform.color }}
                        />
                        <span className="text-xs text-gray-600">{platform.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder={SOCIAL_PLATFORMS.find(p => p.id === selectedPlatform)?.placeholder || 'https://'}
                  className="kyy-input w-full"
                />
              </div>

              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  placeholder="Link title"
                  className="kyy-input w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddLink(false)}
                  className="flex-1 py-3 rounded-full border-2 border-pink-200 text-gray-600 font-medium hover:bg-pink-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddLink}
                  disabled={!selectedPlatform || !linkUrl}
                  className="flex-1 kyy-button disabled:opacity-50"
                >
                  Add Link
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
}
