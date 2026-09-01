'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Brand */}
        <Link href="/" className={styles.brandLink} aria-label="RecoBit Home">
          <div className={styles.logoMark}>R</div>
          <span className={styles.brandName}>
            Reco<span className={styles.brandSuffix}>bit</span>
          </span>
        </Link>

        {/* Center Links & Status */}
        <div className={styles.centerNav}>
          <div className={styles.statusIndicator}>
            <div className={styles.pulseDot} />
            <span>AI MATCHING ACTIVE</span>
          </div>

          <nav>
            <ul className={styles.navLinks}>
              <li className={styles.navItem}>
                <a href="#the-problem">The Problem</a>
              </li>
              <li className={styles.navItem}>
                <a href="#top-10-matching">Auto-Matching</a>
              </li>
              <li className={styles.navItem}>
                <a href="#reconciliation">Reconciliation</a>
              </li>
              <li className={styles.navItem}>
                <a href="#ai-agent">AI Agent</a>
              </li>
              <li className={styles.navItem}>
                <a href="#audit-trust">Audit Trail</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* CTA Group */}
        <div className={styles.ctaGroup}>
          <a href="#reconciliation" className={styles.secondaryBtn}>
            Live Proof
          </a>
          <a href="#book-demo" className={styles.primaryBtn}>
            <span>Book Enterprise Demo</span>
            <ArrowRight size={15} />
          </a>
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};
