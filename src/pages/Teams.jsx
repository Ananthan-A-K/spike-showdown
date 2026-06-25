import React, { useState, useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import TeamCard from '../components/TeamCard';
import { Search, Users, Filter } from 'lucide-react';

export default function Teams() {
  const { registrations } = useContext(TournamentContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Search & Filter Logic
  const filteredTeams = registrations.filter((team) => {
    // Status Filter
    if (statusFilter !== 'All' && team.status !== statusFilter) return false;

    // Search Query
    const query = searchTerm.toLowerCase();
    const matchesTeamName = team.name.toLowerCase().includes(query);
    const matchesCaptain = team.captain.name.toLowerCase().includes(query) || team.captain.riotId.toLowerCase().includes(query);
    const matchesPlayers = team.players.some(player => player.toLowerCase().includes(query));

    return matchesTeamName || matchesCaptain || matchesPlayers;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs text-secondary uppercase tracking-[0.25em] font-bold block mb-2">
          COMPETING FACTION DETAILS
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          REGISTERED TEAMS
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      {/* Search and Filters panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-center">
        
        {/* Search */}
        <div className="md:col-span-2 relative bg-[#0f1923] border-b border-white/10 focus-within:border-secondary transition-all">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" size={16} />
          <input
            type="text"
            placeholder="SEARCH TEAMS OR PLAYERS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 text-sm font-mono text-white bg-transparent outline-none uppercase"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center bg-[#0f1923] border-b border-white/10 px-3 py-1.5 h-[49px]">
          <Filter size={16} className="text-on-surface/40 mr-2 flex-shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-transparent text-sm font-mono text-white outline-none cursor-pointer py-2"
          >
            <option value="All" className="bg-surface-container text-white">ALL STATUSES</option>
            <option value="Approved" className="bg-surface-container text-white">APPROVED ROSTERS</option>
            <option value="Pending" className="bg-surface-container text-white">PENDING APPROVAL</option>
          </select>
        </div>

      </div>

      {/* Grid List */}
      {filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/10 clip-chamfer-btn">
          <Users className="mx-auto text-on-surface/20 mb-4 animate-pulse" size={48} />
          <span className="font-mono text-sm text-on-surface/40 uppercase block">
            No registered teams match your criteria.
          </span>
          {statusFilter === 'Pending' && (
            <span className="font-mono text-xs text-secondary uppercase block mt-2">
              If you just registered, wait for the admin to approve!
            </span>
          )}
        </div>
      )}
    </div>
  );
}
