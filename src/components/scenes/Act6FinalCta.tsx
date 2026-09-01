'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Act6FinalCta.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Act6FinalCta: React.FC = () => {
  const { scene15Cta } = storyContent;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const sectionRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formCardRef.current, {
        scrollTrigger: {
          trigger: formCardRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FF5500', '#10B981', '#0F172A', '#FFAA00'],
    });
  };

  return (
    <section id="book-demo" ref={sectionRef} className={styles.ctaSection}>
      <div className="container">
        <div className={styles.contentBox}>
          <div className={styles.tagPill}>
            <Sparkles size={14} />
            <span>{scene15Cta.badge}</span>
          </div>

          <h2 className={styles.headline}>
            Stop searching. <span className="text-gradient-orange">Start reconciling smarter.</span>
          </h2>

          <p className={styles.subheadline}>{scene15Cta.subheadline}</p>

          <div ref={formCardRef} className={styles.demoFormCard}>
            {submitted ? (
              <div className={styles.successCard}>
                <CheckCircle2 size={36} color="#059669" />
                <h3 className={styles.successTitle}>Walkthrough Request Confirmed</h3>
                <p className={styles.successText}>
                  Thank you, <strong>{formData.name || 'there'}</strong>! Our enterprise solutions team
                  will reach out to <strong>{formData.email}</strong> within 1 business day to tailor your
                  pilot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.inputRow}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.formInput}
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Corporate Work Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={styles.formInput}
                />

                <button type="submit" className={styles.submitButton}>
                  <span>{scene15Cta.primaryButton}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>

          <div className={styles.benefitsList}>
            {scene15Cta.benefits.map((benefit, idx) => (
              <div key={idx} className={styles.benefitItem}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
