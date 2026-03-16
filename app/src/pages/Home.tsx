import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </motion.div>
  );
}
