/**
 * HeroCanvas — Standalone animated background
 *
 * Drop-in for any dark hero section. Zero dependencies beyond React.
 *
 * What renders:
 *   1. Ambient glow pools   — 3 radial warm-orange gradients, center follows mouse
 *   2. Bokeh orbs (38)      — large blurred circles floating upward with mouse parallax
 *   3. Scan lines (10)      — horizontal light streaks drifting upward
 *   4. Wireframe sphere     — dotted 3-D globe, rotates continuously, tilts toward mouse
 *   5. Sparks (18)          — small bright particles rising faster than bokeh
 *
 * Usage:
 *   import { useHeroCanvas, HeroCanvasBackground } from "./HeroCanvas"
 *
 *   // Option A — use the ready-made wrapper div:
 *   <HeroCanvasBackground style={{ minHeight: "100vh" }}>
 *     <YourHeroContent />
 *   </HeroCanvasBackground>
 *
 *   // Option B — use the hook directly on your own container:
 *   function MyHero() {
 *     const canvasRef = useRef(null)
 *     const heroRef   = useRef(null)
 *     useHeroCanvas(canvasRef, heroRef)
 *     return (
 *       <section ref={heroRef} style={{ position: "relative", overflow: "hidden" }}>
 *         <canvas ref={canvasRef} style={canvasStyle} />
 *         <YourContent />
 *       </section>
 *     )
 *   }
 */

import { useEffect, useRef } from "react";

// ─── Required canvas CSS ────────────────────────────────────────────────────
// Add this once to your global stylesheet, or keep it as a JS style injection.
const CANVAS_CSS = `
.hero-canvas-root {
  position: relative;
  overflow: hidden;
}
.hero-canvas-el {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;   /* canvas never intercepts clicks */
  z-index: 0;
  display: block;
}
.hero-canvas-content {
  position: relative;
  z-index: 1;             /* your content sits above the canvas */
}
`;

// ─── CONFIG — tweak these to change the look ─────────────────────────────────
const CONFIG = {
  BG_COLOR: "#120601", // solid fill drawn each frame before layers
  N_BOKEH: 38, // number of large blurred orbs
  N_SPARKS: 18, // number of sharp bright sparks
  N_SCANLINES: 10, // number of horizontal scan lines
  SPHERE_RINGS: 14, // latitude rings on the wireframe sphere
  SPHERE_PTS: 22, // points per ring
  SPHERE_SPEED: 0.003, // rotation speed (radians/frame)
  SPHERE_X: 0.78, // sphere center as fraction of canvas width
  SPHERE_Y: 0.62, // sphere center as fraction of canvas height
  SPHERE_R: 0.22, // sphere radius as fraction of min(W,H)
  // Amber/orange palette — change all 5 to retheme the whole effect
  BOKEH_COLORS: [
    [245, 140, 20], // amber-yellow
    [232, 80, 10], // deep orange
    [255, 180, 40], // bright yellow-orange
    [180, 50, 5], // dark burnt orange
    [255, 220, 80], // warm yellow
  ],
};

// ─── HOOK ────────────────────────────────────────────────────────────────────
/**
 * useHeroCanvas(canvasRef, containerRef)
 *
 * Attaches the full canvas animation to a <canvas> and its parent container.
 * Automatically:
 *   - Resizes canvas to match container on window resize
 *   - Tracks mouse position inside the container for parallax
 *   - Pauses RAF when container scrolls out of view (perf)
 *   - Cleans up all listeners and RAF on unmount
 */
