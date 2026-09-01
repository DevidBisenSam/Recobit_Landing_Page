'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Lock, Sparkles } from 'lucide-react';
import styles from './ProductVideoFrame.module.css';

interface ProductVideoFrameProps {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  urlPath?: string;
  autoPlayInView?: boolean;
  className?: string;
}

export const ProductVideoFrame: React.FC<ProductVideoFrameProps> = ({
  src,
  poster,
  title = 'RecoBit Enterprise Engine',
  subtitle,
  badge = 'REAL PRODUCT PROOF',
  urlPath = 'app.recobit.fi/reconcile',
  autoPlayInView = true,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!autoPlayInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {
                // Auto-play was prevented
                setIsPlaying(false);
              });
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [autoPlayInView]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div ref={containerRef} className={`${styles.frameWrapper} ${className}`}>
      {/* Browser Mock Top Header */}
      <div className={styles.browserHeader}>
        <div className={styles.windowControls}>
          <div className={`${styles.dot} ${styles.dotRed}`} />
          <div className={`${styles.dot} ${styles.dotYellow}`} />
          <div className={`${styles.dot} ${styles.dotGreen}`} />
        </div>

        <div className={styles.urlBar}>
          <Lock size={12} className={styles.urlLock} />
          <span>https://{urlPath}</span>
        </div>

        <div className={styles.videoStatusTag}>
          <Sparkles size={11} />
          <span>{badge}</span>
        </div>
      </div>

      {/* Video Content */}
      <div className={styles.videoContainer} onClick={togglePlay}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={styles.videoElement}
          muted={isMuted}
          playsInline
          loop
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <div className={styles.centerPlayBadge}>
            <Play size={24} fill="#FFFFFF" style={{ marginLeft: 3 }} />
          </div>
        )}

        {/* Bottom floating controls */}
        <div className={styles.overlayControls}>
          <button
            className={styles.controlBtn}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} fill="#FFFFFF" />}
          </button>
          <button
            className={styles.controlBtn}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      {/* Caption footer if provided */}
      {(title || subtitle) && (
        <div className={styles.captionBar}>
          <div>
            <div className={styles.captionTitle}>{title}</div>
            {subtitle && <div className={styles.captionSubtitle}>{subtitle}</div>}
          </div>
        </div>
      )}
    </div>
  );
};
