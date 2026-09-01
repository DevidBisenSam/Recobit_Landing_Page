'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, FileText, Monitor, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import styles from './DeploymentModesScene.module.css';

gsap.registerPlugin(ScrollTrigger);

const deploymentModes = [
  {
    id: 'mode-cloud-connector',
    icon: Globe,
    title: '1. Web App + Local Connector',
    subtitle: 'Cloud Intelligence connected to your ERP',
    badge: 'MOST POPULAR',
    description:
      'Access RecoBit from any modern browser. A lightweight local connector runs quietly on your LAN to sync with Tally Prime / ERP without exposing ports or requiring complex VPNs.',
    bullets: [
      'Zero firewall modifications or public IP requirements',
      'Real-time bi-directional voucher sync with Tally Prime',
      'Multi-user access with Maker-Checker controls anywhere',
    ],
  },
  {
    id: 'mode-file-based',
    icon: FileText,
    title: '2. File In / File Out',
    subtitle: 'Instant Statement Ingestion to Clean Excel/PDF',
    badge: 'ZERO SETUP',
    description:
      'Drop your raw bank PDF or multi-sheet Excel statements into RecoBit. Our hybrid AI parses narrations, aligns ledgers, and gives you clean, audit-ready reconciled Excel files in seconds.',
    bullets: [
      'No ERP connection needed — start in under 60 seconds',
      'Handles password-protected PDFs & scanned bank tables',
      'Instant export to standardized Excel, CSV, or formatted PDF',
    ],
  },
  {
    id: 'mode-desktop-app',
    icon: Monitor,
    title: '3. Reco Desktop Application',
    subtitle: 'Native On-Premises Standalone Performance',
    badge: 'AIR-GAPPED & SECURE',
    description:
      'A full native desktop application built for high-security enterprise environments, internal audit teams, and offline bookkeeping that keeps 100% of financial data strictly inside your local workstation.',
    bullets: [
      'Runs completely offline on Windows / workstation PCs',
      'Ultra-fast local processing of 100,000+ transaction batches',
      'Strict internal compliance & zero external data exposure',
    ],
  },
];

export const DeploymentModesScene: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.modeCard}`, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="deployment-modes" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sceneHeader}>
          <div className={styles.actTag}>
            <Cpu size={15} />
            <span>FLEXIBLE DEPLOYMENT</span>
          </div>
          <h2 className={styles.title}>
            3 ways to run RecoBit. <span className="text-gradient-orange">Zero IT friction.</span>
          </h2>
          <p className={styles.body}>
            Whether you need modern cloud collaboration with an ERP connector, fast file-in/file-out reconciliation,
            or a dedicated native desktop application for strict security — RecoBit adapts to your workflow.
          </p>
        </div>

        {/* 3 Mode Cards */}
        <div ref={cardsRef} className={styles.modesGrid}>
          {deploymentModes.map((mode, idx) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className={`${styles.modeCard} ${idx === 0 ? styles.modeCardActive : ''}`}
              >
                <div className={styles.modeTop}>
                  <div className={styles.modeHeaderRow}>
                    <div className={styles.modeIconWrap}>
                      <Icon size={22} />
                    </div>
                    <span className={styles.modeBadge}>{mode.badge}</span>
                  </div>

                  <div className={styles.modeTitleGroup}>
                    <h3 className={styles.modeTitle}>{mode.title}</h3>
                    <span className={styles.modeSubtitle}>{mode.subtitle}</span>
                  </div>

                  <p className={styles.modeDescription}>{mode.description}</p>

                  <ul className={styles.featureBullets}>
                    {mode.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={styles.bulletItem}>
                        <CheckCircle2 size={15} className={styles.bulletIcon} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.modeFooter}>
                  <a href="#book-demo" className={styles.ctaPill}>
                    <span>Explore this setup</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
