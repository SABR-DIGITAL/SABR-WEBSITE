
import React, { useRef, useEffect } from 'react';
import { ArrowRight, Search, BarChart3, Layers } from 'lucide-react';
import { Page } from '../App';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface EvolutionPathProps { navigateTo: (page: Page) => void; }

const EvolutionPath: React.FC<EvolutionPathProps> = ({ navigateTo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // --- THREE.JS INITIALIZATION ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- NEURAL PULSE SPHERE ---
    const sphereGeo = new THREE.IcosahedronGeometry(2.2, 32);
    
    // Custom Shader for Ripple Effect
    const sphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#2563eb") }, // Electric Blue
        uColor2: { value: new THREE.Color("#db2777") }, // Magenta
        uColor3: { value: new THREE.Color("#0ea5e9") }  // Cyan
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDisplacement;
        uniform float uTime;

        // Simple noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 = v - i + dot(i, C.xxx) ;
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute( permute( permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vUv = uv;
          vDisplacement = snoise(position * 0.5 + uTime * 0.2) * 0.4;
          vec3 newPos = position + normal * vDisplacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDisplacement;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uTime;

        void main() {
          float colorMix = smoothstep(-0.5, 0.5, vDisplacement);
          vec3 finalColor = mix(uColor1, uColor2, colorMix);
          finalColor = mix(finalColor, uColor3, sin(uTime * 0.5) * 0.5 + 0.5);
          
          gl_FragColor = vec4(finalColor, 0.15 + vDisplacement * 0.2);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // --- GLASSMORPHIC SHAPES ---
    const glassGroup = new THREE.Group();
    const glassShapes: THREE.Mesh[] = [];
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.1,
      transmission: 0.95,
      thickness: 1.5,
      transparent: true,
      opacity: 0.2,
      ior: 1.5,
    });

    const geometries = [
      new THREE.IcosahedronGeometry(0.4, 0),
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.TorusGeometry(0.3, 0.1, 16, 32)
    ];

    for (let i = 0; i < 8; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geo, glassMat);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      glassGroup.add(mesh);
      glassShapes.push(mesh);
    }
    scene.add(glassGroup);

    // Add Lights
    const pointLight1 = new THREE.PointLight(0x2563eb, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xdb2777, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // --- ANIMATION LOOP ---
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      sphereMat.uniforms.uTime.value = time;
      
      sphere.rotation.y = time * 0.1;
      sphere.rotation.x = Math.sin(time * 0.2) * 0.2;

      glassShapes.forEach((mesh, i) => {
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.005;
        mesh.position.y += Math.sin(time + i) * 0.002;
        mesh.position.x += Math.cos(time + i) * 0.002;
      });

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      renderer.setSize(width, width, false); // Keep square to match radius logic
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      sphereGeo.dispose();
      sphereMat.dispose();
      geometries.forEach(g => g.dispose());
      glassMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-white border-y border-slate-100 min-h-[700px] flex items-center justify-center">
      
      {/* Three.js Background Canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="opacity-70 w-full max-w-[900px] aspect-square"
        />
      </div>

      {/* Symmetrical Centered Content */}
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Subtitle Label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-[2px] bg-blue-600"></div>
          <span className="text-blue-600 font-black text-[11px] uppercase tracking-[0.8em]">INDUSTRY PRECISION</span>
          <div className="w-10 h-[2px] bg-blue-600"></div>
        </div>
        
        {/* Main Title */}
        <h2 className="font-syne text-5xl md:text-8xl text-slate-950 font-black tracking-tighter mb-14 leading-[0.9] uppercase">
          SECTOR <br /><span className="text-blue-600 italic">OPTIMIZED.</span>
        </h2>

        {/* 3 Precision Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-16 w-full">
          {/* Point 1 */}
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <Search size={22} />
            </div>
            <div className="space-y-3">
              <h4 className="font-black text-[14px] uppercase tracking-widest text-slate-900">Competitor Audit</h4>
              <p className="text-sm text-slate-400 font-medium leading-relaxed italic max-w-[240px]">We analyze your top rivals to exploit their technical weaknesses and capture their traffic.</p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <BarChart3 size={22} />
            </div>
            <div className="space-y-3">
              <h4 className="font-black text-[14px] uppercase tracking-widest text-slate-900">Strategy DNA</h4>
              <p className="text-sm text-slate-400 font-medium leading-relaxed italic max-w-[240px]">We identify high-value user paths and optimize every touchpoint for native-level conversion.</p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <Layers size={22} />
            </div>
            <div className="space-y-3">
              <h4 className="font-black text-[14px] uppercase tracking-widest text-slate-900">Growth Architecture</h4>
              <p className="text-sm text-slate-400 font-medium leading-relaxed italic max-w-[240px]">Engineering the final blueprint to ensure your digital asset scales effortlessly with your business.</p>
            </div>
          </div>
        </div>
        
        {/* Centered CTA */}
        <button 
          onClick={() => navigateTo('process')}
          className="px-14 py-8 bg-slate-950 text-white font-black text-[11px] uppercase tracking-[0.6em] rounded-2xl flex items-center gap-4 group transition-all hover:bg-blue-600 shadow-2xl active:scale-95"
        >
          VIEW OUR PROCESS <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default EvolutionPath;
