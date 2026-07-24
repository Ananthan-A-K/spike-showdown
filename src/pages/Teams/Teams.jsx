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
    captain: 'NIXON',
    college: 'Sree Chitra Thirunal College',
    players: ['APEX', 'BLADE', 'VIPER', 'PHANTOM', 'NIXON'],
    rank: 8,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#22C55E',
  },
  {
    id: 9,
    name: 'S7',
    tag: 'S7',
    captain: 'SANTHOSH',
    college: 'TKM College of Engineering',
    players: ['S7_RAZE', 'S7_SOVA', 'S7_OMEN', 'S7_JETT', 'SANTHOSH'],
    rank: 9,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#FF5722',
  },
  {
    id: 10,
    name: 'Xcentrix',
    tag: 'XC',
    captain: 'RAHUL',
    college: 'Rajagiri School of Engineering',
    players: ['XC_ZERO', 'XC_BLAZE', 'XC_NEON', 'XC_KAYO', 'RAHUL'],
    rank: 10,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#E91E63',
  },
  {
    id: 11,
    name: 'Warriors',
    tag: 'WAR',
    captain: 'VISHNU',
    college: 'GEC Barton Hill',
    players: ['WAR_HUNTER', 'WAR_ACE', 'WAR_VIPER', 'WAR_FADE', 'VISHNU'],
    rank: 11,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#9C27B0',
  },
  {
    id: 12,
    name: 'JMP',
    tag: 'JMP',
    captain: 'MANU',
    college: 'CET Trivandrum',
    players: ['JMP_SHADOW', 'JMP_GHOST', 'JMP_FLASH', 'JMP_TITAN', 'MANU'],
    rank: 12,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#3F51B5',
  },
  {
    id: 13,
    name: 'Rogue',
    tag: 'ROG',
    captain: 'KIRAN',
    college: 'SCMS School of Engineering',
    players: ['ROG_VENOM', 'ROG_CYPHER', 'ROG_BREACH', 'ROG_ASTRA', 'KIRAN'],
    rank: 13,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#00BCD4',
  },
  {
    id: 14,
    name: 'W Squad',
    tag: 'WSQ',
    captain: 'ALEN',
    college: 'FISAT Ernakulam',
    players: ['WSQ_CHAMBER', 'WSQ_YORU', 'WSQ_ISO', 'WSQ_CLOVE', 'ALEN'],
    rank: 14,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#009688',
  },
  {
    id: 15,
    name: 'Error',
    tag: 'ERR',
    captain: 'NITHIN',
    college: 'Amrita School of Engineering',
    players: ['ERR_BUG', 'ERR_CRASH', 'ERR_GLITCH', 'ERR_NULL', 'NITHIN'],
    rank: 15,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#4CAF50',
  },
  {
    id: 16,
    name: 'El Cincoo',
    tag: 'CIN',
    captain: 'CARLOS',
    college: 'Marian Engineering College',
    players: ['CIN_ONE', 'CIN_TWO', 'CIN_THREE', 'CIN_FOUR', 'CARLOS'],
    rank: 16,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#8BC34A',
  },
  {
    id: 17,
    name: 'Kidiloski Ronin',
    tag: 'KDR',
    captain: 'DEEPAK',
    college: 'GEC Thrissur',
    players: ['KDR_SAMURAI', 'KDR_BLADE', 'KDR_SHADOW', 'KDR_KATANA', 'DEEPAK'],
    rank: 17,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#CDDC39',
  },
  {
    id: 18,
    name: 'Queen',
    tag: 'QEN',
    captain: 'SHWETA',
    college: 'LBS Institute of Tech',
    players: ['QEN_ROYAL', 'QEN_CROWN', 'QEN_GRACE', 'QEN_POWER', 'SHWETA'],
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
    captain: 'ANAND',
    college: 'MES College of Engineering',
    players: ['LGN_SOLDIER', 'LGN_COMMANDER', 'LGN_SCOUT', 'LGN_SNIPER', 'ANAND'],
    rank: 19,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#FFC107',
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
    id: 10,
    name: 'XCENTRIX',
    tag: 'XCTX',
    captain: 'OXYBL1ND',
    // college: 'IIT Bombay',
    players: ["MAX XCTX","GLADIATOR XCTX","STILES XCTX","DEMON2"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#f70000',
  },
  {
    id: 11,
    name: 'W SQUAD',
    tag: 'WSQ',
    captain: 'INSANE',
    // college: 'IIT Bombay',
    players: ["SPEED","DEXTO","EKKO","VALOUR"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#00f798',
  },
  {
    id: 12,
    name: 'QUEEN',
    tag: 'Q3N',
    captain: 'F4ZZAE',
    // college: 'IIT Bombay',
    players: ["RAYID MOHAMMED AFSAL","OMAR IQUBAL","FEBY MOHAN","MUHAMMAED ANWAR","GEORGE ANTO"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#eb00f7',
  },
  {
    id: 13,
    name: '4DX',
    tag: '4DX',
    captain: 'JITHU',
    // college: 'IIT Bombay',
    players: ["SKYPER","VEERAPPAN","ABCDABCD","KNAVE"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#3600f7',
  },
  {
    id: 14,
    name: 'KIDILOSKI RONIN',
    tag: 'KDK',
    captain: 'Gaurav P S',
    // college: 'IIT Bombay',
    players: ["RUINED","GABIMARU","ZYREN","RISKY","ZINOX","NXXXN","NEPHEWTACO"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#00e3f7',
  },
  {
    id: 15,
    name: 'EL CINCO',
    tag: 'ELC',
    captain: 'PRANAV SM',
    // college: 'IIT Bombay',
    players: ["RAJAT VENUGOPAL","ROGIN FERNANDEZ","SANJANA A K","JOEL DANIEL"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#f700ad',
  },
  {
    id: 16,
    name: 'WARRIORS',
    tag: 'WRS',
    captain: 'ADVAITH V',
    // college: 'IIT Bombay',
    players: ["AKSHAY MOHAN","KRISHNA KISHORE","ABHIJITH","AKSHAY"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#f76300',
  },
{
    id: 17,
    name: 'JMP ESPORTS',
    tag: 'JMP',
    captain: 'UZEE',
    // college: 'IIT Bombay',
    players: ["KRONOS","LEVI","WIXI","SENSEI","MUGI","FROST"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#98f700',
  },
  {
    id: 18,
    name: 'ERROR 404',
    tag: 'E404',
    captain: 'KRIXZ',
    // college: 'IIT Bombay',
    players: ["NEERAJ","ARJUN","SACHIN","EDWIN"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#8000f7',
  },
  {
    id: 19,
    name: 'Legion',
    tag: 'LGN',
    captain: 'ALWIN B VARGHESE',
    // college: 'IIT Bombay',
    players: ["NIKHIL S GEORGE","GODWIN T SAMUEL","ABHIRAM S","AMRITHNATH S"],
    rank: 0,
    wins: 0,
    losses: 0,
    status: 'Confirmed',
    color: '#f71d00',
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
