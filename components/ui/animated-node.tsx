'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function AnimatedNode() {
  const [isMounted, setIsMounted] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number }>>([]);
  const [satellitePositions, setSatellitePositions] = useState<Array<{ x: number; y: number }>>([]);
  const [satelliteRotate, setSatelliteRotate] = useState(0);
  const [outerParticlesOpacity, setOuterParticlesOpacity] = useState(0);
  const [innerCircleOpacity, setInnerCircleOpacity] = useState(0);
  const [innerCircleScale, setInnerCircleScale] = useState(0.5);
  const [scale, setScale] = useState(0.8);
  const [rotate, setRotate] = useState(0);
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Speed up by 20% - compress ranges by multiplying by 0.8
  const scaleTransform = useTransform(scrollYProgress, [0.08, 0.32, 0.56, 0.8], [0.8, 1, 1, 0.8]);
  const rotateTransform = useTransform(scrollYProgress, [0, 0.8], [0, 180]);
  
  const innerCircleOpacityTransform = useTransform(scrollYProgress, [0.16, 0.24], [0, 1]);
  const innerCircleScaleTransform = useTransform(scrollYProgress, [0.16, 0.32], [0.5, 1]);

  const outerParticlesRadius = useTransform(scrollYProgress, [0.16, 0.4], [100, 130]);
  const outerParticlesOpacityValue = useTransform(scrollYProgress, [0.16, 0.4, 0.64], [0, 1, 0]);

  const satelliteRadius = useTransform(scrollYProgress, [0.24, 0.56], [80, 100]);
  const satelliteRotateValue = useTransform(scrollYProgress, [0, 0.8], [0, 360]);

  // Initialize positions on mount
  useEffect(() => {
    setIsMounted(true);
    const initialRadius = 100;
    const initialSatelliteRadius = 80;
    
    setParticlePositions(
      Array.from({ length: 20 }, (_, i) => {
        const angle = (i * 18) * (Math.PI / 180);
        return {
          x: 150 + Math.cos(angle) * initialRadius,
          y: 150 + Math.sin(angle) * initialRadius,
        };
      })
    );
    
    setSatellitePositions(
      Array.from({ length: 3 }, (_, i) => {
        const angle = (i * 120) * (Math.PI / 180);
        return {
          x: 150 + Math.cos(angle) * initialSatelliteRadius,
          y: 150 + Math.sin(angle) * initialSatelliteRadius,
        };
      })
    );
  }, []);

  // Use requestAnimationFrame for Safari compatibility
  useEffect(() => {
    if (!isMounted) return;

    let animationFrameId: number;
    
    const updateValues = () => {
      // Read motion values directly (Safari-compatible)
      const currentRadius = outerParticlesRadius.get();
      const currentSatelliteRadius = satelliteRadius.get();
      const currentRotate = satelliteRotateValue.get();
      const currentOpacity = outerParticlesOpacityValue.get();
      const currentInnerOpacity = innerCircleOpacityTransform.get();
      const currentInnerScale = innerCircleScaleTransform.get();
      const currentScale = scaleTransform.get();
      const currentRotateTransform = rotateTransform.get();

      // Update particle positions
      const positions = Array.from({ length: 20 }, (_, i) => {
        const angle = (i * 18) * (Math.PI / 180);
        return {
          x: 150 + Math.cos(angle) * currentRadius,
          y: 150 + Math.sin(angle) * currentRadius,
        };
      });
      setParticlePositions(positions);

      // Update satellite positions
      const satPositions = Array.from({ length: 3 }, (_, i) => {
        const angle = (i * 120) * (Math.PI / 180);
        return {
          x: 150 + Math.cos(angle) * currentSatelliteRadius,
          y: 150 + Math.sin(angle) * currentSatelliteRadius,
        };
      });
      setSatellitePositions(satPositions);

      // Update other values
      setSatelliteRotate(currentRotate);
      setOuterParticlesOpacity(currentOpacity);
      setInnerCircleOpacity(currentInnerOpacity);
      setInnerCircleScale(currentInnerScale);
      setScale(currentScale);
      setRotate(currentRotateTransform);

      animationFrameId = requestAnimationFrame(updateValues);
    };

    animationFrameId = requestAnimationFrame(updateValues);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMounted, outerParticlesRadius, satelliteRadius, satelliteRotateValue, outerParticlesOpacityValue, innerCircleOpacityTransform, innerCircleScaleTransform, scaleTransform, rotateTransform]);

  return (
    <div ref={targetRef} className="w-full max-w-[400px] aspect-square" aria-hidden="true">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full"
        style={{ 
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          transformOrigin: 'center'
        }}
        role="img"
        aria-label="Animated network node visualization"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Core */}
        <circle cx="150" cy="150" r="40" fill="hsl(var(--primary))" />
        <circle 
          cx="150" 
          cy="150" 
          r="45" 
          fill="none" 
          stroke="hsl(var(--accent))" 
          strokeWidth="2" 
          filter="url(#glow)"
          style={{ 
            opacity: innerCircleOpacity,
            transform: `scale(${innerCircleScale})`,
            transformOrigin: '150px 150px'
          }}
        />

        {/* Inner Ring */}
        <circle cx="150" cy="150" r="60" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 2" />

        {/* Outer Particles */}
        {particlePositions.length > 0 && (
          <g style={{ opacity: outerParticlesOpacity }}>
            {particlePositions.map((pos, i) => (
              <circle
                key={`p1-${i}`}
                cx={pos.x}
                cy={pos.y}
                r="1.5"
                fill="hsl(var(--accent))"
              />
            ))}
          </g>
        )}

        {/* Satellite Nodes */}
        {satellitePositions.length > 0 && (
          <g transform={`rotate(${satelliteRotate} 150 150)`}>
            {satellitePositions.map((pos, i) => (
              <circle
                key={`s-${i}`}
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
              />
            ))}
          </g>
        )}

      </svg>
    </div>
  );
}
