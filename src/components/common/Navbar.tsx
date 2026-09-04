'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Why RecoBit', href: '#product-showcase' },
  { label: 'Auto-Matching', href: '#auto-matching' },
  { label: 'Reconciliation', href: '#auto-matching' },
  { label: 'Setup Options', href: '#deployment-modes' },
  { label: 'Maker-Checker & Audit', href: '#act-5-trust' },
];

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

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

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

        {/* Center Links */}
        <div className={styles.centerNav}>
          <nav>
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.href} className={styles.navItem}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* CTA Group */}
        <div className={styles.ctaGroup}>
          <a href="#auto-matching" className={styles.secondaryBtn}>
            See How It Works
          </a>
          <a href="#book-demo" className={styles.primaryBtn}>
            <span>Book A Free Demo</span>
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.mobileNavItem}>
                <a href={link.href} onClick={handleLinkClick}>
                  <span>{link.label}</span>
                  <ChevronRight size={18} color="#FF5500" />
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileDrawerFooter}>
            <a href="#book-demo" className={styles.mobileDrawerCta} onClick={handleLinkClick}>
              <span>Schedule Enterprise Walkthrough</span>
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
