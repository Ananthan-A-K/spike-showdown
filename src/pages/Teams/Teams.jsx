import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { PageHeader } from '../About/About';
import TeamCard from '../../components/ui/TeamCard/TeamCard';
import { pageTransition } from '../../animations/variants';
import './Teams.css';

const TEAMS = [
  {
    id: 1,
    name: 'DEFENDERS',
    tag: 'DFS',
    captain: 'GAUTHAM K',
    college: 'IEEE SBCE',
    players: ['YADHUNANDAN', 'UDAYASOORYA', 'ABHISHEK A', 'MERIC', 'GAUTHAM K'],
    rank: 1,
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
    college: 'College of Engineering',
    players: ['ABHIJITH AS', 'GIRI', 'ADHAL DEV', 'SREEHARI', 'NEERAJ P', 'KASHINATH V'],
    rank: 2,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#F9AA0D',
  },
  {
    id: 3,
    name: 'TPA eSports',
    tag: 'TPA',
    captain: 'SIYON TPA',
    college: 'IEEE SBCE',
    players: ['SNOW', 'NAREN', 'KAYANL', 'MOBZ', 'SIYON TPA'],
    rank: 3,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#0D44F9',
  },
  {
    id: 4,
    name: 'HOPE DEMOLISHER',
    tag: 'DMR',
    captain: 'DRAEKO',
    college: 'Model Engineering College',
    players: ['VOLTIC', 'FROST', 'ETHO BOT', 'SHADOW', 'TITAN', 'DABI', 'DRAEKO'],
    rank: 4,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#00F7FF',
  },
  {
    id: 5,
    name: 'Expandables',
    tag: 'EXP',
    captain: 'JOE GEORGE JAMES',
    college: 'Mar Baselios College',
    players: ['JERAL V SAM', 'NOBLE JOHN', 'REUBEN MATHEW THOMAS', 'JONATHAN ANSON', 'JOE GEORGE JAMES'],
    rank: 5,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#9B0DF9',
  },
  {
    id: 6,
    name: 'Dmatrix',
    tag: 'DTX',
    captain: 'ADWAITH',
    college: 'Saintgits College of Engineering',
    players: ['JACKENZO', 'TEXTURE', 'IEMLAW', 'PALIMDROME', 'ADWAITH'],
    rank: 6,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#FB00FF',
  },
  {
    id: 7,
    name: '4DX- B',
    tag: '4DXB',
    captain: 'AK',
    college: 'Sree Chitra Thirunal College',
    players: ['DIGAMBARAN', 'CRIMSON AGK', 'ABHISHEK', 'VEERAPPAN', 'TROY', 'AK'],
    rank: 7,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#00F731',
  },
  {
    id: 8,
    name: '4DX',
    tag: '4DX',
    captain: 'JITHU',
    college: 'Sree Chitra Thirunal College',
    players: ['SKYPER', 'VEERAPPAN', 'ABCDABCD', 'KNAVE', 'JITHU'],
    rank: 8,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#22C55E',
  },
  {
    id: 9,
    name: 'SIX SEVEN (S7)',
    tag: 'S7',
    captain: 'W STEVE',
    college: 'TKM College of Engineering',
    players: ['KRATOZ', 'PAUL WALKER', 'REDS', 'KUTTY DAS', 'DOCKY', 'LOKI W', 'W STEVE'],
    rank: 9,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#FF5722',
  },
  {
    id: 10,
    name: 'XCENTRIX',
    tag: 'XC',
    captain: 'OXYBL1ND',
    college: 'Rajagiri School of Engineering',
    players: ['MAX XCTX', 'GLADIATOR XCTX', 'STILES XCTX', 'DEMON2', 'OXYBL1ND'],
    rank: 10,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#E91E63',
  },
  {
    id: 11,
    name: 'WARRIORS',
    tag: 'WAR',
    captain: 'ADVAITH V',
    college: 'GEC Barton Hill',
    players: ['AKSHAY MOHAN', 'KRISHNA KISHORE', 'ABHIJITH', 'AKSHAY', 'ADVAITH V'],
    rank: 11,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#9C27B0',
  },
  {
    id: 12,
    name: 'JMP ESPORTS',
    tag: 'JMP',
    captain: 'UZEE',
    college: 'CET Trivandrum',
    players: ['KRONOS', 'LEVI', 'WIXI', 'SENSEI', 'MUGI', 'FROST', 'UZEE'],
    rank: 12,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#3F51B5',
  },
  {
    id: 13,
    name: 'ROGUE',
    tag: 'ROG',
    captain: 'spidey',
    college: 'SCMS School of Engineering',
    players: ['KΛΣ JAAK', 'SKIBIDI', 'BUCKY', 'NOTFPS', 'spidey'],
    rank: 13,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#00BCD4',
  },
  {
    id: 14,
    name: 'W SQUAD',
    tag: 'WSQ',
    captain: 'INSANE',
    college: 'FISAT Ernakulam',
    players: ['SPEED', 'DEXTO', 'EKKO', 'VALOUR', 'INSANE'],
    rank: 14,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#009688',
  },
  {
    id: 15,
    name: 'ERROR 404',
    tag: 'ERR',
    captain: 'KRIXZ',
    college: 'Amrita School of Engineering',
    players: ['NEERAJ', 'ARJUN', 'SACHIN', 'EDWIN', 'KRIXZ'],
    rank: 15,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#4CAF50',
  },
  {
    id: 16,
    name: 'EL CINCO',
    tag: 'CIN',
    captain: 'PRANAV SM',
    college: 'Marian Engineering College',
    players: ['RAJAT VENUGOPAL', 'ROGIN FERNANDEZ', 'SANJANA A K', 'JOEL DANIEL', 'PRANAV SM'],
    rank: 16,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#8BC34A',
  },
  {
    id: 17,
    name: 'KIDILOSKI RONIN',
    tag: 'KDR',
    captain: 'Gaurav P S',
    college: 'GEC Thrissur',
    players: ['RUINED', 'GABIMARU', 'ZYREN', 'RISKY', 'ZINOX', 'NXXXN', 'NEPHEWTACO', 'Gaurav P S'],
    rank: 17,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#CDDC39',
  },
  {
    id: 18,
    name: 'QUEEN',
    tag: 'QEN',
    captain: 'F4ZZAE',
    college: 'LBS Institute of Tech',
    players: ['RAYID MOHAMMED AFSAL', 'OMAR IQUBAL', 'FEBY MOHAN', 'MUHAMMAED ANWAR', 'GEORGE ANTO', 'F4ZZAE'],
    rank: 18,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#FFEB3B',
  },
  {
    id: 19,
    name: 'Legion',
    tag: 'LGN',
    captain: 'ALWIN B VARGHESE',
    college: 'MES College of Engineering',
    players: ['NIKHIL S GEORGE', 'GODWIN T SAMUEL', 'ABHIRAM S', 'AMRITHNATH S', 'ALWIN B VARGHESE'],
    rank: 19,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#FFC107',
  },
];

