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

const HOME_TOURNAMENT = {
  subtitle: 'The premier collegiate Valorant championship. 16 teams. One champion.',
  startDate: new Date('2025-08-15T10:00:00'),
  ctaIndicators: ['Free Entry', '16 Teams Max', '₹5000 Prize Pool'],
  stats: [
    { value: '24', label: 'Teams', suffix: '' },
    { value: '168', label: 'Players', suffix: '+' },
    { value: '5K', label: 'Prize Pool', suffix: '₹' },
    { value: '3', label: 'Phases', suffix: '' },
  ],
};

const HOME_SCHEDULE = [
  {
    date: 'July 1, 2025',
    time: '12:00 IST',
    event: 'Registration Opens',
    type: 'milestone',
    desc: 'Team registration portal goes live. Submit your roster now.',
  },
  {
    date: 'July 15, 2025',
    time: '23:59 IST',
    event: 'Registration Deadline',
    type: 'deadline',
    desc: 'Last date to register your team. No late entries accepted.',
  },
  {
    date: 'July 18, 2025',
    time: '18:00 IST',
    event: 'Team Draw & Seeding',
    type: 'milestone',
    desc: 'Official bracket draw and group seeding announcement on Discord.',
  },
  {
    date: 'July 20, 2025',
    time: '10:00 IST',
    event: 'Group Stage Begins',
    type: 'match',
    desc: 'Round-robin matches start. All teams play across 3 rounds.',
  },
  {
    date: 'August 5, 2025',
    time: '20:00 IST',
    event: 'Group Stage Ends',
    type: 'match',
    desc: 'Final group stage matches. Top 8 teams advance to playoffs.',
  },
  {
    date: 'August 10, 2025',
    time: '10:00 IST',
    event: 'Playoff Stage',
    type: 'match',
    desc: 'Single-elimination bracket begins. Quarter-finals day.',
  },
  {
    date: 'August 12, 2025',
    time: '14:00 IST',
    event: 'Semi-Finals',
    type: 'match',
    desc: 'Top 4 battle for a spot in the grand final.',
  },
  {
    date: 'August 15, 2025',
    time: '12:00 IST',
    event: 'Grand Final - LAN',
    type: 'final',
    desc: 'Best of 5. One team will be crowned SPIKE SHOWDOWN Season 1 Champions.',
  },
];

const HOME_TEAMS = [
  {
    id: 1,
    name: 'PHANTOM UNIT',
    tag: 'PHU',
    captain: 'Arjun Mehta',
    college: 'IIT Bombay',
    players: ['Arjun Mehta', 'Priya Sharma', 'Dev Kapoor', 'Ananya Roy', 'Kiran Patel'],
    rank: 1,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#E63946',
  },
  {
    id: 2,
    name: 'VOID STRIKE',
    tag: 'VSK',
    captain: 'Rohan Das',
    college: 'NIT Trichy',
    players: ['Rohan Das', 'Meera Iyer', 'Aditya Kumar', 'Sneha Gupta', 'Raj Singh'],
    rank: 2,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#4F7CAC',
  },
  {
    id: 3,
    name: 'ECHO FORCE',
    tag: 'ECF',
    captain: 'Vikram Reddy',
    college: 'BITS Pilani',
    players: ['Vikram Reddy', 'Tanvi Nair', 'Shiva Kumar', 'Riya Joshi', 'Aryan Malhotra'],
    rank: 3,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#22C55E',
  },
];

const HOME_PRIZES = [
  {
    place: 1,
    label: 'Champions',
    amount: '₹3000',
    perks: ['Trophy + Medals', 'Official Certificate', 'Social Feature', 'Merchandise'],
    tier: 'gold',
  },
  {
    place: 2,
    label: 'Runner Up',
    amount: '₹1500',
    perks: ['Medals', 'Official Certificate', 'Social Feature'],
    tier: 'silver',
  },
  {
    place: 3,
    label: 'Third Place',
    amount: '₹500',
    perks: ['Medals', 'Official Certificate'],
    tier: 'bronze',
  },
];

export default function Home() {
  return (
    <motion.div
      key="home"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <Hero tournament={HOME_TOURNAMENT} />
      <Statistics stats={HOME_TOURNAMENT.stats} />
      <SchedulePreview schedule={HOME_SCHEDULE} />
      <FeaturedTeams teams={HOME_TEAMS} />
      <PrizePool prizes={HOME_PRIZES} totalPrizePool="₹5000" />
      <WhyParticipate />
      <CTA indicators={HOME_TOURNAMENT.ctaIndicators} />
    </motion.div>
  );
}
