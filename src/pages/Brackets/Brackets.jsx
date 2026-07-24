import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Users, Swords, Award, AlertCircle, Star, Shield, Lock, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBracket } from '../../context/BracketContext';
import { PageHeader } from '../About/About';
import { pageTransition } from '../../animations/variants';
import './Brackets.css';

// Match Card Component with Context Integration
function BracketMatchCard({ matchNum, team1Name, team2Name, score1, score2, winnerText, isBye = false, highlight = false }) {
  const isT1Winner = winnerText && winnerText === team1Name;
  const isT2Winner = winnerText && winnerText === team2Name;

  return (
    <div className={`official-match-card ${highlight ? 'highlight-card' : ''}`}>
      <div className="official-match-header">
        <span className="official-match-badge">MATCH {matchNum}</span>
        {winnerText && <span className="official-match-note font-mono text-[#22C55E]">Completed</span>}
      </div>

      <div className="official-match-teams">
        {/* Team 1 */}
        <div className={`official-team-row ${isT1Winner ? 'winner-row' : ''} ${isBye ? 'bye-team' : ''}`}>
          <div className="official-team-name-wrap">
            <span className={`official-team-name ${isT1Winner ? 'font-bold text-white' : ''}`}>{team1Name}</span>
            {isBye && <span className="bye-badge">BYE ADVANCE</span>}
          </div>
          {score1 !== null && score1 !== undefined && (
            <span className={`official-team-score ${isT1Winner ? 'text-[#22C55E]' : ''}`}>{score1}</span>
          )}
        </div>

        <div className="official-vs-divider">
          <span>VS</span>
        </div>

        {/* Team 2 */}
        <div className={`official-team-row ${isT2Winner ? 'winner-row' : ''}`}>
          <div className="official-team-name-wrap">
            <span className={`official-team-name ${isT2Winner ? 'font-bold text-white' : ''}`}>{team2Name}</span>
          </div>
          {score2 !== null && score2 !== undefined && (
            <span className={`official-team-score ${isT2Winner ? 'text-[#22C55E]' : ''}`}>{score2}</span>
          )}
        </div>
      </div>

      <div className="official-match-footer">
        <span className="official-winner-arrow">→</span>
        <span className={`official-winner-target ${winnerText ? 'text-white font-bold' : ''}`}>
          {winnerText || 'TBD'}
        </span>
      </div>
    </div>
  );
}

