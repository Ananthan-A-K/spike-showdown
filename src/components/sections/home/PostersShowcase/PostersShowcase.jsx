import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import { containerVariants } from '../../../../animations/variants';
import regOpen from '../../../../assets/reg-open.jpeg';
import tesPost from '../../../../assets/tes-post.jpeg';
import './PostersShowcase.css';
import pool from '../../../../assets/p-pool.jpeg'

const POSTERS = [
  {
    name: "Season 1 Launch",
    title: "Tournament Teaser",
    img: tesPost,
  },
  {
    name: "Assemble Your Squad",
    title: "Registration Live",
    img: regOpen,
  },
  {
    name: "grab your slots",
    title: "Prize Pool Reveal",
    img: pool,
  },
  {
    name: "Assemble Your Squad",
    title: "Registration Live",
    img: regOpen,
  },
  {
    name: "Season 1 Launch",
    title: "Tournament Teaser",
    img: tesPost,
  },
];

export default function PostersShowcase() {
  const [activeItem, setActiveItem] = useState(Math.floor(POSTERS.length / 2));
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    wrapperRef.current.style.setProperty("--transition", "600ms cubic-bezier(0.22, 0.61, 0.36, 1)");
    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition");
    }, 900);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeItem]);

  return (
    <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-base)' }}>
      <div className="container-xl">
        <div className="posters-showcase-header">
          <SectionHeading
            eyebrow="Media & Teasers"
            title={<>Posters &<br />Tournament Art</>}
            subtitle="Explore our official artwork, teaser posters, and match media highlights."
          />
          <Link
            to="/gallery"
            className="btn btn-outline w-fit flex items-center gap-2"
            style={{ fontSize: '0.75rem', padding: '0.75rem 1.5rem', flexShrink: 0 }}
          >
            Full Gallery
            <ArrowRight size={14} />
          </Link>
        </div>

        <motion.ul
          ref={wrapperRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="posters-carousel-list"
        >
          {POSTERS.map((poster, index) => (
            <li
              key={`${poster.name}-${index}`}
              onClick={() => setActiveItem(index)}
              aria-current={activeItem === index}
              className="posters-carousel-item"
            >
              <div className="poster-card-inner">
                <img
                  className="poster-card-img"
                  src={poster.img}
                  alt={poster.name}
                  width="590"
                  height="640"
                  loading="lazy"
                />
                <div className="poster-card-overlay" />
                <div className="poster-card-content">
                  <p className="poster-card-title">
                    {poster.title}
                  </p>
                  <p className="poster-card-name">
                    {poster.name}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
