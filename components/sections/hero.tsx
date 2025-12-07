'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import TopographyBackground from '@/components/ui/topography-background';
import Link from 'next/link';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section 
      className="relative z-10 h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center bg-background"
      aria-label="Hero section"
    >
      <TopographyBackground />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary"
          >
            Designed for the Internet of Agents
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            Blockchain Optimized for the Agentic Era
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            role="group"
            aria-label="Call to action buttons"
          >
            <Button 
              size="lg" 
              className="transition-shadow duration-300 ease-in-out"
              asChild
            >
              <Link href="https://docs.skale.space/welcome/get-started" target="_blank" rel="noopener noreferrer" aria-label="Build on SKALE (opens in new tab)">Build on SKALE</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-background/80"
              asChild
            >
              <Link href="https://portal.skale.space/" target="_blank" rel="noopener noreferrer" aria-label="Bridge & Explore (opens in new tab)">Bridge & Explore</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
