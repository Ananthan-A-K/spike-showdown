import React, { useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export default function LiveNotification() {
  const { notifications, removeNotification } = useContext(TournamentContext);

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-[90%] sm:w-full">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`panel-glass p-4 border flex items-start gap-3 transition-all duration-300 relative overflow-hidden clip-chamfer-btn ${
            notif.type === 'success'
              ? 'border-success/30 bg-success/5 shadow-[0_0_15px_rgba(0,255,148,0.15)]'
              : notif.type === 'warning'
              ? 'border-warning/30 bg-warning/5 shadow-[0_0_15px_rgba(255,184,0,0.15)]'
              : 'border-secondary/30 bg-secondary/5 shadow-[0_0_15px_rgba(0,241,254,0.15)]'
          }`}
          style={{
            animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {/* Neon side accent bar */}
          <div className={`absolute top-0 left-0 w-1 h-full ${
            notif.type === 'success'
              ? 'bg-success'
              : notif.type === 'warning'
              ? 'bg-warning'
              : 'bg-secondary'
          }`} />

          <div className="flex-shrink-0 mt-0.5">
            {notif.type === 'success' && <CheckCircle className="text-success" size={18} />}
            {notif.type === 'warning' && <AlertTriangle className="text-warning" size={18} />}
            {notif.type === 'info' && <Info className="text-secondary" size={18} />}
          </div>

          <div className="flex-1 text-xs md:text-sm font-mono text-on-surface uppercase pr-4">
            {notif.text}
          </div>

          <button
            onClick={() => removeNotification(notif.id)}
            className="text-on-surface/50 hover:text-white transition-colors cursor-pointer self-start"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%) translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
