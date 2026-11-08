import React, { useEffect, useRef, useState } from 'react';
import { motion as framerMotion } from 'framer-motion';

const motion = framerMotion as any;

interface LuxuryMowIntroProps {
  onComplete: () => void;
}

interface GrassBlade {
  xNorm: number;
  yNorm: number;
  lane: number;
  tallHeight: number;
  cutHeight: number;
  leanAngle: number;
  swayPhase: number;
  colorTall: string;
  colorCut: string;
  width: number;
}

interface ClippingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  angle: number;
  vAngle: number;
  alpha: number;
  color: string;
}

// Deterministic grass blades in warm tan / harvest-gold / bronze tones (zero green)
const TALL_COLORS = ['#C8B88A', '#D8CBA3', '#B5A374', '#9E8B5C', '#E2D6B5'];
const CUT_COLORS = ['#8A7950', '#9E8B5C', '#756643'];

const createGrassField = (count: number): GrassBlade[] => {
  const blades: GrassBlade[] = [];
  for (let i = 0; i < count; i++) {
    const lane = i % 3;
    const laneTop = lane / 3;
    const yInLane = ((i * 37) % 100) / 100;
    const yNorm = laneTop + yInLane * (1 / 3);
    const xNorm = ((i * 73 + lane * 19) % 1000) / 1000;

    blades.push({
      xNorm,
      yNorm,
      lane,
      tallHeight: 22 + ((i * 13) % 18),
      cutHeight: 5 + (i % 3),
      leanAngle: (((i * 29) % 20) - 10) * (Math.PI / 180),
      swayPhase: (i * 0.43) % (Math.PI * 2),
      colorTall: TALL_COLORS[i % TALL_COLORS.length],
      colorCut: CUT_COLORS[i % CUT_COLORS.length],
      width: 1.4 + (i % 3) * 0.4,
    });
  }
  return blades.sort((a, b) => a.yNorm - b.yNorm);
};

const GRASS_FIELD = createGrassField(780);

