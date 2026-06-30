import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Crosshair, Instagram, Mail, MessageSquare } from 'lucide-react';
import { PageHeader } from '../About/About';
import { pageTransition } from '../../animations/variants';
import './Contact.css';

const CHANNELS = [
  {
    icon: MessageSquare,
    label: 'Discord Server',
    value: 'discord.gg/spikeshowdown',
    href: 'https://discord.gg/Hjar3Xgu7M',
    color: '#5C7AEA',
  },
  // {
  //   icon: Mail,
  //   label: 'Direct Email',
  //   value: 'support@spikeshowdown.gg',
  //   href: 'mailto:support@spikeshowdown.gg',
  //   color: '#E63946',
  // },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@spikeshowdown.season1',
    href: 'https://instagram.com',
    color: '#E1306C',
  },
];

const SUPPORT_CONTACTS = [
  {
    icon: MessageSquare,
    label: 'Participant Support',
    name: 'Sabarinath',
    handles: ['Registration', 'Match Check-ins', 'Player Queries'],
    href: 'https://wa.me/8590893609',
  },
  {
    icon: Crosshair,
    label: 'Event Coordinator',
    name: 'Vishnu V',
    handles: ['Tournament Coordination', 'Technical Support', 'General Queries'],
    href: 'https://wa.me/9633011978',
  },
];

export default function Contact() {
  return (
    <motion.div
      key="contact"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="Support"
        title="Contact"
        subtitle="Reach the right tournament contact for SPIKE SHOWDOWN Season 1."
      />

      <section className="section-pad">
        <div className="container-xl">
          <div className="contact-page-layout">
            <div className="contact-content-single">
            <div className="flex flex-col gap-8">
              <div>
                <span className="contact-connect-eyebrow">Connect</span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F5F7FA] leading-tight">
                  Official Channels
                </h2>
                <p className="text-[#7D8793] text-sm font-sans mt-4 leading-relaxed">
                  For immediate support regarding live matches or player disputes, use the support contact. You can also follow the official channels for tournament updates.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {CHANNELS.map((chan) => {
                  const Icon = chan.icon;
                  return (
                    <a
                      key={chan.label}
                      href={chan.href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-channel-card"
                    >
                      <div
                        className="contact-channel-icon-wrapper"
                        style={{ backgroundColor: `${chan.color}15`, border: `1px solid ${chan.color}25` }}
                      >
                        <Icon size={20} style={{ color: chan.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="contact-channel-label">{chan.label}</p>
                        <p className="contact-channel-value">{chan.value}</p>
                      </div>
                      <ArrowRight size={16} className="contact-channel-arrow" />
                    </a>
                  );
                })}
              </div>

              <div className="contact-response-card">
                <h3 className="font-display font-bold text-sm text-[#F5F7FA]" style={{ marginBottom: '1rem' }}>
                  Expected Response Times
                </h3>
                <div className="flex flex-col mt-4">
                  <div className="response-time-row">
                    <span className="text-[#7D8793]">WhatsApp Support</span>
                    <span className="response-time-fast">Fastest</span>
                  </div>
                  <div className="response-divider" />
                  <div className="response-time-row">
                    <span className="text-[#7D8793]">Email Queries</span>
                    <span className="response-time-normal">1-2 business days</span>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="contact-support-panel"
            >
              <div>
                <h2 className="contact-support-title">Need Assistance?</h2>
                <p className="contact-support-subtitle">
                  Contact the appropriate organizer for quick support during the tournament.
                </p>
              </div>

              <div className="contact-support-list">
                {SUPPORT_CONTACTS.map(({ icon: Icon, label, name, handles, href }, index) => (
                  <div key={label}>
                    {index > 0 && <div className="contact-support-divider" />}
                    <div className="contact-support-row">
                      <div className="contact-support-icon">
                        <Icon size={22} />
                      </div>

                      <div className="contact-support-body">
                        <p className="contact-support-label">{label}</p>
                        <h3 className="contact-support-name">{name}</h3>

                        <div className="contact-support-handles">
                          <span>Handles:</span>
                          <ul>
                            {handles.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="contact-support-button"
                        >
                          Chat on WhatsApp
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
