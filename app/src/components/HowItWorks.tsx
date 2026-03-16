import { motion } from 'framer-motion';
import { UserPlus, Link as LinkIcon, Share, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Account',
    description: 'Choose your unique username and set up your profile with a cute avatar.',
    color: '#FF9ECF',
  },
  {
    number: '02',
    icon: LinkIcon,
    title: 'Add Your Links',
    description: 'Add all your social media links, websites, and online stores.',
    color: '#A7C7FF',
  },
  {
    number: '03',
    icon: Share,
    title: 'Customize',
    description: 'Pick your favorite theme and make it uniquely yours!',
    color: '#E8D5F7',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Share & Shine',
    description: 'Share your kyylink.com/username everywhere and grow your audience!',
    color: '#FFF4BD',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#FF9ECF] to-[#FFB8DA] opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#A7C7FF] to-[#B8D4FF] opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Poppins'] mb-4">
            <span className="text-gray-800">How It </span>
            <span className="text-gradient-blue">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your cute bio link ready in just 4 simple steps!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#FF9ECF] to-[#A7C7FF] origin-left"
                  />
                </div>
              )}

              {/* Card */}
              <div className="text-center">
                {/* Number badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 font-bold text-white text-lg"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="w-8 h-8" style={{ color: step.color }} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Poppins']">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
