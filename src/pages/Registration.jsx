import React, { useState, useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { Shield, User, Mail, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Registration({ setCurrentPage }) {
  const { registerTeam } = useContext(TournamentContext);
  
  const [formData, setFormData] = useState({
    teamName: '',
    logo: '⬜',
    captainName: '',
    captainEmail: '',
    captainDiscord: '',
    captainRiotId: '',
    player2: '',
    player3: '',
    player4: '',
    player5: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const teamLogos = ['⬜', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '💀', '🔥', '⚡', '👁️', '🦖', '👑'];

  const validate = () => {
    let tempErrors = {};
    if (!formData.teamName.trim()) tempErrors.teamName = 'Team Name is required.';
    
    if (!formData.captainName.trim()) tempErrors.captainName = 'Captain Name is required.';
    
    if (!formData.captainEmail.trim()) {
      tempErrors.captainEmail = 'Captain Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.captainEmail)) {
      tempErrors.captainEmail = 'Email format is invalid.';
    }
    
    if (!formData.captainDiscord.trim()) {
      tempErrors.captainDiscord = 'Discord ID is required.';
    } else if (!formData.captainDiscord.includes('#') && formData.captainDiscord.length < 3) {
      tempErrors.captainDiscord = 'Enter a valid Discord username (e.g. username#0000 or global handle).';
    }

    if (!formData.captainRiotId.trim()) {
      tempErrors.captainRiotId = 'Captain Riot ID is required.';
    } else if (!formData.captainRiotId.includes('#')) {
      tempErrors.captainRiotId = 'Must include #TAG (e.g. Player#APAC).';
    }

    // Players validations
    ['player2', 'player3', 'player4', 'player5'].forEach((p, idx) => {
      if (!formData[p].trim()) {
        tempErrors[p] = `Player ${idx + 2} Riot ID is required.`;
      } else if (!formData[p].includes('#')) {
        tempErrors[p] = `Must include #TAG (e.g. Roster#123).`;
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const registered = registerTeam(formData);
      if (registered) {
        setSuccess(true);
        setFormData({
          teamName: '',
          logo: '⬜',
          captainName: '',
          captainEmail: '',
          captainDiscord: '',
          captainRiotId: '',
          player2: '',
          player3: '',
          player4: '',
          player5: ''
        });
        setTimeout(() => {
          setCurrentPage('teams');
        }, 3000);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-[0.25em] font-bold block mb-2">
          ROSTER INTAKE
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          TEAM REGISTRATION
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      {success ? (
        <div className="panel-glass p-8 border border-success/30 bg-success/5 text-center clip-chamfer-card max-w-xl mx-auto shadow-[0_0_20px_rgba(0,255,148,0.15)] animate-fade-in">
          <CheckCircle2 className="text-success mx-auto mb-4" size={48} />
          <h3 className="font-display font-black text-2xl text-white uppercase">
            REGISTRATION SUBMITTED
          </h3>
          <p className="mt-4 text-sm text-on-surface/80 leading-relaxed font-sans">
            Your roster has been logged into our databases. It is currently placed under **Pending Approval** status. The head tournament referee will verify all Riot IDs before approving.
          </p>
          <p className="mt-4 font-mono text-xs text-secondary font-bold uppercase animate-pulse">
            Redirecting to teams page...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Section 1: Team details */}
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary" />
            <h3 className="font-display font-black text-lg text-white uppercase mb-5 flex items-center gap-2">
              <Shield className="text-secondary" size={18} />
              1. Team Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Team Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="E.G. TEAM LIQUID"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.teamName ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors uppercase`}
                />
                {errors.teamName && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.teamName}
                  </span>
                )}
              </div>

              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Team Icon / Logo
                </label>
                <select
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none cursor-pointer"
                >
                  {teamLogos.map((ico) => (
                    <option key={ico} value={ico} className="bg-surface-container text-white">
                      {ico} - Logo Icon
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Captain details */}
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary" />
            <h3 className="font-display font-black text-lg text-white uppercase mb-5 flex items-center gap-2">
              <User className="text-primary" size={18} />
              2. Captain Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Captain Full Name
                </label>
                <input
                  type="text"
                  name="captainName"
                  value={formData.captainName}
                  onChange={handleChange}
                  placeholder="E.G. JOHN SMITH"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.captainName ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors`}
                />
                {errors.captainName && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.captainName}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="captainEmail"
                  value={formData.captainEmail}
                  onChange={handleChange}
                  placeholder="CAPTAIN@EMAIL.COM"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.captainEmail ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors`}
                />
                {errors.captainEmail && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.captainEmail}
                  </span>
                )}
              </div>

              {/* Discord */}
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Discord Username or ID
                </label>
                <input
                  type="text"
                  name="captainDiscord"
                  value={formData.captainDiscord}
                  onChange={handleChange}
                  placeholder="E.G. PLAYERNAME#0000"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.captainDiscord ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors`}
                />
                {errors.captainDiscord && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.captainDiscord}
                  </span>
                )}
              </div>

              {/* Riot ID */}
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Captain Riot ID (Must include #TAG)
                </label>
                <input
                  type="text"
                  name="captainRiotId"
                  value={formData.captainRiotId}
                  onChange={handleChange}
                  placeholder="E.G. TENZ#SEN"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.captainRiotId ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors uppercase`}
                />
                {errors.captainRiotId && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.captainRiotId}
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* Section 3: Roster details */}
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-tertiary" />
            <h3 className="font-display font-black text-lg text-white uppercase mb-5 flex items-center gap-2">
              <User className="text-tertiary" size={18} />
              3. Roster Players (Riot ID + #TAG)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Player 2 */}
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Player 2 Riot ID
                </label>
                <input
                  type="text"
                  name="player2"
                  value={formData.player2}
                  onChange={handleChange}
                  placeholder="E.G. PLAYER2#123"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.player2 ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors uppercase`}
                />
                {errors.player2 && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.player2}
                  </span>
                )}
              </div>

              {/* Player 3 */}
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Player 3 Riot ID
                </label>
                <input
                  type="text"
                  name="player3"
                  value={formData.player3}
                  onChange={handleChange}
                  placeholder="E.G. PLAYER3#123"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.player3 ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors uppercase`}
                />
                {errors.player3 && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.player3}
                  </span>
                )}
              </div>

              {/* Player 4 */}
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Player 4 Riot ID
                </label>
                <input
                  type="text"
                  name="player4"
                  value={formData.player4}
                  onChange={handleChange}
                  placeholder="E.G. PLAYER4#123"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.player4 ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors uppercase`}
                />
                {errors.player4 && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.player4}
                  </span>
                )}
              </div>

              {/* Player 5 */}
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                  Player 5 Riot ID
                </label>
                <input
                  type="text"
                  name="player5"
                  value={formData.player5}
                  onChange={handleChange}
                  placeholder="E.G. PLAYER5#123"
                  className={`w-full bg-[#0F1923] border-b ${
                    errors.player5 ? 'border-primary' : 'border-white/10'
                  } focus:border-secondary px-3 py-2 text-sm font-mono text-white outline-none transition-colors uppercase`}
                />
                {errors.player5 && (
                  <span className="flex items-center gap-1 mt-1 text-[10px] text-primary font-mono uppercase">
                    <AlertCircle size={10} />
                    {errors.player5}
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/95 text-white font-display font-black text-sm uppercase tracking-widest py-4.5 clip-chamfer-btn shadow-glow-red hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send size={16} />
            Submit Registration
          </button>
        </form>
      )}
    </div>
  );
}
