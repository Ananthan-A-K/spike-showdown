import React, { useState, useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import CertificateGenerator from '../components/CertificateGenerator';
import { Camera, Image as ImageIcon, Award, X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const { gallery } = useContext(TournamentContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filters = [
    { id: 'all', label: 'All Media' },
    { id: 'winner', label: 'Winners' },
    { id: 'poster', label: 'Posters' },
    { id: 'screenshot', label: 'Match Screenshots' },
    { id: 'highlight', label: 'Highlights' }
  ];

  const filteredMedia = activeFilter === 'all'
    ? gallery
    : gallery.filter(item => item.type === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs text-secondary uppercase tracking-[0.25em] font-bold block mb-2">
          CAPTURE WALL
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          TOURNAMENT GALLERY
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      {/* Filter Badges */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`py-1.5 px-3 font-mono text-[10px] uppercase border cursor-pointer transition-colors duration-200 ${
              activeFilter === f.id
                ? 'border-secondary text-secondary bg-secondary/15 font-bold'
                : 'border-white/10 text-on-surface/65 hover:border-white/30 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {filteredMedia.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredMedia.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setLightboxImg(item)}
              className="panel-glass border border-white/5 clip-chamfer-card overflow-hidden group cursor-pointer relative aspect-video"
            >
              {/* Image */}
              <img 
                src={item.url} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
              
              {/* Hover actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-3 bg-primary/95 text-white clip-chamfer-btn shadow-glow-red scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn size={18} />
                </div>
              </div>

              {/* Title & Tag */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="font-mono text-[8px] bg-secondary text-on-secondary px-1.5 py-0.5 uppercase tracking-wider font-extrabold">
                  {item.type}
                </span>
                <h4 className="font-display font-black text-sm uppercase text-white mt-2 truncate">
                  {item.title}
                </h4>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/10 mb-16">
          <ImageIcon className="mx-auto text-on-surface/20 mb-4" size={48} />
          <span className="font-mono text-sm text-on-surface/40 uppercase block">
            No media files available in this category.
          </span>
        </div>
      )}

      {/* Dynamic Certificate Generator Section (Winner Hall of Fame vibe) */}
      <section className="border-t border-white/5 pt-16 mt-16">
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-tertiary uppercase tracking-[0.25em] font-bold block mb-2">
            CLAIM YOUR REWARD
          </span>
          <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase">
            🏆 WINNER CERTIFICATES
          </h3>
          <p className="mt-3 text-sm text-on-surface/60 font-sans max-w-lg mx-auto">
            Participating players can enter their registered name and team banner below to generate their customized Spike Showdown certification.
          </p>
        </div>

        <CertificateGenerator />
      </section>

      {/* Lightbox Pop-up Modal */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-[30px] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImg(null)}
        >
          <div 
            className="max-w-4xl w-full relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-[-48px] right-0 text-on-surface hover:text-white p-1 cursor-pointer bg-white/5 border border-white/10"
            >
              <X size={20} />
            </button>

            {/* Frame Image */}
            <div className="panel-glass border border-white/10 p-2 clip-chamfer-card max-h-[80vh] overflow-hidden">
              <img 
                src={lightboxImg.url} 
                alt={lightboxImg.title} 
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Info details */}
            <div className="text-center mt-4">
              <span className="font-mono text-[9px] bg-secondary text-on-secondary px-2 py-0.5 uppercase tracking-widest font-bold">
                {lightboxImg.type}
              </span>
              <h3 className="font-display font-black text-base md:text-lg uppercase text-white mt-2">
                {lightboxImg.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
