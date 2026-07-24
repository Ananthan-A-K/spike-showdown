import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Shield, Trophy, RefreshCw, Database, CheckCircle, AlertCircle, ArrowLeft, Swords, Flame, Crown, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBracket } from '../../context/BracketContext';
import { PageHeader } from '../About/About';
import { pageTransition } from '../../animations/variants';
import './AdminBrackets.css';

const DEFAULT_PASSCODE = 'spike2026';

export default function AdminBrackets() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('spike_admin_auth') === 'true';
  });
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState('r1');
  const [notification, setNotification] = useState('');

  const {
    bracketState,
    getR2TeamName,
    getR3TeamName,
    standings,
    seed1Name,
    seed2Name,
    seed3Name,
    seed4Name,
    q1Winner,
    q1Loser,
    elimWinner,
    elimLoser,
    q2Winner,
    q2Loser,
    championWinner,
    updateR1Match,
    updateR2Match,
    updateR3Fixture,
    updatePlayoffMatch,
    resetBracket,
    loadDemoData,
  } = useBracket();

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === DEFAULT_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('spike_admin_auth', 'true');
      setAuthError(false);
      triggerToast('Authenticated successfully as Administrator.');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('spike_admin_auth');
    setPasscode('');
  };

  const triggerToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Login Gate Screen
  if (!isAuthenticated) {
    return (
      <motion.div
        key="admin-login"
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        className="admin-login-page"
      >
        <PageHeader
          eyebrow="Admin Portal"
          title="Bracket Control Panel"
          subtitle="Restricted access for tournament operators and match administrators."
        />

        <div className="container-xl flex justify-center section-pad">
          <div className="admin-login-card">
            <div className="admin-login-icon-box">
              <Lock size={32} className="text-[#E63946]" />
            </div>

            <h3 className="admin-login-title">Administrator Login</h3>
            <p className="admin-login-subtitle">
              Enter tournament passcode to unlock bracket management.
            </p>

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="admin-input-group">
                <input
                  type="password"
                  placeholder="Enter Passcode (Default: spike2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className={`admin-password-input ${authError ? 'error' : ''}`}
                />
              </div>

              {authError && (
                <div className="admin-auth-error">
                  <AlertCircle size={14} />
                  <span>Invalid passcode. Please try again.</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                <Unlock size={16} />
                Unlock Admin Dashboard
              </button>
            </form>

            <div className="admin-login-footer">
              <Link to="/brackets" className="inline-flex items-center gap-1.5 text-xs text-[#7D8793] hover:text-white transition-colors">
                <ArrowLeft size={12} />
                Return to Public Brackets
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const q1 = bracketState.playoffs?.qualifier1 || {};
  const elim = bracketState.playoffs?.eliminator || {};
  const q2 = bracketState.playoffs?.qualifier2 || {};
  const gf = bracketState.playoffs?.grandFinal || {};

  return (
    <motion.div
      key="admin-dashboard"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      className="admin-dashboard-page"
    >
      <PageHeader
        eyebrow="Admin Dashboard"
        title="Live Bracket Management"
        subtitle="Manage scores, select match winners, and control tournament progression in real time."
      />

      <section className="section-pad">
        <div className="container-xl">

          {/* Toast Notification */}
          {notification && (
            <div className="admin-toast-notification">
              <CheckCircle size={16} className="text-[#22C55E]" />
              <span>{notification}</span>
            </div>
          )}

          {/* Admin Toolbar Bar */}
          <div className="admin-toolbar-card">
            <div className="flex items-center gap-3">
              <span className="badge badge-accent flex items-center gap-1.5">
                <Shield size={12} />
                ADMIN MODE ACTIVE
              </span>
              <span className="text-xs font-mono text-[#7D8793]">Playoff Mode</span>
            </div>

            <div className="admin-toolbar-actions">
              <button
                onClick={() => {
                  loadDemoData();
                  triggerToast('Demo tournament sample data loaded successfully!');
                }}
                className="admin-btn secondary flex items-center gap-1.5"
              >
                <Database size={14} />
                Load Demo Data
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all bracket scores to initial state?')) {
                    resetBracket();
                    triggerToast('Bracket state reset to default.');
                  }
                }}
                className="admin-btn warning flex items-center gap-1.5"
              >
                <RefreshCw size={14} />
                Reset Bracket
              </button>

              <button
                onClick={handleLogout}
                className="admin-btn danger flex items-center gap-1.5"
              >
                <Lock size={14} />
                Lock Portal
              </button>
            </div>
          </div>

          {/* Navigation Control Tabs */}
          <div className="admin-nav-tabs">
            {[
              { id: 'r1', label: 'Round 1 (9 Matches)' },
              { id: 'r2', label: 'Round 2 (5 Matches)' },
              { id: 'r3', label: 'Round 3 League (5 Fixtures)' },
              { id: 'playoffs', label: 'Playoff Control' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: ROUND 1 */}
          {activeTab === 'r1' && (
            <div className="admin-stage-panel">
              <h3 className="admin-stage-title red-theme">Round 1 Match Manager</h3>
              <p className="admin-stage-desc">Set score line and select winner for Matches 1–9. Winners automatically propagate to Round 2.</p>

              <div className="admin-matches-grid">
                {bracketState.round1.map((m) => (
                  <div key={m.id} className="admin-match-control-card">
                    <div className="admin-card-header">
                      <span className="admin-match-id">MATCH {m.id}</span>
                      {m.winner && <span className="admin-winner-pill">Winner: {m.winner}</span>}
                    </div>

                    {/* Team 1 */}
                    <div className="admin-team-input-row">
                      <span className="admin-team-label">{m.team1}</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={m.score1 ?? ''}
                        onChange={(e) => updateR1Match(m.id, e.target.value, m.score2, m.winner)}
                        className="admin-score-field"
                      />
                      <button
                        onClick={() => {
                          updateR1Match(m.id, m.score1 ?? 2, m.score2 ?? 0, m.team1);
                          triggerToast(`Match ${m.id} winner set to ${m.team1}`);
                        }}
                        className={`admin-winner-btn ${m.winner === m.team1 ? 'active' : ''}`}
                      >
                        Set Winner
                      </button>
                    </div>

                    {/* Team 2 */}
                    <div className="admin-team-input-row">
                      <span className="admin-team-label">{m.team2}</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={m.score2 ?? ''}
                        onChange={(e) => updateR1Match(m.id, m.score1, e.target.value, m.winner)}
                        className="admin-score-field"
                      />
                      <button
                        onClick={() => {
                          updateR1Match(m.id, m.score1 ?? 0, m.score2 ?? 2, m.team2);
                          triggerToast(`Match ${m.id} winner set to ${m.team2}`);
                        }}
                        className={`admin-winner-btn ${m.winner === m.team2 ? 'active' : ''}`}
                      >
                        Set Winner
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ROUND 2 */}
          {activeTab === 'r2' && (
            <div className="admin-stage-panel">
              <h3 className="admin-stage-title red-theme">Round 2 Match Manager</h3>
              <p className="admin-stage-desc">Teams from Round 1 automatically appear here once decided. Select winners to advance to Round 3 League Stage.</p>

              <div className="admin-matches-grid">
                {bracketState.round2.map((m) => {
                  const t1Name = getR2TeamName(m, 1);
                  const t2Name = getR2TeamName(m, 2);

                  return (
                    <div key={m.id} className="admin-match-control-card">
                      <div className="admin-card-header">
                        <span className="admin-match-id">MATCH {m.id}</span>
                        {m.winner && <span className="admin-winner-pill">Winner: {m.winner}</span>}
                      </div>

                      {/* Team 1 */}
                      <div className="admin-team-input-row">
                        <span className="admin-team-label">{t1Name}</span>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={m.score1 ?? ''}
                          onChange={(e) => updateR2Match(m.id, e.target.value, m.score2, m.winner)}
                          className="admin-score-field"
                        />
                        <button
                          onClick={() => {
                            updateR2Match(m.id, m.score1 ?? 2, m.score2 ?? 0, t1Name);
                            triggerToast(`Match ${m.id} winner set to ${t1Name}`);
                          }}
                          className={`admin-winner-btn ${m.winner === t1Name ? 'active' : ''}`}
                        >
                          Set Winner
                        </button>
                      </div>

                      {/* Team 2 */}
                      <div className="admin-team-input-row">
                        <span className="admin-team-label">{t2Name}</span>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={m.score2 ?? ''}
                          onChange={(e) => updateR2Match(m.id, m.score1, e.target.value, m.winner)}
                          className="admin-score-field"
                        />
                        <button
                          onClick={() => {
                            updateR2Match(m.id, m.score1 ?? 0, m.score2 ?? 2, t2Name);
                            triggerToast(`Match ${m.id} winner set to ${t2Name}`);
                          }}
                          className={`admin-winner-btn ${m.winner === t2Name ? 'active' : ''}`}
                        >
                          Set Winner
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ROUND 3 LEAGUE */}
          {activeTab === 'r3' && (
            <div className="admin-stage-panel">
              <h3 className="admin-stage-title red-theme">Round 3 League Stage Manager</h3>
              <p className="admin-stage-desc">Record scores for the 5 league fixtures. The standings table automatically calculates points and seeds for the IPL Playoffs.</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Fixtures Column */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-display font-bold text-[#F5F7FA] uppercase tracking-wider">League Fixtures</h4>
                  {bracketState.round3Fixtures.map((f) => {
                    const t1Name = getR3TeamName(f, 1);
                    const t2Name = getR3TeamName(f, 2);

                    return (
                      <div key={f.id} className="admin-match-control-card">
                        <div className="admin-card-header">
                          <span className="admin-match-id">LEAGUE MATCH {f.id}</span>
                          {f.winner && <span className="admin-winner-pill">Winner: {f.winner}</span>}
                        </div>

                        {/* Team 1 */}
                        <div className="admin-team-input-row">
                          <span className="admin-team-label">{t1Name}</span>
                          <input
                            type="number"
                            min="0"
                            placeholder="Rounds"
                            value={f.score1 ?? ''}
                            onChange={(e) => updateR3Fixture(f.id, e.target.value, f.score2, f.winner)}
                            className="admin-score-field"
                          />
                          <button
                            onClick={() => {
                              updateR3Fixture(f.id, f.score1 ?? 13, f.score2 ?? 0, t1Name);
                              triggerToast(`League Match ${f.id} winner set to ${t1Name}`);
                            }}
                            className={`admin-winner-btn ${f.winner === t1Name ? 'active' : ''}`}
                          >
                            Set Winner
                          </button>
                        </div>

                        {/* Team 2 */}
                        <div className="admin-team-input-row">
                          <span className="admin-team-label">{t2Name}</span>
                          <input
                            type="number"
                            min="0"
                            placeholder="Rounds"
                            value={f.score2 ?? ''}
                            onChange={(e) => updateR3Fixture(f.id, f.score1, e.target.value, f.winner)}
                            className="admin-score-field"
                          />
                          <button
                            onClick={() => {
                              updateR3Fixture(f.id, f.score1 ?? 0, f.score2 ?? 13, t2Name);
                              triggerToast(`League Match ${f.id} winner set to ${t2Name}`);
                            }}
                            className={`admin-winner-btn ${f.winner === t2Name ? 'active' : ''}`}
                          >
                            Set Winner
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Auto Calculated Standings Column */}
                <div className="admin-standings-preview-card">
                  <h4 className="text-sm font-display font-bold text-[#F5F7FA] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Trophy size={16} className="text-[#F5A623]" />
                    Live Calculated Standings
                  </h4>

                  <div className="admin-standings-table">
                    <div className="admin-table-header">
                      <span>#</span>
                      <span>Team</span>
                      <span>P</span>
                      <span>W</span>
                      <span>L</span>
                      <span>RD</span>
                      <span>PTS</span>
                    </div>

                    {standings.map((team, idx) => {
                      const isEliminated = idx === 4;
                      return (
                        <div key={team.name} className={`admin-table-row ${isEliminated ? 'eliminated' : 'advance'}`}>
                          <span className="font-mono font-bold text-xs">{idx + 1}</span>
                          <span className="font-sans font-semibold text-xs text-white">{team.name}</span>
                          <span className="font-mono text-xs">{team.played}</span>
                          <span className="font-mono text-xs text-[#22C55E]">{team.wins}</span>
                          <span className="font-mono text-xs text-[#E63946]">{team.losses}</span>
                          <span className="font-mono text-xs">{team.roundDiff > 0 ? `+${team.roundDiff}` : team.roundDiff}</span>
                          <span className="font-mono font-bold text-xs text-[#F5A623]">{team.pts}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3 bg-black/40 border border-[#2D3440] rounded text-xs font-mono text-[#7D8793]">
                    <span className="text-[#22C55E] font-bold">1 & 2:</span> Qualifier 1 (Double Life)<br />
                    <span className="text-[#F5A623] font-bold">3 & 4:</span> Eliminator (Single Life)<br />
                    <span className="text-[#E63946] font-bold">5th:</span> Eliminated
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PLAYOFF SYSTEM */}
          {activeTab === 'playoffs' && (
            <div className="admin-stage-panel">
              <h3 className="admin-stage-title gold-theme">Playoff Control Panel</h3>
              <p className="admin-stage-desc">Manage Qualifier 1, Eliminator, Qualifier 2, and Grand Final matches (BO3).</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* QUALIFIER 1 */}
                <div className="admin-match-control-card">
                  <div className="admin-card-header">
                    <span className="admin-match-id text-[#E63946]">QUALIFIER 1 (SEED #1 VS SEED #2)</span>
                    {q1.winner && (
                      <span className="admin-winner-pill">Winner: {q1.winner} (Finals)</span>
                    )}
                  </div>

                  <div className="admin-team-input-row">
                    <span className="admin-team-label">{seed1Name} (Seed #1)</span>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="0"
                      value={q1.score1 ?? ''}
                      onChange={(e) => updatePlayoffMatch('qualifier1', e.target.value, q1.score2, q1.winner, q1.loser)}
                      className="admin-score-field"
                    />
                    <button
                      onClick={() => {
                        updatePlayoffMatch('qualifier1', 2, 1, seed1Name, seed2Name);
                        triggerToast(`Qualifier 1 Winner: ${seed1Name} (Direct to Grand Final)`);
                      }}
                      className={`admin-winner-btn ${q1.winner === seed1Name ? 'active' : ''}`}
                    >
                      Set Winner
                    </button>
                  </div>

                  <div className="admin-team-input-row">
                    <span className="admin-team-label">{seed2Name} (Seed #2)</span>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="0"
                      value={q1.score2 ?? ''}
                      onChange={(e) => updatePlayoffMatch('qualifier1', q1.score1, e.target.value, q1.winner, q1.loser)}
                      className="admin-score-field"
                    />
                    <button
                      onClick={() => {
                        updatePlayoffMatch('qualifier1', 1, 2, seed2Name, seed1Name);
                        triggerToast(`Qualifier 1 Winner: ${seed2Name} (Direct to Grand Final)`);
                      }}
                      className={`admin-winner-btn ${q1.winner === seed2Name ? 'active' : ''}`}
                    >
                      Set Winner
                    </button>
                  </div>
                </div>

                {/* ELIMINATOR */}
                <div className="admin-match-control-card">
                  <div className="admin-card-header">
                    <span className="admin-match-id text-[#E63946]">ELIMINATOR (SEED #3 VS SEED #4)</span>
                    {elim.winner && (
                      <span className="admin-winner-pill">Winner: {elim.winner} (To Q2)</span>
                    )}
                  </div>

                  <div className="admin-team-input-row">
                    <span className="admin-team-label">{seed3Name} (Seed #3)</span>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="0"
                      value={elim.score1 ?? ''}
                      onChange={(e) => updatePlayoffMatch('eliminator', e.target.value, elim.score2, elim.winner, elim.loser)}
                      className="admin-score-field"
                    />
                    <button
                      onClick={() => {
                        updatePlayoffMatch('eliminator', 2, 0, seed3Name, seed4Name);
                        triggerToast(`Eliminator Winner: ${seed3Name} (Advances to Qualifier 2)`);
                      }}
                      className={`admin-winner-btn ${elim.winner === seed3Name ? 'active' : ''}`}
                    >
                      Set Winner
                    </button>
                  </div>

                  <div className="admin-team-input-row">
                    <span className="admin-team-label">{seed4Name} (Seed #4)</span>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="0"
                      value={elim.score2 ?? ''}
                      onChange={(e) => updatePlayoffMatch('eliminator', elim.score1, e.target.value, elim.winner, elim.loser)}
                      className="admin-score-field"
                    />
                    <button
                      onClick={() => {
                        updatePlayoffMatch('eliminator', 0, 2, seed4Name, seed3Name);
                        triggerToast(`Eliminator Winner: ${seed4Name} (Advances to Qualifier 2)`);
                      }}
                      className={`admin-winner-btn ${elim.winner === seed4Name ? 'active' : ''}`}
                    >
                      Set Winner
                    </button>
                  </div>
                </div>

                {/* QUALIFIER 2 */}
                <div className="admin-match-control-card">
                  <div className="admin-card-header">
                    <span className="admin-match-id text-[#CD7F32]">QUALIFIER 2 (LOSER Q1 VS WINNER ELIMINATOR)</span>
                    {q2.winner && (
                      <span className="admin-winner-pill">Winner: {q2.winner} (To Grand Final)</span>
                    )}
                  </div>

                  <div className="admin-team-input-row">
                    <span className="admin-team-label">{q1Loser} (Loser Q1)</span>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="0"
                      value={q2.score1 ?? ''}
                      onChange={(e) => updatePlayoffMatch('qualifier2', e.target.value, q2.score2, q2.winner, q2.loser)}
                      className="admin-score-field"
                    />
                    <button
                      onClick={() => {
                        updatePlayoffMatch('qualifier2', 2, 1, q1Loser, elimWinner);
                        triggerToast(`Qualifier 2 Winner: ${q1Loser} (Advances to Grand Final)`);
                      }}
                      className={`admin-winner-btn ${q2.winner === q1Loser ? 'active' : ''}`}
                    >
                      Set Winner
                    </button>
                  </div>

                  <div className="admin-team-input-row">
                    <span className="admin-team-label">{elimWinner} (Winner Eliminator)</span>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="0"
                      value={q2.score2 ?? ''}
                      onChange={(e) => updatePlayoffMatch('qualifier2', q2.score1, e.target.value, q2.winner, q2.loser)}
                      className="admin-score-field"
                    />
                    <button
                      onClick={() => {
                        updatePlayoffMatch('qualifier2', 1, 2, elimWinner, q1Loser);
                        triggerToast(`Qualifier 2 Winner: ${elimWinner} (Advances to Grand Final)`);
                      }}
                      className={`admin-winner-btn ${q2.winner === elimWinner ? 'active' : ''}`}
                    >
                      Set Winner
                    </button>
                  </div>
                </div>

                {/* GRAND FINAL */}
                <div className="admin-match-control-card gold-border">
                  <div className="admin-card-header">
                    <span className="admin-match-id text-[#F5A623]">GRAND FINAL (WINNER Q1 VS WINNER Q2)</span>
                    {gf.winner && (
                      <span className="admin-winner-pill gold">CHAMPION: {gf.winner}</span>
                    )}
                  </div>

                  <div className="admin-team-input-row">
                    <span className="admin-team-label">{q1Winner} (Winner Q1)</span>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="0"
                      value={gf.score1 ?? ''}
                      onChange={(e) => updatePlayoffMatch('grandFinal', e.target.value, gf.score2, gf.winner, gf.loser)}
                      className="admin-score-field"
                    />
                    <button
                      onClick={() => {
                        updatePlayoffMatch('grandFinal', 2, 1, q1Winner, q2Winner);
                        triggerToast(`CHAMPION crowned: ${q1Winner}!`);
                      }}
                      className={`admin-winner-btn gold ${gf.winner === q1Winner ? 'active' : ''}`}
                    >
                      Crown Champion
                    </button>
                  </div>

                  <div className="admin-team-input-row">
                    <span className="admin-team-label">{q2Winner} (Winner Q2)</span>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      placeholder="0"
                      value={gf.score2 ?? ''}
                      onChange={(e) => updatePlayoffMatch('grandFinal', gf.score1, e.target.value, gf.winner, gf.loser)}
                      className="admin-score-field"
                    />
                    <button
                      onClick={() => {
                        updatePlayoffMatch('grandFinal', 1, 2, q2Winner, q1Winner);
                        triggerToast(`CHAMPION crowned: ${q2Winner}!`);
                      }}
                      className={`admin-winner-btn gold ${gf.winner === q2Winner ? 'active' : ''}`}
                    >
                      Crown Champion
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>
    </motion.div>
  );
}
