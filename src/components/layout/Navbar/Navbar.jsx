import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAV_LINKS } from '../../../constants/data';
import { useScrollPosition } from '../../../hooks';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();
  const scrollY                   = useScrollPosition();
  const isScrolled                = scrollY > 40;

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 navbar ${
          isScrolled ? 'navbar-scrolled' : 'navbar-transparent'
        }`}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-[88px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 navbar-logo">
              <div className="navbar-logo-icon">
                <div className="navbar-logo-bg" />
                <svg viewBox="0 0 32 32" className="w-full h-full p-1.5" fill="none">
                  <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" fill="none" stroke="#E63946" strokeWidth="1.5" />
                  <polygon points="16,9 23,13 23,19 16,23 9,19 9,13" fill="#E63946" fillOpacity="0.15" stroke="#E63946" strokeWidth="1" />
                  <rect x="14" y="13" width="4" height="6" rx="1" fill="#E63946" />
                </svg>
              </div>

              <div className="leading-none">
                <span className="navbar-logo-text block">
                  SPIKE SHOWDOWN
                </span>
                <span className="navbar-logo-sub block">
                  Season 1
                </span>
              </div>
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
                className="btn btn-primary flex items-center gap-2 px-6"
              >
                Register Team
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden navbar-hamburger"
              aria-label="Toggle menu"
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
            className="fixed inset-0 z-40 lg:hidden navbar-mobile-drawer flex flex-col pt-[88px]"
          >
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="container-xl flex flex-col gap-1 py-8 flex-1 overflow-y-auto"
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
                      className={`navbar-mobile-link ${
                        active ? 'navbar-mobile-link-active' : 'navbar-mobile-link-inactive'
                      }`}
                    >
                      {link.label}
                      <ChevronRight size={20} className="text-[#2D3440]" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                className="mt-8"
              >
                <Link
                  to="/register"
                  className="btn btn-primary w-full justify-center text-sm py-4"
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