export function useHeroCanvas(canvasRef, containerRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = containerRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    let W, H, raf;
    const mouse = { x: -9999, y: -9999 };

    // ── Resize handler ──────────────────────────────────────────────────────
    const resize = () => {
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse tracking ──────────────────────────────────────────────────────
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    // ── Layer 1: Bokeh orbs ─────────────────────────────────────────────────
    class Bokeh {
      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 80;
        this.r = 12 + Math.random() * 90;
        this.vy = -(0.08 + Math.random() * 0.22);
        this.vx = (Math.random() - 0.5) * 0.12;
        this.alpha = 0.04 + Math.random() * 0.22;
        this.color =
          CONFIG.BOKEH_COLORS[
            Math.floor(Math.random() * CONFIG.BOKEH_COLORS.length)
          ];
        this.parallax = 0.006 + Math.random() * 0.025;
        this.px = this.x;
        this.py = this.y;
      }
      constructor() {
        this.reset(true);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Smoothly nudge rendered position toward mouse-offset target
        const dx = mouse.x > 0 ? (mouse.x / W - 0.5) * W * this.parallax : 0;
        const dy = mouse.y > 0 ? (mouse.y / H - 0.5) * H * this.parallax : 0;
        this.px += (this.x + dx - this.px) * 0.05;
        this.py += (this.y + dy - this.py) * 0.05;
        if (this.y + this.r < -20) this.reset(false);
      }

      draw() {
        const [r, g, b] = this.color;
        const gr = ctx.createRadialGradient(
          this.px,
          this.py,
          0,
          this.px,
          this.py,
          this.r,
        );
        gr.addColorStop(0, `rgba(${r},${g},${b},${this.alpha})`);
        gr.addColorStop(0.5, `rgba(${r},${g},${b},${this.alpha * 0.4})`);
        gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(this.px, this.py, this.r, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      }
    }

    // ── Layer 2: Sharp sparks ───────────────────────────────────────────────
    class Spark {
      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.r = 1.5 + Math.random() * 3.5;
        this.vy = -(0.3 + Math.random() * 0.7);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.alpha = 0.5 + Math.random() * 0.5;
      }
      constructor() {
        this.reset(true);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.r < -5) this.reset(false);
      }

      draw() {
        const gr = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.r * 3,
        );
        gr.addColorStop(0, `rgba(255,220,80,${this.alpha})`);
        gr.addColorStop(0.4, `rgba(245,140,20,${this.alpha * 0.6})`);
        gr.addColorStop(1, "rgba(245,140,20,0)");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      }
    }

    // ── Layer 3: Scan lines ─────────────────────────────────────────────────
    class ScanLine {
      reset(init) {
        this.y = init ? Math.random() * H : H + 10;
        this.speed = 0.4 + Math.random() * 0.9;
        this.alpha = 0.025 + Math.random() * 0.06;
        this.thickness = 0.5 + Math.random() * 1.5;
        this.w = 0.3 + Math.random() * 0.6; // width as fraction of canvas
      }
      constructor() {
        this.reset(true);
      }

      update() {
        this.y -= this.speed;
        if (this.y < -2) this.reset(false);
      }

      draw() {
        const x0 = W * (0.5 - this.w / 2);
        const x1 = W * (0.5 + this.w / 2);
        const gr = ctx.createLinearGradient(x0, 0, x1, 0);
        gr.addColorStop(0, "rgba(255,200,80,0)");
        gr.addColorStop(0.15, "rgba(255,200,80,0.6)");
        gr.addColorStop(0.5, `rgba(255,220,120,${this.alpha})`);
        gr.addColorStop(0.85, "rgba(255,200,80,0.6)");
        gr.addColorStop(1, "rgba(255,200,80,0)");
        ctx.beginPath();
        ctx.moveTo(x0, this.y);
        ctx.lineTo(x1, this.y);
        ctx.strokeStyle = gr;
        ctx.lineWidth = this.thickness;
        ctx.globalAlpha = this.alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // ── Layer 4: Wireframe dot-sphere ───────────────────────────────────────
    const sphere = {
      rotY: 0,
      rotX: 0.25,
      speed: CONFIG.SPHERE_SPEED,
      dots: [],

      init() {
        this.dots = [];
        for (let i = 0; i <= CONFIG.SPHERE_RINGS; i++) {
          const phi = (Math.PI * i) / CONFIG.SPHERE_RINGS;
          for (let j = 0; j < CONFIG.SPHERE_PTS; j++) {
            this.dots.push({
              phi,
              theta: (2 * Math.PI * j) / CONFIG.SPHERE_PTS,
            });
          }
        }
      },

      // Project a sphere surface point to 2-D screen coords
      project(phi, theta, cx, cy, r) {
        const sinY = Math.sin(this.rotY),
          cosY = Math.cos(this.rotY);
        const sinX = Math.sin(this.rotX),
          cosX = Math.cos(this.rotX);
        // Unit sphere coords
        let x = Math.sin(phi) * Math.cos(theta);
        let y = Math.cos(phi);
        let z = Math.sin(phi) * Math.sin(theta);
        // Y-axis rotation
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // X-axis rotation
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        // Mild perspective divide
        const s = 1 / (1.8 - z2 * 0.5);
        return { sx: cx + x1 * r * s, sy: cy + y2 * r * s, z: z2 };
      },

      draw(cx, cy, r) {
        this.rotY += this.speed;
        // Tilt X-axis toward mouse Y position
        if (mouse.y > 0) {
          const ty = (mouse.y / H - 0.5) * 0.25;
          this.rotX += (ty - this.rotX) * 0.02;
        }
        ctx.save();
        for (const d of this.dots) {
          const p = this.project(d.phi, d.theta, cx, cy, r);
          const vis = (p.z + 1) / 2; // 0 = back-facing, 1 = front-facing
          if (vis < 0.05) continue; // cull near-invisible dots
          const dotR = 1.2 + vis * 1.8;
          const alpha = 0.08 + vis * 0.45;
          const gr = ctx.createRadialGradient(
            p.sx,
            p.sy,
            0,
            p.sx,
            p.sy,
            dotR * 3,
          );
          gr.addColorStop(0, `rgba(255,180,40,${alpha})`);
          gr.addColorStop(0.5, `rgba(232,90,10,${alpha * 0.5})`);
          gr.addColorStop(1, "rgba(232,90,10,0)");
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, dotR * 3, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }
        ctx.restore();
      },
    };
    sphere.init();

    // ── Layer 0: Ambient glow pools (drawn before everything else) ──────────
    const drawAmbient = () => {
      const pools = [
        // Bottom-left warm pool
        { cx: W * 0.15, cy: H * 0.85, r: W * 0.45, c: "200,60,5", a: 0.18 },
        // Top-right warm pool
        { cx: W * 0.82, cy: H * 0.18, r: W * 0.4, c: "245,130,20", a: 0.14 },
        // Center "breathing" pool — follows mouse slightly
        {
          cx: W * 0.5 + (mouse.x > 0 ? (mouse.x / W - 0.5) * 40 : 0),
          cy: H * 0.5 + (mouse.y > 0 ? (mouse.y / H - 0.5) * 20 : 0),
          r: W * 0.5,
          c: "180,50,0",
          a: 0.12,
        },
      ];
      pools.forEach(({ cx, cy, r, c, a }) => {
        const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gr.addColorStop(0, `rgba(${c},${a})`);
        gr.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, W, H);
      });
    };

    // ── Initialise particle pools ───────────────────────────────────────────
    const bokeh = Array.from({ length: CONFIG.N_BOKEH }, () => new Bokeh());
    const sparks = Array.from({ length: CONFIG.N_SPARKS }, () => new Spark());
    const scanLines = Array.from(
      { length: CONFIG.N_SCANLINES },
      () => new ScanLine(),
    );

    // ── Main render loop ────────────────────────────────────────────────────
    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      // 0 — solid background
      ctx.fillStyle = CONFIG.BG_COLOR;
      ctx.fillRect(0, 0, W, H);

      // 1 — ambient glow
      drawAmbient();

      // 2 — bokeh orbs (behind scan lines and sphere)
      bokeh.forEach((b) => {
        b.update();
        b.draw();
      });

      // 3 — scan lines (above bokeh)
      scanLines.forEach((s) => {
        s.update();
        s.draw();
      });

      // 4 — wireframe sphere (right-centre area)
      sphere.draw(
        W * CONFIG.SPHERE_X,
        H * CONFIG.SPHERE_Y,
        Math.min(W, H) * CONFIG.SPHERE_R,
      );

      // 5 — sparks on top of everything
      sparks.forEach((s) => {
        s.update();
        s.draw();
      });

      raf = requestAnimationFrame(loop);
    };
    loop();

    // ── Pause when scrolled out of view (saves battery / CPU) ──────────────
    const visObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!raf) loop();
          } else {
            cancelAnimationFrame(raf);
            raf = null;
          }
        });
      },
      { threshold: 0 },
    );
    visObs.observe(hero);

    // ── Cleanup on unmount ──────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      visObs.disconnect();
    };
  }, [canvasRef, containerRef]);
}

