import React from 'react';
import { motion } from 'framer-motion';
import DomeGallery from '../../components/ui/DomeGallery/DomeGallery';
import { pageTransition } from '../../animations/variants';
import { Compass } from 'lucide-react';
import './Gallery.css';

const GALLERY_IMAGES = [
  {
    src: '/hero_key_visual.png',
    alt: 'Spike Showdown Hero Showcase',
  },
  {
    src: '/roster_key_visual.png',
    alt: 'Roster Registration Showcase',
  },
  {
    src: '/trophy_key_visual.png',
    alt: 'Championship Trophy Showcase',
  },
  {
    src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    alt: 'Esports Tournament Arena',
  },
  {
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    alt: 'Pro Gaming Controller',
  },
  {
    src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
    alt: 'Gaming Screen Closeup',
  },
  {
    src: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=800&auto=format&fit=crop',
    alt: 'Mechanical Keyboard RGB',
  },
  {
    src: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    alt: 'Ultimate Gaming Rig',
  },
  {
    src: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop',
    alt: 'Esports Gaming Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=800&auto=format&fit=crop',
    alt: 'Esports Headset & Audio',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    alt: 'Pro Team Brainstorming',
  },
];

export default function Gallery() {
  return (
    <motion.div
      key="gallery"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      className="gallery-page"
    >
      <section className="section-pad gallery-showcase-section">
        <div className="container-xl">
          
          {/* Immersive Gallery Frame */}
          <div className="gallery-dome-wrapper">
            <div className="gallery-dome-container">
              <DomeGallery
                images={GALLERY_IMAGES}
                fit={0.6}
                fitBasis="auto"
                minRadius={500}
                maxRadius={800}
                overlayBlurColor="#0F1115"
                openedImageWidth="360px"
                openedImageHeight="510px"
                grayscale={false}
              />
            </div>
            {/* Visual bottom fade overlay */}
            <div className="gallery-bottom-fade" />
          </div>

          {/* Interaction Guide */}
          <div className="gallery-guide-container">
            <div className="gallery-guide-card">
              <div className="gallery-guide-icon-wrapper">
                <Compass className="gallery-guide-icon animate-pulse" size={20} />
              </div>
              <div className="gallery-guide-text">
                <h4 className="gallery-guide-title">Interactive 3D Dome Gallery</h4>
                <p className="gallery-guide-desc">
                  Hold and drag your mouse/finger to spin the dome. Click or tap on any thumbnail/poster to enlarge and inspect it in detail.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
