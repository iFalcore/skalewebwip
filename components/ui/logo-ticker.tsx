"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const logos = [
  'skale-acrew-logo.webp',
  'skale-arrington-capital-logo.webp',
  'skale-blockchange-logo.webp',
  'skale-boostvc-logo.webp',
  'skale-cambrian-asset-management-logo.webp',
  'skale-canaan-logo.webp',
  'skale-consensys-mesh-logo.webp',
  'floodgate-v2.svg',
  'skale-galaxy-logo.webp',
  'skale-hackvc-logo.webp',
  'skale-hashed-logo.webp',
  'skale-haskey-group-logo.webp',
  'skale-multicoin-capital-logo.webp',
  'skale-mw-partners-logo.webp',
  'skale-ngc-ventures-logo.webp',
  'skale-oyster-ventures-logo.webp',
  'skale-recruit-logo.webp',
  'skale-signia-venture-partners.webp',
  'skale-spartan-logo.webp',
  'skale-u1-logo.webp',
  'skale-wave-capital-logo.webp',
  'skale-winklevoss-capital.webp',
];

export default function LogoTicker() {
  const allLogos = [...logos, ...logos]; // Duplicate for seamless loop
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Calculate the width of half the content (one set of logos)
    const updateWidth = () => {
      if (containerRef.current) {
        // Get all first half elements
        const firstHalfElements = Array.from(
          containerRef.current.querySelectorAll('[data-first-half="true"]')
        ) as HTMLElement[];
        
        if (firstHalfElements.length > 0) {
          // Measure the actual rendered width
          // Get the right edge of the last first-half element
          const lastElement = firstHalfElements[firstHalfElements.length - 1];
          const lastRect = lastElement.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          
          // Calculate width from container left to last element right edge
          const totalWidth = lastRect.right - containerRect.left + 16; // Add margin for last element
          setContainerWidth(totalWidth);
        }
      }
    };

    // Initial calculation after images load
    const timeoutId = setTimeout(updateWidth, 200);
    
    // Also update when images load
    const images = containerRef.current.querySelectorAll('img');
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        updateWidth();
      }
    };
    
    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
        img.addEventListener('error', checkAllLoaded);
      }
    });

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      images.forEach((img) => {
        img.removeEventListener('load', checkAllLoaded);
        img.removeEventListener('error', checkAllLoaded);
      });
    };
  }, []);

  useEffect(() => {
    if (containerWidth === 0) return;

    // Animate from 0 to -containerWidth (half the content width)
    const controls = animate(x, -containerWidth, {
      duration: 80,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => {
      controls.stop();
    };
  }, [containerWidth, x]);

  return (
    <div className="w-full mt-20 sm:mt-32" aria-label="SKALE supporters and investors">
      <p className="text-center text-sm text-muted-foreground font-medium mb-8">
        SKALE is backed by Top Tier Venture Capital Firms
      </p>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
        role="list"
        aria-label="Venture capital firm logos"
      >
        <motion.div
          ref={containerRef}
          className="flex"
          style={{
            x,
            width: 'fit-content',
            display: 'flex',
          }}
          aria-hidden="true"
        >
          {allLogos.map((logo, index) => {
            const logoName = logo.replace('skale-', '').replace('-logo.webp', '').replace('.webp', '').replace(/-/g, ' ');
            const isFirstHalf = index < logos.length;
            
            return (
              <div
                key={`${logo}-${index}`}
                data-first-half={isFirstHalf ? 'true' : undefined}
                className="flex-shrink-0 flex items-center justify-center mx-4"
                style={{
                  width: '180px',
                  flexShrink: 0,
                }}
                role="listitem"
              >
                <Image
                  src={`/supporter-logos/${logo}`}
                  alt={`${logoName} logo`}
                  width={180}
                  height={112}
                  className="object-contain"
                  style={{
                    filter: logo.includes('floodgate') ? 'none' : 'brightness(0)',
                    width: '180px',
                    height: '112px',
                    display: 'block',
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