// ─── READY-MADE WRAPPER COMPONENT ────────────────────────────────────────────
/**
 * <HeroCanvasBackground>
 *
 * A plug-and-play wrapper. Renders the canvas behind any children you pass.
 * The wrapper fills its parent — make sure the parent has a defined height.
 *
 * Props:
 *   children    — your hero content (positioned above the canvas automatically)
 *   className   — extra class names for the outer div
 *   style       — inline styles for the outer div  (e.g. { minHeight: "100vh" })
 */
export function HeroCanvasBackground({ children, className = "", style = {} }) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  // Inject the tiny CSS once
  useEffect(() => {
    if (document.getElementById("hero-canvas-css")) return;
    const tag = document.createElement("style");
    tag.id = "hero-canvas-css";
    tag.textContent = CANVAS_CSS;
    document.head.appendChild(tag);
  }, []);

  useHeroCanvas(canvasRef, heroRef);

  return (
    <div
      ref={heroRef}
      className={`hero-canvas-root ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="hero-canvas-el" />
      <div className="hero-canvas-content">{children}</div>
    </div>
  );
}

// ─── USAGE EXAMPLES ──────────────────────────────────────────────────────────
/*

// ── Example A: wrapper component (simplest) ──────────────────────────────────
import { HeroCanvasBackground } from "./HeroCanvas"

function MyPage() {
  return (
    <HeroCanvasBackground style={{ minHeight: "100vh" }}>
      <h1 style={{ color: "#fff", position: "relative" }}>Hello World</h1>
    </HeroCanvasBackground>
  )
}


// ── Example B: hook only (full control over markup) ──────────────────────────
import { useRef } from "react"
import { useHeroCanvas } from "./HeroCanvas"

function MyHero() {
  const canvasRef = useRef(null)
  const heroRef   = useRef(null)
  useHeroCanvas(canvasRef, heroRef)

  return (
    <section
      ref={heroRef}
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1>Your content here</h1>
      </div>
    </section>
  )
}


// ── Customising colours / density ────────────────────────────────────────────
// Edit the CONFIG object at the top of HeroCanvas.jsx:
//
//   BG_COLOR:     "#120601"   → background fill colour
//   N_BOKEH:      38          → more = denser bokeh cloud
//   N_SPARKS:     18          → more = more bright particles
//   N_SCANLINES:  10          → more = busier scan-line effect
//   SPHERE_X/Y:   0.78 / 0.62 → reposition the sphere (0–1 fraction of canvas)
//   BOKEH_COLORS: [...]       → swap the 5 palette entries to retheme completely

*/
