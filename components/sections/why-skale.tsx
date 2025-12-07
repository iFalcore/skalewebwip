'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Fuel, Zap, Shield, Puzzle } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type Feature = {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Fuel,
    title: 'Zero Gas Fees',
    description: 'SKALE chains remove per-transaction gas, so agents execute micropayments without fees eroding value.',
  },
  {
    icon: Zap,
    title: 'Instant Finality',
    description: 'Confirmations in tenths of a second keep agent loops fast, with Web2-like Ux.',
  },
  {
    icon: Shield,
    title: 'Private Execution (BITE)',
    description: 'BITE (Blockchain Integrated Threshold Encryption) encrypts transactions before consensus so agents actions and logic stay private and execute predictably.',
  },
  {
    icon: Puzzle,
    title: 'x402 & ERC-8004 Enablement',
    description: 'Integrated facilitators, SDKs, and MachinePay for seamless agent functionality.',
  },
];

const getContainerVariants = (shouldReduceMotion: boolean) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: shouldReduceMotion ? {} : {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
});

const getItemVariants = (shouldReduceMotion: boolean) => ({
  hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: shouldReduceMotion ? {} : {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
});

const FeatureCard = ({ feature, variants }: { feature: Feature; variants: any }) => (
  <motion.article
    variants={variants}
    className="relative p-6 bg-card rounded-lg border"
  >
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0" aria-hidden="true">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <feature.icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
        <p className="mt-1 text-muted-foreground">{feature.description}</p>
      </div>
    </div>
  </motion.article>
);

export default function WhySkale() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = getContainerVariants(shouldReduceMotion ?? false);
  const itemVariants = getItemVariants(shouldReduceMotion ?? false);
  
  return (
    <section id="why" className="relative bg-background -mt-16 pt-24 pb-12 sm:pb-16" aria-labelledby="why-skale-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="why-skale-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            Why SKALE for Agents & x402
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            SKALE provides a purpose-built environment for AI agents to thrive onchain, offering unparalleled performance, privacy, and economic models.
          </p>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          role="list"
          aria-label="SKALE features"
        >
          {features.map((feature, index) => (
            <FeatureCard key={`${feature.title}-${index}`} feature={feature} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
