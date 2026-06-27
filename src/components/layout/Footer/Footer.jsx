import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Teams', path: '/teams' },
  { label: 'Brackets', path: '/brackets' },
  { label: 'Rules', path: '/rules' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const DISCORD_LINK = 'https://discord.gg/XXXXXXXX';

const TOURNAMENT_INFO = [
  { label: 'Tournament', value: 'SPIKE SHOWDOWN – Season 1' },
  { label: 'Organizer', value: 'IEEE Student Branch SBCE' },
  { label: 'Game', value: 'Valorant' },
  { label: 'Mode', value: 'Online' },
  { label: 'Platform', value: 'PC' },
  { label: 'Region', value: 'Kerala' },
  { label: 'Registration', value: 'Online' },
];

const SOCIALS = [
  { icon: MessageSquare, label: 'Discord',   href: DISCORD_LINK },
  { icon: Instagram,     label: 'Instagram', href: 'https://instagram.com/ieeesbsbce' },
  { icon: Mail,          label: 'Email',     href: 'mailto:ieeesbsbce@gmail.com' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',     href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Code of Conduct',    href: '#' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-xl">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 footer-top-grid">

          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 footer-brand-col">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 navbar-logo w-fit">
              <img src="/logo.png" alt="SPIKE SHOWDOWN Season 1" className="navbar-logo-image" />
            </Link>

            <p className="footer-brand-text">
              SPIKE SHOWDOWN – Season 1 is the flagship online collegiate Valorant tournament organized by IEEE Student Branch SBCE.
              Bringing together talented teams across Kerala to compete, connect, and create unforgettable esports moments.
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
                <p className="footer-discord-title">Join Our Community</p>
                <p className="footer-discord-subtitle">Stay updated with tournament announcements, match schedules, brackets, and exclusive event updates.</p>
              </div>
              <motion.a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="footer-discord-btn"
              >
                Join Discord <ArrowUpRight size={11} />
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
            <h4 className="footer-heading">Tournament Information</h4>
            <div className="flex flex-col gap-3">
              {TOURNAMENT_INFO.map((item) => (
                <div key={item.label}>
                  <p className="footer-info-item-label">{item.label}</p>
                  <p className="footer-info-item-val">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 footer-bottom">
          <p className="footer-bottom-text">
            © 2026 IEEE Student Branch SBCE. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="footer-legal-link">
                {l.label}
              </a>
            ))}
          </div>

          <p className="footer-signature">
            Designed & Developed by IEEE SB SBCE
          </p>
        </div>

      </div>
    </footer>
  );
}
