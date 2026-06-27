import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Zap, Flag } from 'lucide-react';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import { containerVariants, itemVariants } from '../../../../animations/variants';
import './SchedulePreview.css';

const TYPE_CONFIG = {
  milestone: { icon: Zap,      color: '#4F7CAC', bg: 'rgba(79,124,172,0.1)',   border: 'rgba(79,124,172,0.2)' },
  deadline:  { icon: Flag,     color: '#E63946', bg: 'rgba(230,57,70,0.1)',    border: 'rgba(230,57,70,0.2)' },
  match:     { icon: Calendar, color: '#22C55E', bg: 'rgba(34,197,94,0.1)',    border: 'rgba(34,197,94,0.2)' },
  final:     { icon: Clock,    color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)' },
};

export default function SchedulePreview({ schedule }) {
  const previewEvents = schedule.slice(0, 4);

  return (
    <section className="section-pad schedule-preview-section">
      <div className="container-xl">

        <div className="schedule-header">
          <SectionHeading
            eyebrow="Tournament Schedule"
            title={<>Key dates &<br />milestones</>}
          />
          <Link
            to="/schedule"
            className="btn btn-outline w-fit flex items-center gap-2"
            style={{ fontSize: '0.65rem', padding: '0.75rem 1.5rem' }}
          >
            Full Schedule
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="schedule-timeline"
        >
          {/* Vertical line */}
          <div className="schedule-timeline-line" />

          <div className="schedule-events">
            {previewEvents.map((event, i) => {
              const cfg = TYPE_CONFIG[event.type] || TYPE_CONFIG.milestone;
              const Icon = cfg.icon;
              const isRight = i % 2 === 1;

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`schedule-event-row ${isRight ? 'schedule-event-row-right' : 'schedule-event-row-left'}`}
                >
                  {/* Dot */}
                  <div className="schedule-dot-container">
                    <div
                      className="schedule-dot"
                      style={{ background: cfg.bg, borderColor: cfg.border }}
                    >
                      <Icon size={16} style={{ color: cfg.color }} />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="schedule-preview-card-wrapper">
                    <div className="schedule-preview-card">
                      <div className="schedule-preview-card-meta">
                        <span className="schedule-preview-card-date" style={{ color: cfg.color }}>
                          {event.date}
                        </span>
                        <span className="schedule-preview-card-sep">·</span>
                        <span className="schedule-preview-card-time">
                          {event.time}
                        </span>
                      </div>
                      <h3 className="schedule-preview-card-title">
                        {event.event}
                      </h3>
                      <p className="schedule-preview-card-desc">
                        {event.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* More indicator */}
        <div className="mt-12 text-center">
          <Link to="/schedule" className="schedule-more-link">
            View {schedule.length - 4} more events
            <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
}
