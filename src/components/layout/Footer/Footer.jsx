import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Instagram, Mail, Twitter, Youtube, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, TOURNAMENT } from '../../../constants/data';
import './Footer.css';

const SOCIALS = [
  { icon: MessageSquare, label: 'Discord',   href: 'https://discord.gg' },
  { icon: Instagram,     label: 'Instagram', href: 'https://instagram.com' },
  { icon: Twitter,       label: 'Twitter',   href: 'https://twitter.com' },
  { icon: Youtube,       label: 'YouTube',   href: 'https://youtube.com' },
  { icon: Mail,          label: 'Email',     href: 'mailto:contact@spikeshowdown.gg' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',  href: '#' },
  { label: 'Terms of Play',   href: '#' },
  { label: 'Code of Conduct', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-xl">

        {/* ── Top Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 footer-top-grid">

          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 footer-brand-col">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 navbar-logo w-fit">
              <div className="navbar-logo-icon">
                <div className="navbar-logo-bg" />
                <svg viewBox="0 0 32 32" className="w-full h-full p-1.5" fill="none">
                  <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" fill="none" stroke="#E63946" strokeWidth="1.5" />
                  <polygon points="16,9 23,13 23,19 16,23 9,19 9,13" fill="#E63946" fillOpacity="0.15" stroke="#E63946" strokeWidth="1" />
                  <rect x="14" y="13" width="4" height="6" rx="1" fill="#E63946" />
                </svg>
              </div>
              <div className="leading-none">
                <span className="navbar-logo-text block">SPIKE SHOWDOWN</span>
                <span className="navbar-logo-sub block">Season 1</span>
              </div>
            </Link>

            <p className="footer-brand-text">
              The premier collegiate Valorant championship. Compete with the best.
              Prove your worth. Become a champion.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 flex-wrap">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="footer-social-link"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>

            {/* Discord CTA box */}
            <div className="footer-discord-box flex items-center justify-between gap-4">
              <div>
                <p className="footer-discord-title">Join the Server</p>
                <p className="footer-discord-subtitle">Stay updated on Discord</p>
              </div>
              <motion.a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="footer-discord-btn"
              >
                Join <ArrowUpRight size={11} />
              </motion.a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Nav Links */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="footer-heading">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="footer-nav-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="footer-heading">Event Info</h4>
            <div className="flex flex-col gap-3">
              <div>
                <p className="footer-info-item-label">Date</p>
                <p className="footer-info-item-val">{TOURNAMENT.date}</p>
              </div>
              <div>
                <p className="footer-info-item-label">Prize Pool</p>
                <p className="footer-info-item-val">{TOURNAMENT.prizePool}</p>
              </div>
              <div>
                <p className="footer-info-item-label">Format</p>
                <p className="footer-info-item-val">Online + LAN Finals</p>
              </div>
              <div>
                <p className="footer-info-item-label">Contact</p>
                <a href="mailto:contact@spikeshowdown.gg" className="footer-info-item-link">
                  contact@spikeshowdown.gg
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 footer-bottom">
          <p className="footer-bottom-text">
            © {year} Spike Showdown. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="footer-legal-link">
                {l.label}
              </a>
            ))}
          </div>

          <p className="footer-signature">
            Built with precision
          </p>
        </div>

      </div>
    </footer>
  );
}
