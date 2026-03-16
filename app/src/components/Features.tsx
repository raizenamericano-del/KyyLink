import { motion } from 'framer-motion';
import { Link2, Palette, Share2, Zap, Heart, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Link2,
    title: 'Unlimited Links',
    description: 'Add as many links as you want. No limits, no restrictions!',
    color: '#FF9ECF',
  },
  {
    icon: Palette,
    title: 'Cute Themes',
    description: 'Choose from adorable anime-themed colors and styles.',
    color: '#A7C7FF',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your bio link anywhere with a simple URL.',
    color: '#E8D5F7',
  },
  {
    icon: Zap,
    title: 'Super Fast',
    description: 'Lightning fast loading with optimized performance.',
    color: '#FFF4BD',
  },
  {
    icon: Heart,
    title: 'Forever Free',
    description: 'All features are completely free to use!',
    color: '#C8F7C5',
  },
  {
    icon: Sparkles,
    title: 'Kawaii Design',
    description: 'Stand out with our unique anime aesthetic.',
    color: '#FFB8DA',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-full px-4 py-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#FF9ECF]" />
            <span className="text-sm font-medium text-gray-600">Amazing Features</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Poppins'] mb-4">
            <span className="text-gray-800">Why Choose </span>
            <span className="text-gradient-pink">KyyLink?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create the perfect bio link, wrapped in a cute anime package!
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="kyy-card p-6 group cursor-pointer"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-shadow duration-300 group-hover:shadow-lg"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon 
                  className="w-7 h-7" 
                  style={{ color: feature.color }}
                />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Poppins']">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>

              {/* Hover decoration */}
              <motion.div
                className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: feature.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
