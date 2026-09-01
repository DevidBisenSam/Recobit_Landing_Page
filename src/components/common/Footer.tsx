'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Server, ArrowRight } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { footer } = storyContent;

  return (
    <footer className={styles.footer}>
      <div className={styles.glowTop} />
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand & Security */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <div className={styles.logoMark}>R</div>
              <span className={styles.brandName}>
                Reco<span className={styles.brandSuffix}>bit</span>
              </span>
            </div>
            <p className={styles.brandDesc}>{footer.tagline}</p>
            
            <div className={styles.securityBadges}>
              <div className={styles.badge}>
                <ShieldCheck size={14} color="#10B981" />
                <span>Maker-Checker Audit</span>
              </div>
              <div className={styles.badge}>
                <Lock size={14} color="#10B981" />
                <span>AES-256 Encrypted</span>
              </div>
              <div className={styles.badge}>
                <Server size={14} color="#10B981" />
                <span>On-Premise Rust Agent</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className={styles.colTitle}>Platform</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#the-problem">The Ledger Bottleneck</a>
              </li>
              <li>
                <a href="#top-10-matching">Top 10 Smart Mapper</a>
              </li>
              <li>
                <a href="#reconciliation">Hybrid Reconciliation</a>
              </li>
              <li>
                <a href="#bulk-exceptions">Bulk Exception Triage</a>
              </li>
              <li>
                <a href="#dashboard-visibility">Central Dashboard</a>
              </li>
            </ul>
          </div>

          {/* Enterprise Governance */}
          <div>
            <h4 className={styles.colTitle}>Enterprise</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#access-management">Maker-Checker Roles</a>
              </li>
              <li>
                <a href="#ai-agent">Domain AI Agent</a>
              </li>
              <li>
                <a href="#audit-trust">Immutable Audit Logs</a>
              </li>
              <li>
                <a href="#book-demo">Request Enterprise Demo</a>
              </li>
            </ul>
          </div>

          {/* Direct Newsletter / Demo */}
          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>Stay Ahead</h4>
            <p className={styles.newsletterText}>
              Get quarterly financial close insights and reconciliation automation benchmarks.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className={styles.inputGroup}>
              <input
                type="email"
                placeholder="work.email@company.com"
                className={styles.inputField}
                required
              />
              <button type="submit" className={styles.submitBtn}>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>{footer.copyright}</div>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security Overview</a>
            <a href="#">SOC2 Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
