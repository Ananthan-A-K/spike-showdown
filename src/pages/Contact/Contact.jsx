import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle2, AlertTriangle, ArrowRight, Instagram } from 'lucide-react';
import { PageHeader } from '../About/About';
import { pageTransition } from '../../animations/variants';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <motion.div
      key="contact"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="Support"
        title="Get in Touch"
        subtitle="Have questions about registration, scheduling, rules, or sponsorship? Our admin team is here to assist."
      />

      <section className="section-pad">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" style={{ gap: '4rem' }}>
            
            {/* Left: Info panel & social channels */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="contact-connect-eyebrow">Connect</span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F5F7FA] leading-tight">
                  Official Channels
                </h2>
                <p className="text-[#7D8793] text-sm font-sans mt-4 leading-relaxed">
                  For immediate support regarding live matches or player disputes, please join our Discord server and create an assistance ticket. For inquiries regarding sponsorships or partnerships, feel free to email us directly.
                </p>
              </div>

              {/* Channels Grid */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: MessageSquare,
                    label: 'Discord Server',
                    value: 'discord.gg/spikeshowdown',
                    href: 'https://discord.gg',
                    color: '#5C7AEA',
                  },
                  {
                    icon: Mail,
                    label: 'Direct Email',
                    value: 'support@spikeshowdown.gg',
                    href: 'mailto:support@spikeshowdown.gg',
                    color: '#E63946',
                  },
                  {
                    icon: Instagram,
                    label: 'Instagram',
                    value: '@spikeshowdown.season1',
                    href: 'https://instagram.com',
                    color: '#E1306C',
                  },
                ].map((chan) => {
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
                <h3 className="font-display font-bold text-sm text-[#F5F7FA]" style={{ marginBottom: '1rem' }}>Expected Response Times</h3>
                <div className="flex flex-col mt-4">
                  <div className="response-time-row">
                    <span className="text-[#7D8793]">Discord Tickets</span>
                    <span className="response-time-fast">Within 1 hour</span>
                  </div>
                  <div className="response-divider" />
                  <div className="response-time-row">
                    <span className="text-[#7D8793]">Email Queries</span>
                    <span className="response-time-normal">1–2 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
              <div className="contact-form-box">
                
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 className="contact-form-title">Send a Message</h3>
                  <p className="contact-form-desc">Use the contact form below to drop us a line.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="input-label">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="e.g. Arjun Mehta"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        disabled={status === 'submitting' || status === 'success'}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="input-label">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="arjun@college.edu"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        disabled={status === 'submitting' || status === 'success'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="input-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      disabled={status === 'submitting' || status === 'success'}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="input-label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field"
                      style={{ resize: 'none' }}
                      disabled={status === 'submitting' || status === 'success'}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="contact-alert-success"
                      >
                        <CheckCircle2 size={18} style={{ marginTop: '0.125rem' }} className="flex-shrink-0" />
                        <div>
                          <p className="font-display font-bold text-sm">Message Sent Successfully</p>
                          <p className="contact-alert-details">Thank you! Our coordinators will contact you soon.</p>
                        </div>
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="contact-alert-error"
                      >
                        <AlertTriangle size={18} style={{ marginTop: '0.125rem' }} className="flex-shrink-0" />
                        <div>
                          <p className="font-display font-bold text-sm">Incomplete Fields</p>
                          <p className="contact-alert-details">Please fill in all required fields marked with * before submitting.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center gap-2 mt-4"
                    disabled={status === 'submitting' || status === 'success'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="contact-spinner" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
}
