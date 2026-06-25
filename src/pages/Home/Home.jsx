import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/sections/home/Hero/Hero';
import Statistics from '../../components/sections/home/Statistics/Statistics';
import SchedulePreview from '../../components/sections/home/SchedulePreview/SchedulePreview';
import FeaturedTeams from '../../components/sections/home/FeaturedTeams/FeaturedTeams';
import PrizePool from '../../components/sections/home/PrizePool/PrizePool';
import WhyParticipate from '../../components/sections/home/WhyParticipate/WhyParticipate';
import CTA from '../../components/sections/home/CTA/CTA';
import { pageTransition } from '../../animations/variants';
import './Home.css';

export default function Home() {
  return (
    <motion.div
      key="home"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <Hero />
      <Statistics />
      <SchedulePreview />
      <FeaturedTeams />
      <PrizePool />
      <WhyParticipate />
      <CTA />
    </motion.div>
  );
}