export default function Teams() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All');

  const statuses = ['All', 'Confirmed', 'Pending'];

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return TEAMS.filter((t) => {
      const matchSearch =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.tag.toLowerCase().includes(query) ||
        (t.college && t.college.toLowerCase().includes(query)) ||
        (t.captain && t.captain.toLowerCase().includes(query)) ||
        (t.players && t.players.some((p) => p.toLowerCase().includes(query)));

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
          <div className="flex flex-col sm:flex-row gap-4" style={{ marginBottom: '3rem' }}>

            {/* Search */}
            <div className="teams-search-wrapper">
              <Search size={16} className="teams-search-icon" />
              <input
                type="text"
                placeholder="Search teams, tags, captains, or player IGNs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field teams-search-input"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="teams-search-clear"
                  aria-label="Clear Search"
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
          <div style={{ marginBottom: '1.5rem' }}>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#7D8793]">
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
              transition={{ duration: 0.2 }}
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
              style={{ padding: '4rem 0' }}
            >
              <p className="font-display font-semibold text-2xl text-[#F5F7FA]" style={{ marginBottom: '0.5rem' }}>
                No teams match your search
              </p>
              <p className="text-[#7D8793] font-sans text-sm">
                Try searching by team name, team tag, captain name, or player IGN.
              </p>
              <button
                onClick={() => { setSearch(''); setStatus('All'); }}
                className="btn btn-outline px-6 mt-6"
              >
                Clear Search
              </button>
            </motion.div>
          )}

        </div>
      </section>
    </motion.div>
  );
}
