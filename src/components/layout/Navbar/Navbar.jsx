import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useScrollPosition } from '../../../hooks';
import ieeeLogo from '../../../assets/ieee-logo.png';
import './Navbar.css';

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

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();
  const scrollY                   = useScrollPosition();
  const isScrolled                = scrollY > 40;
  const closeMenu                 = useCallback(() => setMenuOpen(false), []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 navbar ${
          isScrolled ? 'navbar-scrolled' : 'navbar-transparent'
        } ${menuOpen ? 'navbar-menu-open' : ''}`}
      >
        <div className="container-xl">
          <div className="navbar-inner">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 navbar-logo">
              <img src="/logo.png" alt="SPIKE SHOWDOWN Season 1" className="navbar-logo-image" />
              <div className="navbar-logo-divider" />
              <img src={ieeeLogo} alt="IEEE SB SBCE" className="navbar-ieee-logo" />
            </Link>

            {/* ── Desktop Links ── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`navbar-desktop-link ${
                      active ? 'navbar-desktop-link-active' : 'navbar-desktop-link-inactive'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-bg"
                        className="navbar-link-active-indicator"
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className="navbar-link-label">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/register"
                className="btn btn-primary btn-sm flex items-center gap-2"
              >
                Register Team
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="lg:hidden navbar-hamburger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
                  : <motion.span key="m" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
                }
              </AnimatePresence>
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden navbar-mobile-drawer flex flex-col"
            id="mobile-navigation"
          >
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="container-xl navbar-mobile-panel"
            >
              {NAV_LINKS.map((link, i) => {
                const active = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className={`navbar-mobile-link ${
                        active ? 'navbar-mobile-link-active' : 'navbar-mobile-link-inactive'
                      }`}
                    >
                      {link.label}
                      <ChevronRight size={20} className="navbar-mobile-chevron" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                className="navbar-mobile-cta"
              >
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="btn btn-primary w-full justify-center"
                >
                  Register Your Team
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
