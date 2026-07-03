import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/sections/home/Hero/Hero';
import Statistics from '../../components/sections/home/Statistics/Statistics';
import SchedulePreview from '../../components/sections/home/SchedulePreview/SchedulePreview';
import PostersShowcase from '../../components/sections/home/PostersShowcase/PostersShowcase';
import PrizePool from '../../components/sections/home/PrizePool/PrizePool';
import WhyParticipate from '../../components/sections/home/WhyParticipate/WhyParticipate';
import CTA from '../../components/sections/home/CTA/CTA';
import { pageTransition } from '../../animations/variants';
import './Home.css';

const HOME_TOURNAMENT = {
  subtitle: 'The premier collegiate Valorant championship. 24 teams. One champion.',
  startDate: new Date('2026-07-24T18:00:00+05:30'),
  ctaIndicators: ['Register Now', '24 Teams Max', '₹5000 Prize Pool'],
  stats: [
    { value: '24', label: 'Teams', suffix: '' },
    { value: '168', label: 'Players', suffix: '+' },
    { value: '5K', label: 'Prize Pool', suffix: 'K' },
    { value: '3', label: 'Knockout → Champions Stage', suffix: '' },
  ],
};

const HOME_SCHEDULE = [
  {
    date: 'July 1, 2026',
    time: '6:00 PM IST',
    event: 'Tournament Teaser',
    type: 'milestone',
    desc: "The official announcement of SPIKE SHOWDOWN Season 1. Get ready for Kerala's competitive Valorant championship.",
  },
  {
    date: 'July 3, 2026',
    time: '6:00 PM IST',
    event: 'Registration Opens',
    type: 'milestone',
    desc: 'Team registration officially begins through the Google Form.',
  },
  {
    date: 'July 6, 2026',
    time: '6:00 PM IST',
    event: 'Tournament Details',
    type: 'milestone',
    desc: 'Tournament format, eligibility, registration fees, and event details are published.',
  },
  {
    date: 'July 9, 2026',
    time: '6:00 PM IST',
    event: 'Rulebook Release',
    type: 'milestone',
    desc: 'Official tournament rules and regulations become available for all participants.',
  },
  {
    date: 'July 18, 2026',
    time: '6:00 PM IST',
    event: 'Registration Closing Soon',
    type: 'deadline',
    desc: 'Final reminder before registrations close. Complete your registration before the deadline.',
  },
  {
    date: 'July 20, 2026',
    time: '6:00 PM IST',
    event: 'Prize Pool Reveal',
    type: 'milestone',
    desc: 'Cash prizes, certificates, and rewards are officially announced.',
  },
  {
    date: 'July 22, 2026',
    time: '11:59 PM IST',
    event: 'Registration Closed',
    type: 'deadline',
    desc: 'Registration closes at 11:59 PM IST. Team verification and roster validation begin.',
  },
  {
    date: 'July 23, 2026',
    time: '6:00 PM IST',
    event: 'Team Reveal',
    type: 'milestone',
    desc: 'All verified teams participating in Spike Showdown Season 1 are officially announced.',
  },
  {
    date: 'July 23, 2026',
    time: '6:00 PM IST',
    event: 'Official Bracket Reveal',
    type: 'milestone',
    desc: 'The official tournament bracket is published after team verification.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Match Schedule Release',
    type: 'match',
    desc: 'Official match dates, timings, Discord check-in instructions, and lobby details are announced after the Valorant World Cup concludes.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Round 1',
    type: 'match',
    desc: 'The first knockout round begins simultaneously in Bracket A and Bracket B.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Round 2',
    type: 'match',
    desc: 'Winning teams advance to the second knockout round.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Champions Stage',
    type: 'match',
    desc: 'The top three teams from each bracket compete in a Round Robin format to determine the finalists.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Grand Final',
    type: 'final',
    desc: 'Bracket A Champion vs Bracket B Champion. One team will become the first SPIKE SHOWDOWN Season 1 Champion.',
  },
  {
    date: 'Immediately After Grand Final',
    time: '',
    event: 'Champions Announced',
    type: 'milestone',
    desc: 'Champion, Runner-up, MVP, and award winners are officially announced.',
  },
  {
    date: 'End of Tournament',
    time: '',
    event: 'Thank You',
    type: 'milestone',
    desc: 'Thank you to every participant, volunteer, organizer, and supporter for making Spike Showdown Season 1 a success.',
  },
];

const HOME_PRIZES = [
  {
    place: 1,
    label: 'Champions',
    amount: '₹3000',
    perks: ['Official Certificate'],
    tier: 'gold',
  },
  {
    place: 2,
    label: 'Runner Up',
    amount: '₹1500',
    perks: [],
    tier: 'silver',
  },
  {
    place: 3,
    label: 'Third Place',
    amount: '₹500',
    perks: [],
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
      <PostersShowcase />
      <PrizePool prizes={HOME_PRIZES} totalPrizePool="₹5000" isRevealed={false} />
      <WhyParticipate />
      <CTA indicators={HOME_TOURNAMENT.ctaIndicators} />
    </motion.div>
  );
}
