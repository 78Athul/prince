"use client";

import React, { useEffect, useRef } from 'react';

/**
 * HalideTopoHero Component
 * A monochrome 3D hero with topographical parallax layers and film grain effects.
 * Extracted from: https://21st.dev/community/components/shivendra9795kumar/halide-topo-hero/default
 */
export const HalideTopoHero: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      // Rotate the 3D Canvas
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;

      // Apply depth shift to individual layers
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="halide-body w-full">
      <style>{`
        :root {
          --grain-opacity: 0.15;
          --accent: #E0E0E0;
        }

        .halide-body {
          background-color: #0A0A0A;
          color: var(--accent);
          font-family: inherit;
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .halide-grain {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: var(--grain-opacity);
          filter: url(#grain);
        }

        .viewport {
          perspective: 2000px;
          width: 100%; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }

        .canvas-3d {
          position: relative;
          width: 800px; height: 500px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .layer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(224, 224, 224, 0.1);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        .layer-1 { 
          background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200'); 
          filter: grayscale(1) contrast(1.2) brightness(0.5); 
        }
        .layer-2 { 
          background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200'); 
          filter: grayscale(1) contrast(1.1) brightness(0.7); 
          opacity: 0.6; 
          mix-blend-mode: screen; 
        }
        .layer-3 { 
          background-image: url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200'); 
          filter: grayscale(1) contrast(1.3) brightness(0.8); 
          opacity: 0.4; 
          mix-blend-mode: overlay; 
        }

        .contours {
          position: absolute;
          width: 200%; height: 200%;
          top: -50%; left: -50%;
          background: radial-gradient(circle, transparent 30%, rgba(255,255,255,0.05) 31%, transparent 32%) center/40px 40px;
          opacity: 0.3;
          pointer-events: none;
        }

        .content-overlay {
          position: relative;
          z-index: 10;
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: translateZ(100px); /* Lift above layers */
        }

        .top-interface {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .hero-title {
          font-size: 120px;
          font-weight: 800;
          line-height: 0.9;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: -4px;
          transform: translateZ(50px);
        }

        .bottom-interface {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid rgba(224, 224, 224, 0.2);
          padding-top: 20px;
        }

        .metadata {
          font-size: 10px;
          letter-spacing: 1px;
        }

        .cta-button {
          background: var(--accent);
          color: #000;
          border: none;
          padding: 15px 40px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        
        .cta-button:hover {
          transform: scale(0.98);
          opacity: 0.9;
        }
      `}</style>

      {/* SVG Noise Filter */}
      <div className="halide-grain"></div>
      <svg style={{ display: 'none' }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" operator="over" />
        </filter>
      </svg>

      <div className="viewport">
        <div className="canvas-3d" ref={canvasRef}>
          <div className="contours"></div>
          
          {/* Depth Layers */}
          <div className="layer layer-1" ref={el => { if (el) layersRef.current[0] = el }}></div>
          <div className="layer layer-2" ref={el => { if (el) layersRef.current[1] = el }}></div>
          <div className="layer layer-3" ref={el => { if (el) layersRef.current[2] = el }}></div>

          {/* UI Content Layer */}
          <div className="content-overlay pointer-events-none">
            <div className="top-interface">
              <span className="location">GALLERY_CORE</span>
              <div className="stats tracking-widest text-[#bbcac6]">
                <span>LATITUDE: 41.8781° N</span><br/>
                <span>FOCAL DEPTH: 600MM</span>
              </div>
            </div>

            <h1 className="hero-title text-[#bbcac6] mix-blend-difference">
              RAW<br/>NATURE
            </h1>

            <div className="bottom-interface pointer-events-auto">
              <div className="metadata text-[#bbcac6]">
                <span>[ ARCHIVE 2026 ]</span>
                <p>SURFACE TENSION & TOPOGRAPHICAL LIGHT</p>
              </div>
              <button className="cta-button" onClick={() => document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' })}>EXPLORE ARCHIVE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
