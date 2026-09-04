'use client';

import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Subtle top hairline */}
      <div className={styles.glowTop} />

      <div className={styles.footerInner}>
        {/* LEFT: Clean Brand & Category */}
        <div className={styles.brandSide}>
          <div className={styles.logoMark}>R</div>
          <div className={styles.brandTextGroup}>
            <span className={styles.brandName}>
              Reco<span className={styles.brandSuffix}>bit</span>
            </span>
            <span className={styles.tagline}>Automated Bank Reconciliation</span>
          </div>
        </div>

        {/* CENTER: Generic Professional Navigation & Compliance */}
        <nav className={styles.centerNav} aria-label="Footer links">
          <a href="#product-showcase" className={styles.navLink}>Product</a>
          <span className={styles.navDot}>•</span>
          <a href="#deployment-modes" className={styles.navLink}>Deployments</a>
          <span className={styles.navDot}>•</span>
          <a href="#auto-matching" className={styles.navLink}>5-Way Engine</a>
          <span className={styles.navDot}>•</span>
          <a href="#book-demo" className={styles.navLink}>Security</a>
          <span className={styles.navDot}>•</span>
          <a href="#book-demo" className={styles.navLink}>Privacy Policy</a>
          <span className={styles.navDot}>•</span>
          <a href="#book-demo" className={styles.navLink}>Terms</a>
        </nav>

        {/* RIGHT: Professional Contact & Copyright */}
        <div className={styles.rightSide}>
          <div className={styles.contactRow}>
            <a href="mailto:contact@recobit.in" className={styles.contactLink}>
              contact@recobit.in
            </a>
            <span className={styles.contactDivider}>•</span>
            <span className={styles.liveStatus}>
              <span className={styles.liveDot} />
              <span>Systems Operational</span>
            </span>
          </div>
          <span className={styles.copy}>© 2026 RecoBit Technologies, Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
