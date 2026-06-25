import React, { useState, useRef } from 'react';
import { Award, Download, User, Shield } from 'lucide-react';

export default function CertificateGenerator() {
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [achievement, setAchievement] = useState('Finalist');
  const canvasRef = useRef(null);

  const achievements = ['Champions', 'Runners Up', 'MVP', 'Finalist', 'Organizing Committee'];

  const handleDownload = () => {
    if (!name) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set high-resolution print sizes
    canvas.width = 1200;
    canvas.height = 800;
    
    // 1. Solid Dark Background
    ctx.fillStyle = '#0a141e';
    ctx.fillRect(0, 0, 1200, 800);
    
    // 2. Corner highlights (Atmospheric glow)
    const redGlow = ctx.createRadialGradient(0, 0, 100, 0, 0, 500);
    redGlow.addColorStop(0, 'rgba(255, 70, 85, 0.15)');
    redGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = redGlow;
    ctx.fillRect(0, 0, 600, 600);

    const cyanGlow = ctx.createRadialGradient(1200, 800, 100, 1200, 800, 500);
    cyanGlow.addColorStop(0, 'rgba(0, 241, 254, 0.1)');
    cyanGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = cyanGlow;
    ctx.fillRect(600, 200, 600, 600);

    // 3. Cyber-Tactical Frame
    // Outer Frame (Electric Cyan)
    ctx.strokeStyle = '#00f1fe';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, 1140, 740);
    
    // Inner Accent Frame (Radiant Red)
    ctx.strokeStyle = '#ff4655';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 1120, 720);

    // Corner Angled Crosshairs
    ctx.strokeStyle = '#ff4655';
    ctx.lineWidth = 2;
    // Top-Left corner chamfer effect
    ctx.beginPath();
    ctx.moveTo(30, 60); ctx.lineTo(60, 30);
    ctx.moveTo(30, 90); ctx.lineTo(90, 30);
    // Top-Right corner chamfer
    ctx.moveTo(1170, 60); ctx.lineTo(1140, 30);
    ctx.moveTo(1170, 90); ctx.lineTo(1110, 30);
    // Bottom-Left
    ctx.moveTo(30, 740); ctx.lineTo(60, 770);
    ctx.moveTo(30, 710); ctx.lineTo(90, 770);
    // Bottom-Right
    ctx.moveTo(1170, 740); ctx.lineTo(1140, 770);
    ctx.moveTo(1170, 710); ctx.lineTo(1110, 770);
    ctx.stroke();

    // 4. Large Watermark Valorant V in Center
    ctx.strokeStyle = 'rgba(255, 70, 85, 0.03)';
    ctx.lineWidth = 45;
    ctx.beginPath();
    ctx.moveTo(600, 240);
    ctx.lineTo(660, 480);
    ctx.lineTo(540, 480);
    ctx.closePath();
    ctx.stroke();

    // 5. Text Contents
    // Header Logo Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SPIKE SHOWDOWN 2026', 600, 140);
    
    // Sub-header
    ctx.fillStyle = '#00f1fe';
    ctx.font = '700 16px monospace';
    ctx.fillText('DIGITAL CERTIFICATE OF ACHIEVEMENTS', 600, 185);
    
    // Main Body Intro
    ctx.fillStyle = '#d9e3f2';
    ctx.font = '300 20px sans-serif';
    ctx.fillText('This certification is officially granted to:', 600, 270);
    
    // Name
    ctx.fillStyle = '#ff4655';
    ctx.font = '900 56px sans-serif';
    ctx.fillText(name.toUpperCase(), 600, 360);
    
    // Decorative line under name
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(350, 410);
    ctx.lineTo(850, 410);
    ctx.stroke();

    // Description text
    ctx.fillStyle = '#d9e3f2';
    ctx.font = '400 18px sans-serif';
    ctx.fillText(`in recognition of their competitive excellence as a`, 600, 460);

    // Achievement Badge
    ctx.fillStyle = '#cf5cff';
    ctx.font = '900 32px sans-serif';
    ctx.fillText(achievement.toUpperCase(), 600, 510);
    
    // Team details
    if (teamName) {
      ctx.fillStyle = '#d9e3f2';
      ctx.font = '400 18px sans-serif';
      ctx.fillText(`competing under the banner of team`, 600, 560);
      
      ctx.fillStyle = '#00f1fe';
      ctx.font = '700 28px sans-serif';
      ctx.fillText(teamName.toUpperCase(), 600, 605);
    }
    
    // Footer Meta details
    ctx.fillStyle = 'rgba(217, 227, 242, 0.4)';
    ctx.font = '500 13px monospace';
    ctx.fillText('SPIKE SHOWDOWN CERTIFICATION DEPT  •  VERIFICATION HASH: SS-' + Math.random().toString(36).substr(2, 9).toUpperCase(), 600, 700);
    
    ctx.fillStyle = 'rgba(217, 227, 242, 0.6)';
    ctx.font = '400 13px monospace';
    ctx.fillText('DATE OF ISSUE: JUNE 25, 2026   |   ORGANIZER: ESPORTS LEAGUE COMMITTEE', 600, 725);
    
    // Trigger Image Download
    const dataUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = `SpikeShowdown_Cert_${name.replace(/\s+/g, '_')}.png`;
    downloadLink.href = dataUrl;
    downloadLink.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Editor Panel */}
      <div className="panel-glass p-6 border border-white/5 relative clip-chamfer-card">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-tertiary" />
        <h3 className="font-display font-black text-xl uppercase text-white mb-6 flex items-center gap-2">
          <Award className="text-tertiary" size={24} />
          Claim Digital Certificate
        </h3>

        <div className="flex flex-col gap-5">
          {/* Full Name */}
          <div>
            <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" />
              <input
                type="text"
                placeholder="VALORANT PLAYER"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-10 py-3 text-sm font-mono text-white outline-none transition-colors uppercase"
              />
            </div>
          </div>

          {/* Team Name */}
          <div>
            <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
              Team Name
            </label>
            <div className="relative">
              <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" />
              <input
                type="text"
                placeholder="SENTINELS"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-10 py-3 text-sm font-mono text-white outline-none transition-colors uppercase"
              />
            </div>
          </div>

          {/* Standing / Role */}
          <div>
            <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
              Standing / Achievement
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {achievements.map((ach) => (
                <button
                  key={ach}
                  onClick={() => setAchievement(ach)}
                  className={`py-2 px-3 border text-center font-mono text-xs uppercase cursor-pointer transition-colors duration-200 ${
                    achievement === ach
                      ? 'border-tertiary text-tertiary bg-tertiary/10 shadow-[0_0_10px_rgba(207,92,255,0.15)] font-bold'
                      : 'border-white/10 text-on-surface/65 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {ach}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={!name}
            className={`mt-4 py-3.5 text-center font-display font-black text-sm uppercase tracking-widest clip-chamfer-btn flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
              name
                ? 'bg-tertiary hover:bg-tertiary/90 text-white shadow-[0_0_15px_rgba(207,92,255,0.25)] hover:scale-[1.02]'
                : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
            }`}
          >
            <Download size={16} />
            Download PNG Certificate
          </button>
        </div>
      </div>

      {/* Certificate Live Preview (Stunning esports card design) */}
      <div className="w-full relative flex items-center justify-center p-1 bg-gradient-to-br from-tertiary/20 to-secondary/10 border border-white/10 clip-chamfer-card">
        <div className="w-full bg-[#0a141e] aspect-[3/2] flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative glows in preview */}
          <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Frames */}
          <div className="absolute inset-2 border border-secondary/20 pointer-events-none" />
          <div className="absolute inset-3 border border-primary/10 pointer-events-none" />

          {/* Header */}
          <div className="text-center mt-2">
            <span className="font-display font-black text-sm sm:text-lg text-white block tracking-wider leading-none">
              SPIKE SHOWDOWN 2026
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-secondary tracking-widest uppercase block mt-1">
              DIGITAL ACHIEVEMENT CERTIFICATION
            </span>
          </div>

          {/* Body */}
          <div className="text-center my-4 flex-1 flex flex-col justify-center">
            <span className="font-sans text-[10px] sm:text-xs text-on-surface-variant/80 uppercase block">
              This certification is officially granted to:
            </span>
            <span className="font-display font-black text-lg sm:text-2xl md:text-3xl text-primary text-glow-red tracking-wide block uppercase mt-2.5 min-h-[30px]">
              {name || 'PLAYER NAME'}
            </span>
            
            <div className="w-24 h-[1px] bg-white/20 mx-auto my-3" />
            
            <span className="font-sans text-[10px] sm:text-xs text-on-surface-variant/80 block">
              in recognition of their competitive excellence as a
            </span>
            <span className="font-display font-black text-xs sm:text-base text-tertiary block mt-1 tracking-wider uppercase">
              {achievement}
            </span>

            {teamName && (
              <div className="mt-2.5">
                <span className="font-sans text-[8px] sm:text-[10px] text-on-surface-variant/50 block">
                  representing team
                </span>
                <span className="font-display font-extrabold text-sm sm:text-lg text-secondary uppercase block leading-tight mt-0.5">
                  {teamName}
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center font-mono text-[7px] sm:text-[9px] text-on-surface/40 mt-auto border-t border-white/5 pt-3">
            VERIFICATION CODE: SS-{name ? name.substring(0, 3).toUpperCase() : 'PLY'}-{Math.floor(1000 + Math.random() * 9000)}
          </div>
        </div>
      </div>

      {/* Hidden Canvas for High Resolution Downloads */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
