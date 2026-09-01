'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, UserCheck, Lock, Users } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Scene12AccessManagement.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene12AccessManagement: React.FC = () => {
  const { scene12Access } = storyContent;

  const sectionRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const dirCardRef = useRef<HTMLDivElement>(null);

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

      gsap.from(dirCardRef.current, {
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

  return (
    <section id="governance" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        <div className={styles.sceneLayout}>
          {/* Narrative & Roles */}
          <div ref={narrativeRef} className={styles.narrativeCol}>
            <div className={styles.tag}>{scene12Access.tag}</div>
            <h2 className={styles.title}>{scene12Access.title}</h2>
            <p className={styles.body}>{scene12Access.body}</p>

            <div className={styles.rolesList}>
              {scene12Access.roles.map((role, idx) => (
                <div key={idx} className={styles.roleCard}>
                  <div className={styles.roleHeader}>
                    <span className={styles.roleTitle}>{role.title}</span>
                    <span className={styles.roleBadge}>{role.badge}</span>
                  </div>
                  <p className={styles.roleDesc}>{role.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Directory Mock */}
          <div ref={dirCardRef} className={styles.directoryCard}>
            <div className={styles.dirHeader}>
              <span className={styles.dirTitle}>Workspace Directory & Permissions</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981' }}>MAKER-CHECKER PROTOCOL</span>
            </div>

            <div className={styles.dirStats}>
              <div className={styles.statBlock}>
                <span className={styles.statNum}>2</span>
                <span className={styles.statLbl}>Active Directory</span>
              </div>
              <div className={styles.statBlock}>
                <span className={styles.statNum}>1</span>
                <span className={styles.statLbl}>Admin (Checkers)</span>
              </div>
              <div className={styles.statBlock}>
                <span className={styles.statNum}>1</span>
                <span className={styles.statLbl}>Users (Makers)</span>
              </div>
            </div>

            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>WORKSPACE MEMBER</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th>AUTHORITY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.userNameCol}>
                      <div className={styles.userAvatar}>DB</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>Devid Bisen</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>devidbisen84@gmail.com</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#FF5500' }}>Owner Admin</td>
                  <td>
                    <span className={styles.statusPillActive}>• Active</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748B' }}>Full Authority</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.userNameCol}>
                      <div className={styles.userAvatar} style={{ background: '#E0E7FF', color: '#3730A3' }}>
                        DU
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>Devid (User)</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>devidbisen.sam@gmail.com</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#475569' }}>User (Maker)</td>
                  <td>
                    <span className={styles.statusPillActive}>• Active</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: 600 }}>
                    ERP Push Restricted
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
