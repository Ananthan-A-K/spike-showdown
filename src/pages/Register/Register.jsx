import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Users, CheckCircle2, User, ShieldAlert, ArrowRight, Shield } from 'lucide-react';
import { PageHeader } from '../About/About';
import { pageTransition } from '../../animations/variants';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    teamName: '',
    teamTag: '',
    college: '',
    captainName: '',
    captainEmail: '',
    captainDiscord: '',
    player2: '',
    player3: '',
    player4: '',
    player5: '',
    sub1: '',
    sub2: '',
    agreeToRules: false,
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [registeredData, setRegisteredData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToRules) {
      alert('You must agree to the tournament rules to register.');
      return;
    }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setRegisteredData({ ...formData });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

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
        subtitle="Sign up for SPIKE SHOWDOWN Season 1. Spaces are limited to 16 teams. Complete all sections."
      />

      <section className="section-pad">
        <div className="container-xl">
          
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="register-success-box"
              >
                <div className="register-success-icon">
                  <CheckCircle2 size={38} />
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F5F7FA] leading-tight">
                  Registration Received
                </h2>
                <p className="text-[#7D8793] text-sm font-sans mt-4 leading-relaxed">
                  Your application for SPIKE SHOWDOWN Season 1 has been submitted successfully. Our tournament coordinators will verify your details and college affiliation.
                </p>

                <div className="register-receipt-card">
                  <p className="register-receipt-title">Registration Receipt</p>
                  
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#7D8793]">Team Name</span>
                      <strong className="text-[#F5F7FA] font-display">{registeredData?.teamName} [{registeredData?.teamTag?.toUpperCase()}]</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7D8793]">College / University</span>
                      <span className="text-[#B6BEC8]">{registeredData?.college}</span>
                    </div>
                    <hr style={{ margin: '0.5rem 0' }} />
                    <div className="flex justify-between">
                      <span className="text-[#7D8793]">Team Captain</span>
                      <span className="text-[#B6BEC8]">{registeredData?.captainName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7D8793]">Discord ID</span>
                      <span className="text-[#B6BEC8] font-mono">{registeredData?.captainDiscord}</span>
                    </div>
                    <hr style={{ margin: '0.5rem 0' }} />
                    <div className="flex flex-col gap-2">
                      <span className="text-[#7D8793] block mb-2 font-medium">Roster Confirmed</span>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[#B6BEC8] font-mono text-xs">
                        <div>1. {registeredData?.captainName} (C)</div>
                        <div>2. {registeredData?.player2}</div>
                        <div>3. {registeredData?.player3}</div>
                        <div>4. {registeredData?.player4}</div>
                        <div>5. {registeredData?.player5}</div>
                        {registeredData?.sub1 && <div>Sub: {registeredData?.sub1}</div>}
                        {registeredData?.sub2 && <div>Sub: {registeredData?.sub2}</div>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="https://discord.gg"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary px-8"
                  >
                    Join Official Discord
                  </a>
                  <a
                    href="/"
                    className="btn btn-outline px-8"
                  >
                    Back to Home
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="max-w-4xl" style={{ margin: '0 auto' }}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                  
                  {/* Step 1: Team details */}
                  <div className="register-step-box">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="register-step-icon">
                        <Shield size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#F5F7FA]">1. Team Information</h3>
                        <p className="text-[#7D8793] text-xs font-sans mt-1">Basic identity and college registration.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2" style={{ gridColumn: 'span 2 / span 2' }}>
                        <label htmlFor="teamName" className="input-label">Team Name *</label>
                        <input
                          type="text"
                          id="teamName"
                          name="teamName"
                          required
                          placeholder="e.g. Phantom Unit"
                          value={formData.teamName}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div>
                        <label htmlFor="teamTag" className="input-label">Abbreviation / Tag *</label>
                        <input
                          type="text"
                          id="teamTag"
                          name="teamTag"
                          required
                          maxLength={4}
                          placeholder="e.g. PHU"
                          value={formData.teamTag}
                          onChange={handleChange}
                          className="input-field uppercase font-mono"
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div className="md:col-span-3" style={{ gridColumn: 'span 3 / span 3' }}>
                        <label htmlFor="college" className="input-label">College / University Name *</label>
                        <input
                          type="text"
                          id="college"
                          name="college"
                          required
                          placeholder="e.g. Indian Institute of Technology, Bombay"
                          value={formData.college}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Team Captain Contact */}
                  <div className="register-step-box">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="register-step-icon">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#F5F7FA]">2. Captain Contact Details</h3>
                        <p className="text-[#7D8793] text-xs font-sans mt-1">Primary liaison for scheduling and verification.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="captainName" className="input-label">Captain Full Name *</label>
                        <input
                          type="text"
                          id="captainName"
                          name="captainName"
                          required
                          placeholder="e.g. Arjun Mehta"
                          value={formData.captainName}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div>
                        <label htmlFor="captainEmail" className="input-label">Institutional Email *</label>
                        <input
                          type="email"
                          id="captainEmail"
                          name="captainEmail"
                          required
                          placeholder="arjun@iitb.ac.in"
                          value={formData.captainEmail}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div>
                        <label htmlFor="captainDiscord" className="input-label">Discord Username *</label>
                        <input
                          type="text"
                          id="captainDiscord"
                          name="captainDiscord"
                          required
                          placeholder="e.g. arjun#1234"
                          value={formData.captainDiscord}
                          onChange={handleChange}
                          className="input-field font-mono"
                          disabled={status === 'submitting'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Player Roster */}
                  <div className="register-step-box">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="register-step-icon">
                        <Users size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#F5F7FA]">3. Active Roster (5 Players)</h3>
                        <p className="text-[#7D8793] text-xs font-sans mt-1">List full legal names matching college IDs.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="input-label">Player 1 (Captain) *</label>
                        <input
                          type="text"
                          value={formData.captainName}
                          disabled
                          placeholder="Auto-filled from captain name"
                          className="input-field opacity-60 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label htmlFor="player2" className="input-label">Player 2 Full Name *</label>
                        <input
                          type="text"
                          id="player2"
                          name="player2"
                          required
                          placeholder="Active player name"
                          value={formData.player2}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div>
                        <label htmlFor="player3" className="input-label">Player 3 Full Name *</label>
                        <input
                          type="text"
                          id="player3"
                          name="player3"
                          required
                          placeholder="Active player name"
                          value={formData.player3}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div>
                        <label htmlFor="player4" className="input-label">Player 4 Full Name *</label>
                        <input
                          type="text"
                          id="player4"
                          name="player4"
                          required
                          placeholder="Active player name"
                          value={formData.player4}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div className="md:col-span-2" style={{ gridColumn: 'span 2 / span 2' }}>
                        <label htmlFor="player5" className="input-label">Player 5 Full Name *</label>
                        <input
                          type="text"
                          id="player5"
                          name="player5"
                          required
                          placeholder="Active player name"
                          value={formData.player5}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Substitutes (Optional) */}
                  <div className="register-step-box">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="register-step-icon">
                        <Award size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#F5F7FA]">4. Substitute Players (Optional)</h3>
                        <p className="text-[#7D8793] text-xs font-sans mt-1">You can register up to 2 substitutes.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="sub1" className="input-label">Substitute 1 Name</label>
                        <input
                          type="text"
                          id="sub1"
                          name="sub1"
                          placeholder="Optional substitute player"
                          value={formData.sub1}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div>
                        <label htmlFor="sub2" className="input-label">Substitute 2 Name</label>
                        <input
                          type="text"
                          id="sub2"
                          name="sub2"
                          placeholder="Optional substitute player"
                          value={formData.sub2}
                          onChange={handleChange}
                          className="input-field"
                          disabled={status === 'submitting'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submission and Terms */}
                  <div className="register-step-box">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        id="agreeToRules"
                        name="agreeToRules"
                        required
                        checked={formData.agreeToRules}
                        onChange={handleChange}
                        className="register-checkbox"
                        disabled={status === 'submitting'}
                      />
                      <label htmlFor="agreeToRules" className="register-checkbox-label">
                        I hereby confirm that <strong className="text-[#B6BEC8]">all registered roster members are currently enrolled</strong> students of the specified college and hold active student IDs. We agree to abide by the official SPIKE SHOWDOWN tournament rules, including fair play guidelines and code of conduct.
                      </label>
                    </div>

                    <div className="register-submit-container">
                      <button
                        type="submit"
                        className="btn btn-primary w-full justify-center gap-2 cursor-pointer"
                        disabled={status === 'submitting'}
                      >
                        {status === 'submitting' ? (
                          <>
                            <div className="contact-spinner" />
                            <span>Processing Registration...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Registration</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </motion.div>
  );
}
