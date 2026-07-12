import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { PageHeader } from '../About/About';
import TeamCard from '../../components/ui/TeamCard/TeamCard';
import { pageTransition } from '../../animations/variants';
import './Teams.css';

const TEAMS = [
  // {
  //   id: 1,
  //   name: 'PHANTOM UNIT',
  //   tag: 'PHU',
  //   captain: 'Arjun Mehta',
  //   college: 'IIT Bombay',
  //   players: ['Arjun Mehta', 'Priya Sharma', 'Dev Kapoor', 'Ananya Roy', 'Kiran Patel'],
  //   rank: 1,
  //   wins: 0,
  //   losses: 0,
  //   status: 'Confirmed',
  //   color: '#E63946',
  // },
  {
    id: 1,
    name: 'DEFENDERS',
    tag: 'DFS',
    captain: 'GAUTHAM K',
    // college: 'IIT Bombay',
    players: ["YADHUNANDAN", "UDAYASOORYA", "ABHISHEK A", "MERIC"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#E63946',
  },
  {
    id: 2,
    name: 'BLAZE ESPORTS',
    tag: 'BLZ',
    captain: 'KASHINATH V',
    // college: 'IIT Bombay',
    players: ["ABHIJITH AS","GIRI","ADHAL DEV","SREEHARI","NEERAJ P"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#f9aa0d',
  },
  {
    id: 3,
    name: 'TPA eSports',
    tag: 'TPA',
    captain: 'SIYON TPA',
    // college: 'IIT Bombay',
    players: ["SNOW","NAREN","KAYANL","MOBZ"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#0d44f9',
  },
  {
    id: 4,
    name: 'HOPE DEMOLISHER',
    tag: 'DMR',
    captain: 'DRAEKO',
    // college: 'IIT Bombay',
    players: ["VOLTIC","FROST","ETHO BOT","SHADOW","TITAN","DABI",],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#00f7ff',
  },
  {
    id: 5,
    name: 'Expandables',
    tag: 'EXP',
    captain: 'JOE GEORGE JAMES',
    // college: 'IIT Bombay',
    players: ["JERAL V SAM","NOBLE JOHN","REUBEN MATHEW THOMAS","JONATHAN ANSON"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#9b0df9',
  },
  {
    id: 6,
    name: 'Dmatrix',
    tag: 'DTX',
    captain: 'ADWAITH',
    // college: 'IIT Bombay',
    players: ["JACKENZO","TEXTURE","IEMLAW","PALIMDROME"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#fb00ff',
  },
  {
    id: 7,
    name: '4DX- B',
    tag: '4DX',
    captain: 'AK',
    // college: 'IIT Bombay',
    players: ["DIGAMBARAN","CRIMSON AGK","ABHISHEK","VEERAPPAN","TROY"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#00f731',
  },
  {
    id: 8,
    name: 'SIX SEVEN',
    tag: 'S7',
    captain: 'W STEVE',
    // college: 'IIT Bombay',
    players: ["KRATOZ","PAUL WALKER","REDS","KUTTY DAS","DOCKY","LOKI W"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#fb00bc',
  },
  {
    id: 9,
    name: 'ROGUE',
    tag: 'RG',
    captain: 'spidey',
    // college: 'IIT Bombay',
    players: ["KΛΣ JAAK","SKIBIDI","BUCKY","NOTFPS"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#c2f700',
  },
  {
    id: 9,
    name: 'XCENTRIX',
    tag: 'XCTX',
    captain: 'OXYBL1ND',
    // college: 'IIT Bombay',
    players: ["MAX XCTX","GLADIATOR XCTX","OXYBL1ND XCTX","STILES XCTX","DEMON2"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#c2f700',
  },
];

export default function Teams() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All');

  const statuses = ['All', 'Confirmed', 'Pending'];

  const filtered = useMemo(() => {
    return TEAMS.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tag.toLowerCase().includes(search.toLowerCase()) ||
        t.college.toLowerCase().includes(search.toLowerCase()) ||
        t.captain.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <motion.div
      key="teams"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="Teams"
        title={`${TEAMS.length} Teams Registered`}
        subtitle="Meet the collegiate squads competing for the SPIKE SHOWDOWN Season 1 championship title."
      />

      <section className="section-pad">
        <div className="container-xl">

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4" style={{ marginBottom: '4rem' }}>

            {/* Search */}
            <div className="teams-search-wrapper">
              <Search size={16} className="teams-search-icon" />
              <input
                type="text"
                placeholder="Search teams, colleges, players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field teams-search-input"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="teams-search-clear"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Status filter */}
            <div className="flex gap-3 flex-wrap">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={statusFilter === s ? 'teams-filter-btn-active' : 'teams-filter-btn'}
                >
                  {s}
                </button>
              ))}
            </div>

          </div>

          {/* Results count */}
          <div style={{ marginBottom: '2rem' }}>
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#7D8793]">
              Showing {filtered.length} of {TEAMS.length} teams
            </p>
          </div>

          {/* Teams Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${search}-${statusFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((team, i) => (
                <TeamCard key={team.id} team={team} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
              style={{ padding: '6rem 0' }}
            >
              <p className="font-display font-semibold text-2xl text-[#F5F7FA]" style={{ marginBottom: '0.5rem' }}>No teams found</p>
              <p className="text-[#7D8793] font-sans text-sm">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setSearch(''); setStatus('All'); }}
                className="btn btn-outline px-6 mt-6"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Registration CTA */}
          {TEAMS.length < 16 && (
            <div className="teams-spots-alert">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#E63946]" style={{ marginBottom: '0.5rem' }}>Spots Available</p>
                <p className="font-display font-bold text-2xl text-[#F5F7FA]">
                  {24 - TEAMS.length} spots remaining
                </p>
                <p className="text-[#7D8793] text-[0.9375rem] font-sans mt-2 leading-relaxed">
                  Registration closes July 22, 2026
                </p>
              </div>
              <a href="/register" className="btn btn-primary flex-shrink-0 px-8" style={{ textDecoration: 'none' }}>
                Register Your Team
              </a>
            </div>
          )}

        </div>
      </section>
    </motion.div>
  );
}
