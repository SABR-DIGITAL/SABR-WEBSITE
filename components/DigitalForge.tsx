
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Page } from '../App';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DigitalForgeProps { navigateTo: (page: Page) => void; }

const DigitalForge: React.FC<DigitalForgeProps> = ({ navigateTo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const beamScaleX = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const colorA = new THREE.Color('#2563EB'); 
    const colorB = new THREE.Color('#0ea5e9'); 

    for (let i = 0; i < particlesCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particlesCount);
      const theta = Math.sqrt(particlesCount * Math.PI) * phi;
      const radius = 3.5;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = colorA.clone().lerp(colorB, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const core = new THREE.Points(geometry, material);
    scene.add(core);

    const meshGeo = new THREE.IcosahedronGeometry(3.45, 4);
    const meshMat = new THREE.MeshBasicMaterial({
      color: '#2563EB',
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending
    });
    const architectureMesh = new THREE.Mesh(meshGeo, meshMat);
    scene.add(architectureMesh);

    const ringGeo = new THREE.TorusGeometry(3.8, 0.005, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: '#38BDF8',
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    const scanningRing = new THREE.Mesh(ringGeo, ringMat);
    scanningRing.rotation.x = Math.PI / 2;
    scene.add(scanningRing);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      core.rotation.y = elapsed * 0.08;
      core.rotation.z = Math.sin(elapsed * 0.1) * 0.1;
      architectureMesh.rotation.y = -elapsed * 0.05;
      architectureMesh.rotation.x = Math.cos(elapsed * 0.1) * 0.05;
      scanningRing.position.y = Math.sin(elapsed * 0.5) * 3;
      scanningRing.rotation.z = elapsed * 0.2;
      ringMat.opacity = 0.1 + Math.abs(Math.sin(elapsed * 0.5)) * 0.2;
      const scale = 1 + Math.sin(elapsed * 1.5) * 0.02;
      core.scale.set(scale, scale, scale);
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      meshGeo.dispose();
      meshMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-[#050608] overflow-hidden">
      
      {/* TOP TRON BEAM */}
      <motion.div 
        style={{ scaleX: beamScaleX }} 
        className="absolute top-0 left-0 right-0 h-[1px] bg-blue-500 shadow-[0_0_10px_#2563eb] origin-left z-20"
      />

      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-90 pointer-events-none transform-gpu scale-125 lg:scale-150" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050608_85%)] pointer-events-none z-[1]"></div>

      <div className="max-w-4xl mx-auto px-8 md:px-12 flex flex-col items-center relative z-10 text-center">
        <div className="h-1 w-20 bg-blue-600 mb-12 md:mb-16 rounded-full"></div>
        <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl text-white font-black tracking-tighter uppercase leading-[0.85] mb-8 md:mb-10">
          CRAFTED. <br/><span className="text-blue-600 italic">NOT COMPILED.</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-3xl leading-relaxed mb-16 opacity-80">
          Our builds aren't standard templates. We craft every detail with meticulous care, ensuring your site is fast, reliable, and perfectly tailored to your business needs.
        </p>
        <button 
          onClick={() => navigateTo('contact')}
          className="px-16 py-8 bg-blue-600 text-white font-black text-[13px] uppercase tracking-[0.5em] rounded-full hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-[0_20px_60px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 transform-gpu ring-2 ring-blue-600/20"
        >
          Work with us
        </button>
      </div>

      {/* BOTTOM TRON BEAM */}
      <motion.div 
        style={{ scaleX: beamScaleX }} 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500 shadow-[0_0_10px_#2563eb] origin-left z-20"
      />
    </section>
  );
};

export default DigitalForge;
