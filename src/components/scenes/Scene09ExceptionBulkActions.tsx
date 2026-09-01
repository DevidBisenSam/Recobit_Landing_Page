'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, CheckCircle2, Zap, ArrowRight, Check } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Scene09ExceptionBulkActions.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene09ExceptionBulkActions: React.FC = () => {
  const { scene09BulkExceptions } = storyContent;
  const [resolvedGroups, setResolvedGroups] = useState<Record<number, boolean>>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const bulkCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(narrativeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(bulkCardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleResolveGroup = (idx: number) => {
    setResolvedGroups((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <section id="bulk-exceptions" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        <div className={styles.sceneLayout}>
          {/* Narrative Column */}
          <div ref={narrativeRef} className={styles.narrativeCol}>
            <div className={styles.tag}>{scene09BulkExceptions.tag}</div>
            <h2 className={styles.title}>{scene09BulkExceptions.title}</h2>
            <p className={styles.body}>{scene09BulkExceptions.body}</p>

            <div className={styles.workflowBadge}>
              <Zap size={18} />
              <span>Shift from searching every row to approving categorized batches</span>
            </div>
          </div>

          {/* Interactive Bulk Grouping Card */}
          <div ref={bulkCardRef} className={styles.bulkCard}>
            <div className={styles.bulkHeader}>
              <span className={styles.bulkTitle}>Intelligent Exception Clusters</span>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                3 CLUSTERS IDENTIFIED
              </span>
            </div>

            <div className={styles.groupList}>
              {scene09BulkExceptions.groups.map((group, idx) => {
                const isResolved = resolvedGroups[idx];

                return (
                  <div key={idx} className={styles.groupItem}>
                    <div className={styles.groupInfo}>
                      <span className={styles.groupName}>{group.title}</span>
                      <span className={styles.groupCount}>Affecting {group.impact}</span>
                    </div>

                    {isResolved ? (
                      <div className={styles.resolvedState}>
                        <Check size={14} />
                        <span>All Resolved</span>
                      </div>
                    ) : (
                      <button
                        className={styles.bulkActionBtn}
                        onClick={() => handleResolveGroup(idx)}
                      >
                        <span>{group.action}</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