export default function Brackets() {
  const [activeTab, setActiveTab] = useState('all');

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
    runnerUpName,
  } = useBracket();

  const q1 = bracketState.playoffs?.qualifier1 || {};
  const elim = bracketState.playoffs?.eliminator || {};
  const q2 = bracketState.playoffs?.qualifier2 || {};
  const gf = bracketState.playoffs?.grandFinal || {};

  return (
    <motion.div
      key="brackets"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      className="official-brackets-page"
    >
      <PageHeader
        eyebrow="Official Brackets"
        title="19 Teams Championship Structure"
        subtitle="Single Elimination, League Stage & Playoff System for SPIKE SHOWDOWN Season 1."
      />

      <section className="section-pad">
        <div className="container-xl">

          {/* Banner Header with Admin Quick Access Button */}
          <div className="tournament-banner-hero">
            <div className="banner-glow-overlay" />
            <div className="banner-content">
              <span className="banner-season-tag">SPIKE SHOWDOWN — SEASON 1</span>
              <h2 className="banner-main-title">VALORANT TOURNAMENT</h2>
              
              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <div className="banner-teams-count-badge">
                  <Shield size={16} className="text-[#E63946]" />
                  <span>19 TEAMS PLAYOFF FORMAT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="bracket-nav-tabs">
            {[
              { id: 'all', label: 'Full Tournament Roadmap' },
              { id: 'r1', label: 'Round 1 (18 Teams + 1 Bye)' },
              { id: 'r2', label: 'Round 2 (10 Teams)' },
              { id: 'r3', label: 'Round 3 (League Stage)' },
              { id: 'playoffs', label: 'Playoff Stage' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`bracket-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* MAIN CONTENT STAGES */}
          <div className="official-bracket-flow">

            {/* ============================================================ */}
            {/* ROUND 1 */}
            {/* ============================================================ */}
            {(activeTab === 'all' || activeTab === 'r1') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bracket-stage-block"
              >
                <div className="stage-header-row red-theme">
                  <div className="stage-title-wrap">
                    <span className="stage-badge-pill">ROUND 1</span>
                    <h3 className="stage-title">1 TEAM BYE + 18 TEAMS PLAY</h3>
                  </div>
                  <div className="stage-summary-badge">
                    <Users size={14} />
                    <span>AFTER ROUND 1: 10 TEAMS REMAIN (BYE TEAM + 9 WINNERS)</span>
                  </div>
                </div>

                {/* BYE SPECIAL CARD */}
                <div className="r1-bye-container">
                  <div className="bye-team-card">
                    <span className="bye-label">AUTOMATIC BYE</span>
                    <div className="bye-team-details">
                      <Shield size={20} className="text-[#E63946]" />
                      <span className="bye-team-name">4DX</span>
                    </div>
                    <span className="bye-arrow-sub">Directly advances to Round 2 (Match 10) →</span>
                  </div>
                </div>

                {/* 9 MATCH CARDS GRID */}
                <div className="matches-grid-9">
                  {bracketState.round1.map((m) => (
                    <BracketMatchCard
                      key={m.id}
                      matchNum={m.id}
                      team1Name={m.team1}
                      team2Name={m.team2}
                      score1={m.score1}
                      score2={m.score2}
                      winnerText={m.winner}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* ROUND 2 */}
            {/* ============================================================ */}
            {(activeTab === 'all' || activeTab === 'r2') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bracket-stage-block"
              >
                <div className="stage-header-row red-theme">
                  <div className="stage-title-wrap">
                    <span className="stage-badge-pill">ROUND 2</span>
                    <h3 className="stage-title">10 TEAMS → 5 WINNERS</h3>
                  </div>
                  <div className="stage-summary-badge">
                    <Users size={14} />
                    <span>AFTER ROUND 2: 5 TEAMS REMAIN</span>
                  </div>
                </div>

                <div className="matches-grid-5">
                  {bracketState.round2.map((m) => {
                    const t1Name = getR2TeamName(m, 1);
                    const t2Name = getR2TeamName(m, 2);

                    return (
                      <BracketMatchCard
                        key={m.id}
                        matchNum={m.id}
                        team1Name={t1Name}
                        team2Name={t2Name}
                        score1={m.score1}
                        score2={m.score2}
                        winnerText={m.winner}
                        isBye={m.id === 10}
                        highlight={m.id === 10}
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* ROUND 3 (LEAGUE STAGE AMONG 5 TEAMS) */}
            {/* ============================================================ */}
            {(activeTab === 'all' || activeTab === 'r3') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bracket-stage-block"
              >
                <div className="stage-header-row red-theme">
                  <div className="stage-title-wrap">
                    <span className="stage-badge-pill">ROUND 3</span>
                    <h3 className="stage-title">LEAGUE STAGE AMONG 5 TEAMS</h3>
                  </div>
                  <div className="stage-summary-badge highlight-green">
                    <Users size={14} />
                    <span>TOP 4 TEAMS QUALIFY FOR PLAYOFFS</span>
                  </div>
                </div>

                <div className="round3-league-layout">
                  {/* Fixtures List */}
                  <div className="league-card fixtures-card">
                    <div className="league-card-header">
                      <Swords size={16} className="text-[#E63946]" />
                      <h4>FIXTURES & SCORES</h4>
                    </div>
                    <div className="league-fixtures-list">
                      {bracketState.round3Fixtures.map((f) => {
                        const t1Name = getR3TeamName(f, 1);
                        const t2Name = getR3TeamName(f, 2);

                        return (
                          <div key={f.id} className="fixture-row flex-col items-start gap-1">
                            <div className="flex items-center justify-between w-full">
                              <span className="fixture-num">MATCH {f.id}</span>
                              {f.winner && <span className="text-[0.6rem] font-mono text-[#22C55E]">Winner: {f.winner}</span>}
                            </div>
                            
                            <div className="fixture-vs w-full flex justify-between">
                              <span className={`fixture-team ${f.winner === t1Name ? 'text-white font-bold' : ''}`}>{t1Name}</span>
                              <span className="font-mono text-xs text-[#7D8793]">{f.score1 ?? '-'} : {f.score2 ?? '-'}</span>
                              <span className={`fixture-team ${f.winner === t2Name ? 'text-white font-bold' : ''}`}>{t2Name}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* How It Works */}
                  <div className="league-card works-card">
                    <div className="league-card-header">
                      <Users size={16} className="text-[#4F7CAC]" />
                      <h4>HOW IT WORKS</h4>
                    </div>
                    <div className="works-content">
                      <ul className="works-list">
                        <li>5 qualified teams</li>
                        <li>Each team plays ONLY 2 matches</li>
                        <li>Total League Matches: 5</li>
                      </ul>

                      <div className="works-after-section">
                        <span className="works-after-title">After all matches:</span>
                        <div className="works-after-items">
                          <span className="works-qualify">Top 4 &rarr; Playoffs</span>
                          <span className="works-eliminate">5th Place &rarr; Eliminated</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Standings Table */}
                  <div className="league-card standings-card col-span-full">
                    <div className="league-card-header flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award size={18} className="text-[#F5A623]" />
                        <h4>LIVE LEAGUE STANDINGS TABLE</h4>
                      </div>
                      <span className="font-mono text-[0.65rem] text-[#7D8793]">ROUND 3 LEAGUE STAGE</span>
                    </div>

                    <div className="public-table-container">
                      <table className="public-standings-table">
                        <thead>
                          <tr>
                            <th className="col-pos">#</th>
                            <th className="col-team">TEAM</th>
                            <th className="col-stat">P</th>
                            <th className="col-stat text-green">W</th>
                            <th className="col-stat text-red">L</th>
                            <th className="col-stat">RD</th>
                            <th className="col-pts">PTS</th>
                            <th className="col-status">PLAYOFF QUALIFICATION STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {standings.map((item, idx) => {
                            const isEliminated = idx === 4;
                            const isDoubleLife = idx === 0 || idx === 1;
                            const statusText = isDoubleLife 
                              ? 'QUALIFIER 1 (DOUBLE LIFE)' 
                              : idx === 2 || idx === 3 
                              ? 'ELIMINATOR (SINGLE LIFE)' 
                              : 'ELIMINATED (5TH PLACE)';

                            return (
                              <tr key={item.name} className={`standing-tr ${isEliminated ? 'eliminated' : isDoubleLife ? 'double-life' : 'single-life'}`}>
                                <td className="col-pos">{idx + 1}</td>
                                <td className="col-team">{item.name}</td>
                                <td className="col-stat">{item.played}</td>
                                <td className="col-stat text-green">{item.wins}</td>
                                <td className="col-stat text-red">{item.losses}</td>
                                <td className="col-stat">{item.roundDiff > 0 ? `+${item.roundDiff}` : item.roundDiff}</td>
                                <td className="col-pts">{item.pts}</td>
                                <td className="col-status">
                                  <span className={`public-status-badge ${isEliminated ? 'eliminated' : isDoubleLife ? 'double-life' : 'single-life'}`}>
                                    {statusText}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* PLAYOFFS: PLAYOFF FORMAT (QUALIFIER 1, ELIMINATOR, QUALIFIER 2, GRAND FINAL) */}
            {/* ============================================================ */}
            {(activeTab === 'all' || activeTab === 'playoffs') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bracket-stage-block playoffs-stage"
              >
                <div className="stage-header-row gold-theme">
                  <div className="stage-title-wrap">
                    <span className="stage-badge-pill gold-pill">PLAYOFF SYSTEM</span>
                    <h3 className="stage-title">QUALIFIERS, ELIMINATOR & GRAND FINAL (BEST OF 3)</h3>
                  </div>
                </div>

                <div className="playoffs-grid">
                  {/* QUALIFIER 1 */}
                  <div className="playoff-card semifinals-block">
                    <div className="playoff-card-title red-theme">
                      <Flame size={16} />
                      <span>QUALIFIER 1 (SEED #1 VS SEED #2)</span>
                    </div>

                    <div className="sf-matches-col">
                      <div className="sf-match-box">
                        <span className="sf-label">WINNER ADVANCES DIRECTLY TO GRAND FINAL</span>
                        <div className="sf-teams-row mt-2">
                          <span className={`sf-team ${q1.winner === seed1Name ? 'text-[#22C55E]' : ''}`}>{seed1Name}</span>
                          <span className="font-mono text-xs text-[#7D8793]">{q1.score1 ?? '-'} : {q1.score2 ?? '-'}</span>
                          <span className={`sf-team ${q1.winner === seed2Name ? 'text-[#22C55E]' : ''}`}>{seed2Name}</span>
                        </div>
                        <div className="sf-outcomes">
                          <span className="winner-tag">➜ WINNER: {q1Winner} (Grand Final)</span>
                          <span className="loser-tag">➜ LOSER: {q1Loser} (Qualifier 2)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ELIMINATOR */}
                  <div className="playoff-card semifinals-block">
                    <div className="playoff-card-title red-theme">
                      <Swords size={16} />
                      <span>ELIMINATOR (SEED #3 VS SEED #4)</span>
                    </div>

                    <div className="sf-matches-col">
                      <div className="sf-match-box">
                        <span className="sf-label">LOSER IS ELIMINATED (4TH PLACE)</span>
                        <div className="sf-teams-row mt-2">
                          <span className={`sf-team ${elim.winner === seed3Name ? 'text-[#22C55E]' : ''}`}>{seed3Name}</span>
                          <span className="font-mono text-xs text-[#7D8793]">{elim.score1 ?? '-'} : {elim.score2 ?? '-'}</span>
                          <span className={`sf-team ${elim.winner === seed4Name ? 'text-[#22C55E]' : ''}`}>{seed4Name}</span>
                        </div>
                        <div className="sf-outcomes">
                          <span className="winner-tag">➜ WINNER: {elimWinner} (Qualifier 2)</span>
                          <span className="loser-tag">➜ LOSER: {elimLoser}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QUALIFIER 2 */}
                  <div className="playoff-card losers-final-block">
                    <div className="playoff-card-title bronze-theme">
                      <Award size={16} />
                      <span>QUALIFIER 2 (LOSER Q1 VS WINNER ELIMINATOR)</span>
                    </div>
                    
                    <div className="losers-content">
                      <div className="losers-teams-row w-full flex justify-between">
                        <span className={`sf-team ${q2.winner === q1Loser ? 'text-[#22C55E]' : ''}`}>{q1Loser}</span>
                        <span className="font-mono text-xs text-[#7D8793]">{q2.score1 ?? '-'} : {q2.score2 ?? '-'}</span>
                        <span className={`sf-team ${q2.winner === elimWinner ? 'text-[#22C55E]' : ''}`}>{elimWinner}</span>
                      </div>
                      <div className="trophy-award-box bronze-glow">
                        <Trophy size={22} className="text-[#CD7F32]" />
                        <span className="award-title">3RD PLACE FINISHER</span>
                        <span className="text-xs font-mono text-white font-bold mt-1">{q2Loser}</span>
                      </div>
                    </div>
                  </div>

                  {/* GRAND FINAL */}
                  <div className="playoff-card grand-final-block">
                    <div className="playoff-card-title gold-theme">
                      <Crown size={18} />
                      <span>GRAND FINAL (WINNER Q1 VS WINNER Q2)</span>
                    </div>

                    <div className="gf-content">
                      <div className="gf-competitors-box flex justify-between w-full">
                        <span className="gf-team winner-sf1">{q1Winner}</span>
                        <span className="font-mono text-xs text-[#F5A623]">{gf.score1 ?? '-'} : {gf.score2 ?? '-'}</span>
                        <span className="gf-team winner-sf2">{q2Winner}</span>
                      </div>

                      <div className="trophy-award-box gold-glow">
                        <div className="crown-row">
                          <Star size={12} className="text-[#F5A623] fill-[#F5A623]" />
                          <Crown size={28} className="text-[#F5A623]" />
                          <Star size={12} className="text-[#F5A623] fill-[#F5A623]" />
                        </div>
                        <span className="award-title grand-champion">CHAMPION</span>
                        <span className="text-sm font-display font-bold text-white mt-1 uppercase tracking-wider">{championWinner}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Footer Rule Star Note */}
            <div className="official-rule-footer-note">
              <Star size={14} className="text-[#E63946] fill-[#E63946]" />
              <span>PLAYOFF FORMAT: TOP 2 TEAMS GET DOUBLE LIFE (Q1) | SEEDS 3 & 4 PLAY ELIMINATOR</span>
              <Star size={14} className="text-[#E63946] fill-[#E63946]" />
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
}
