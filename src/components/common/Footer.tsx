'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.glowTop} />
      <div className="container">
        <div className={styles.compactFooterRow}>
          {/* Brand */}
          <div className={styles.brandSide}>
            <div className={styles.logoMark}>R</div>
            <span className={styles.brandName}>
              Reco<span className={styles.brandSuffix}>bit</span>
            </span>
            <span className={styles.tagline}>• AI-Powered Bank Reconciliation</span>
          </div>

          {/* Quick Nav */}
          <ul className={styles.footerNav}>
            <li><a href="#act-1-chaos">The Problem</a></li>
            <li><a href="#act-2-mapping">Auto-Matching</a></li>
            <li><a href="#act-3-reconciliation">Reconciliation</a></li>
            <li><a href="#deployment-modes">Deployments</a></li>
            <li><a href="#act-4-command">AI Intelligence</a></li>
            <li><a href="#book-demo">Request Demo</a></li>
          </ul>
        </div>

        {/* Bottom Strip */}
        <div className={styles.bottomStrip}>
          <div className={styles.badgesGroup}>
            <span className={styles.badgePill}>
              <ShieldCheck size={12} />
              <span>Maker-Checker Compliant</span>
            </span>
            <span className={styles.badgePill}>
              <Lock size={12} />
              <span>256-Bit Encrypted</span>
            </span>
          </div>

          <div className={styles.legalLinks}>
            <span>© 2026 RecoBit Technologies Inc.</span>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
