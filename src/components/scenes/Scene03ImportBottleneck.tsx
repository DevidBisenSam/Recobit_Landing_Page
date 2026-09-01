'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, FileSpreadsheet, FileCode, Lock, AlertCircle } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Scene03ImportBottleneck.module.css';

gsap.registerPlugin(ScrollTrigger);

const formatCards = [
  {
    icon: <FileText size={22} />,
    iconClass: styles.pdfIcon,
    title: 'Multi-Bank PDFs',
    desc: 'Unstructured statement tables, embedded scanned text, and arbitrary column orders across banks.',
    friction: 'Requires manual copy-paste & OCR re-checking',
  },
  {
    icon: <FileSpreadsheet size={22} />,
    iconClass: styles.excelIcon,
    title: 'Complex Spreadsheets',
    desc: 'Multi-sheet workbooks, merged cells, custom currency symbols, and broken formula rows.',
    friction: 'Prone to formula breaks and dropped lines',
  },
  {
    icon: <FileCode size={22} />,
    iconClass: styles.csvIcon,
    title: 'CSV & MT940 Feeds',
    desc: 'Date formatting discrepancies (DD/MM/YYYY vs MM/DD/YYYY) breaking direct ERP uploads.',
    friction: 'Column mapping errors cause silent failure',
  },
  {
    icon: <Lock size={22} />,
    iconClass: styles.lockIcon,
    title: 'Protected Statements',
    desc: 'Encrypted daily statement emails with separate passwords needing individual decryption.',
    friction: 'Manual daily credential management',
  },
];

export const Scene03ImportBottleneck: React.FC = () => {
  const { scene03Import } = storyContent;
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.formatCard}`, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        <div className={styles.sceneHeader}>
          <div className={styles.tag}>{scene03Import.tag}</div>
          <h2 className={styles.title}>{scene03Import.title}</h2>
          <p className={styles.body}>{scene03Import.body}</p>
        </div>

        <div ref={cardsRef} className={styles.formatGrid}>
          {formatCards.map((card, idx) => (
            <div key={idx} className={styles.formatCard}>
              <div className={`${styles.iconWrapper} ${card.iconClass}`}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
              <div className={styles.frictionBadge}>
                <AlertCircle size={13} />
                <span>{card.friction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
