import React from 'react';
import { motion } from 'framer-motion';
import DomeGallery from '../../components/ui/DomeGallery/DomeGallery';
import { GALLERY_IMAGES } from '../../constants/data';
import { pageTransition } from '../../animations/variants';
import { Compass } from 'lucide-react';
import './Gallery.css';

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
