import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../About/About';
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
      <PageHeader
        eyebrow="Media Showcase"
        title="Showdown Gallery"
        subtitle="Explore the key visuals, tournament posters, and event highlights from Spike Showdown Season 1."
      />

      <section className="section-pad gallery-showcase-section">
        <div className="container-xl">
          
          {/* Interaction Guide */}
          <div className="gallery-guide-container mb-12">
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

        </div>
      </section>
    </motion.div>
  );
}
