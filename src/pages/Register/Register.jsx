import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ClipboardCheck, Shield } from 'lucide-react';
import { PageHeader } from '../About/About';
import { pageTransition } from '../../animations/variants';
import { REGISTRATION_FORM_URL } from '../../config/registration';
import './Register.css';

export default function Register() {
  return (
    <motion.div
      key="register"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="Registration"
        title="Register Your Team"
        subtitle="Team registration is handled through the official Google Form."
      />

      <section className="section-pad">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="register-link-card"
          >
            <div className="register-step-icon">
              <ClipboardCheck size={22} />
            </div>

            <div className="register-link-copy">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F5F7FA] leading-tight">
                Complete Registration
              </h2>
              <p className="register-link-text">
                Open the official form, enter your team details, and submit your roster for SPIKE SHOWDOWN Season 1.
              </p>
            </div>

            <div className="register-link-actions">
              <a
                href={REGISTRATION_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary register-google-form-btn"
              >
                Open Google Form
                <ArrowUpRight size={15} />
              </a>

              <div className="register-link-note">
                <Shield size={14} />
                <span>Use your captain contact details in the form.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
