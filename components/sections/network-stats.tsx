'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedCounter from '@/components/ui/animated-counter';
import { motion, useReducedMotion } from 'framer-motion';

const stats = [
  { title: 'Total Transactions', value: 2, unit: 'B+' },
  { title: 'Unique Active Wallets', value: 64, unit: 'M+' },
  { title: 'Total Gas Fees Saved', value: 13.4, unit: 'B+', precision: 1, prefix: '$' },
  { title: 'Validator Subnodes', value: 920, unit: '' },
];

const getContainerVariants = (shouldReduceMotion: boolean) => ({
  hidden: {},
  visible: {
    transition: shouldReduceMotion ? {} : {
      staggerChildren: 0.15,
    },
  },
});

const getItemVariants = (shouldReduceMotion: boolean) => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: shouldReduceMotion ? {} : {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
});

export default function NetworkStats() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = getContainerVariants(shouldReduceMotion ?? false);
  const itemVariants = getItemVariants(shouldReduceMotion ?? false);
  
  return (
    <section className="py-16 sm:py-24 bg-muted/50" aria-labelledby="network-stats-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="network-stats-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            A Network at Scale
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            SKALE's infrastructure is built for massive adoption, processing millions of transactions while saving billions in gas fees.
          </p>
        </div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          role="list"
          aria-label="Network statistics"
        >
          {stats.map((stat) => (
            <motion.article key={stat.title} variants={itemVariants} role="listitem">
              <Card className="text-center shadow-sm relative overflow-hidden group">
                <CardHeader>
                  <CardTitle className="text-muted-foreground font-medium text-base">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl sm:text-5xl font-bold text-primary tracking-tight" aria-label={`${stat.title}: ${stat.prefix || ''}${stat.value}${stat.unit}`}>
                    <span aria-hidden="true">
                      {stat.prefix}
                      <AnimatedCounter from={0} to={stat.value} precision={stat.precision} />
                      <span>{stat.unit}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