export const LuxuryMowIntro: React.FC<LuxuryMowIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      const t = window.setTimeout(onComplete, 400);
      return () => window.clearTimeout(t);
    }

    // Start cross-fading into the actual site right as the mowers finish their pass
    const tReveal = window.setTimeout(() => setRevealing(true), 1850);
    const tDone = window.setTimeout(() => onComplete(), 2500);

    return () => {
      window.clearTimeout(tReveal);
      window.clearTimeout(tDone);
    };
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();
    const mowDuration = 2050;
    const clippings: ClippingParticle[] = [];

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const drawCylinderMower = (
      mx: number,
      laneCenterY: number,
      laneH: number,
      timeSec: number
    ) => {
      const deckH = Math.min(laneH * 0.76, 170);
      const deckW = 76;
      const halfH = deckH / 2;

      ctx.save();
      ctx.translate(mx, laneCenterY);

      // Soft shadow beneath mower deck
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.beginPath();
      ctx.roundRect(-deckW - 14, -halfH + 6, deckW + 26, deckH, 10);
      ctx.fill();

      // 1. Trailing twin handlebars
      ctx.strokeStyle = '#8A7950';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-deckW, -halfH * 0.42);
      ctx.lineTo(-deckW - 68, -halfH * 0.58);
      ctx.moveTo(-deckW, halfH * 0.42);
      ctx.lineTo(-deckW - 68, halfH * 0.58);
      ctx.moveTo(-deckW - 68, -halfH * 0.58);
      ctx.lineTo(-deckW - 68, halfH * 0.58);
      ctx.stroke();

      // Tan handlebar grips
      ctx.strokeStyle = '#C8B88A';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-deckW - 68, -halfH * 0.58);
      ctx.lineTo(-deckW - 68, -halfH * 0.35);
      ctx.moveTo(-deckW - 68, halfH * 0.35);
      ctx.lineTo(-deckW - 68, halfH * 0.58);
      ctx.stroke();

      // 2. Heavy Rear Striping Roller
      ctx.fillStyle = '#2A241B';
      ctx.strokeStyle = '#C8B88A';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-deckW, -halfH + 4, 18, deckH - 8, 4);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = 'rgba(200, 184, 138, 0.35)';
      ctx.lineWidth = 1;
      for (let ry = -halfH + 10; ry < halfH - 10; ry += 8) {
        ctx.beginPath();
        ctx.moveTo(-deckW + 2, ry);
        ctx.lineTo(-deckW + 16, ry);
        ctx.stroke();
      }

      // 3. Main Mower Chassis
      const deckGrad = ctx.createLinearGradient(-deckW + 18, 0, -8, 0);
      deckGrad.addColorStop(0, '#18140F');
      deckGrad.addColorStop(0.5, '#241E16');
      deckGrad.addColorStop(1, '#14110C');
      ctx.fillStyle = deckGrad;
      ctx.strokeStyle = '#C8B88A';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.roundRect(-deckW + 16, -halfH, deckW - 22, deckH, 8);
      ctx.fill();
      ctx.stroke();

      // Side Wheel Housings
      ctx.fillStyle = '#C8B88A';
      ctx.beginPath();
      ctx.roundRect(-deckW + 22, -halfH - 4, 34, 5, 2);
      ctx.roundRect(-deckW + 22, halfH - 1, 34, 5, 2);
      ctx.fill();

      // Brass crest plate on mower hood
      ctx.fillStyle = 'rgba(200, 184, 138, 0.18)';
      ctx.strokeStyle = 'rgba(200, 184, 138, 0.65)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-deckW + 30, -16, 26, 32, 3);
      ctx.fill();
      ctx.stroke();

      // 4. Front Spinning Helical Cutting Cylinder Reel
      ctx.fillStyle = '#120F0B';
      ctx.strokeStyle = '#D8CBA3';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-8, -halfH + 3, 14, deckH - 6, 4);
      ctx.fill();
      ctx.stroke();

      const spinOffset = (timeSec * 42) % 12;
      ctx.strokeStyle = '#E5D9B6';
      ctx.lineWidth = 2;
      for (let by = -halfH + 6 + spinOffset; by < halfH - 6; by += 12) {
        ctx.beginPath();
        ctx.moveTo(-6, by - 3);
        ctx.lineTo(5, by + 3);
        ctx.stroke();
      }

      // Warm golden-tan cutter bar glow
      const glowGrad = ctx.createRadialGradient(4, 0, 2, 4, 0, halfH * 0.9);
      glowGrad.addColorStop(0, 'rgba(216, 203, 163, 0.38)');
      glowGrad.addColorStop(1, 'rgba(216, 203, 163, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(4, 0, halfH * 0.9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const renderFrame = (now: number) => {
      const elapsed = now - startTime;
      const timeSec = elapsed / 1000;
      const rawProgress = Math.min(elapsed / mowDuration, 1);

      ctx.fillStyle = '#0D0B09';
      ctx.fillRect(0, 0, width, height);

      const laneProgress = [
        easeInOutCubic(Math.min(Math.max((elapsed - 0) / (mowDuration - 200), 0), 1)),
        easeInOutCubic(Math.min(Math.max((elapsed - 95) / (mowDuration - 200), 0), 1)),
        easeInOutCubic(Math.min(Math.max((elapsed - 190) / (mowDuration - 200), 0), 1)),
      ];

      const laneMowerX = laneProgress.map((p) => -90 + p * (width + 240));
      const laneH = height / 3;

      // 1. Freshly rolled lawn stripes behind each mower
      for (let lane = 0; lane < 3; lane++) {
        const topY = lane * laneH;
        const cutEdgeX = Math.max(0, Math.min(width, laneMowerX[lane]));
        if (cutEdgeX > 0) {
          const subH = laneH / 2;
          for (let sub = 0; sub < 2; sub++) {
            const stripeIdx = lane * 2 + sub;
            const sy = topY + sub * subH;
            const grad = ctx.createLinearGradient(0, sy, cutEdgeX, sy);
            if (stripeIdx % 2 === 0) {
              grad.addColorStop(0, '#17140F');
              grad.addColorStop(0.5, '#211C15');
              grad.addColorStop(1, '#181510');
            } else {
              grad.addColorStop(0, '#12100C');
              grad.addColorStop(0.5, '#191510');
              grad.addColorStop(1, '#13100C');
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, sy, cutEdgeX, subH + 1);

            ctx.strokeStyle =
              stripeIdx % 2 === 0
                ? 'rgba(200, 184, 138, 0.09)'
                : 'rgba(200, 184, 138, 0.04)';
            ctx.lineWidth = 1;
            for (let ly = sy + 6; ly < sy + subH; ly += 9) {
              ctx.beginPath();
              ctx.moveTo(0, ly);
              ctx.lineTo(cutEdgeX, ly);
              ctx.stroke();
            }
          }
        }
      }

      // 2. Grass blades (unmowed tall ahead of mower, trimmed behind mower)
      for (let i = 0; i < GRASS_FIELD.length; i++) {
        const b = GRASS_FIELD[i];
        const bx = b.xNorm * width;
        const by = b.yNorm * height;
        const mowerX = laneMowerX[b.lane];
        const distToMower = bx - mowerX;

        if (distToMower > 4) {
          const sway = Math.sin(timeSec * 3.2 + b.swayPhase) * 0.14;
          const pushBend =
            distToMower < 42 ? (1 - distToMower / 42) * 0.45 : 0;
          const angle = b.leanAngle + sway + pushBend;
          const tipX = bx + Math.sin(angle) * b.tallHeight;
          const tipY = by - Math.cos(angle) * b.tallHeight;
          const midX = bx + Math.sin(angle * 0.5) * (b.tallHeight * 0.55);
          const midY = by - Math.cos(angle * 0.5) * (b.tallHeight * 0.55);

          ctx.strokeStyle = b.colorTall;
          ctx.lineWidth = b.width;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.quadraticCurveTo(midX, midY, tipX, tipY);
          ctx.stroke();
        } else {
          ctx.strokeStyle = b.colorCut;
          ctx.lineWidth = b.width * 0.85;
          ctx.lineCap = 'butt';
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + 2.5, by - b.cutHeight);
          ctx.stroke();
        }
      }

      // 3. Flying grass clippings
      if (rawProgress < 0.98) {
        for (let lane = 0; lane < 3; lane++) {
          const mx = laneMowerX[lane];
          if (mx > -20 && mx < width + 20) {
            const laneCenterY = lane * laneH + laneH * 0.5;
            for (let c = 0; c < 3; c++) {
              clippings.push({
                x: mx + (Math.random() * 8 - 4),
                y: laneCenterY + (Math.random() - 0.5) * (laneH * 0.65),
                vx: -2.2 - Math.random() * 4.5,
                vy: -1.8 - Math.random() * 3.4,
                length: 6 + Math.random() * 7,
                angle: Math.random() * Math.PI * 2,
                vAngle: (Math.random() - 0.5) * 0.35,
                alpha: 0.95,
                color: TALL_COLORS[Math.floor(Math.random() * TALL_COLORS.length)],
              });
            }
          }
        }
      }

      for (let i = clippings.length - 1; i >= 0; i--) {
        const p = clippings[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.14;
        p.angle += p.vAngle;
        p.alpha -= 0.024;

        if (p.alpha <= 0) {
          clippings.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-p.length / 2, 0);
        ctx.lineTo(p.length / 2, 0);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Draw the 3 Cylinder Lawn Mowers
      for (let lane = 0; lane < 3; lane++) {
        const mx = laneMowerX[lane];
        if (mx > -160 && mx < width + 180) {
          drawCylinderMower(mx, lane * laneH + laneH * 0.5, laneH, timeSec);
        }
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: revealing ? 0 : 1,
        scale: revealing ? 1.03 : 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[300] bg-[#0D0B09] overflow-hidden select-none pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </motion.div>
  );
};

export default LuxuryMowIntro;
