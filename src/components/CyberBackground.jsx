import React, { useState, useEffect, useRef, memo } from "react";

// ─── CANVAS: MATRIX RAIN ─────────────────────────────────────────────────────
export const MatrixCanvas = memo(function MatrixCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトNULL PHISHGUARD XOR AES SHA256 EXPLOIT PAYLOAD THREAT DETECT VOID";
    let W, H, drops;
    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const cols = Math.floor(W / 12);
      drops = Array.from({ length: cols }, () => (Math.random() * -H) / 12);
    };
    const draw = () => {
      ctx.fillStyle = "rgba(0,5,9,0.048)";
      ctx.fillRect(0, 0, W, H);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        if (y > 0) {
          ctx.font = "bold 12px 'Share Tech Mono', monospace";
          ctx.fillStyle = i % 4 === 0 ? "#00ff9d" : i % 6 === 0 ? "#d500f9" : "#00f5ff";
          ctx.globalAlpha = 0.85;
          ctx.fillText(char, i * 12, y * 12);
          for (let t = 1; t < 10; t++) {
            ctx.globalAlpha = (1 - t / 10) * 0.4;
            ctx.font = "11px 'Share Tech Mono', monospace";
            ctx.fillStyle = "#00f5ff";
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 12, (y - t) * 12);
          }
        }
        ctx.globalAlpha = 1;
        if (y * 12 > H && Math.random() > 0.972) drops[i] = 0;
        drops[i] += 0.5 + Math.random() * 0.2;
      });
    };
    init();
    window.addEventListener("resize", init);
    const id = setInterval(draw, 50);
    return () => { clearInterval(id); window.removeEventListener("resize", init); };
  }, []);
  return (
    <canvas ref={ref} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none", opacity: 0.045,
    }} />
  );
});

// ─── CANVAS: PARTICLE NETWORK ────────────────────────────────────────────────
export const ParticleCanvas = memo(function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];
    let mouse = { x: -9999, y: -9999 };
    let targetDark = { x: -9999, y: -9999 };
    let currentDark = { x: -9999, y: -9999 };
    const CONN = 120, MDIST = 150, DARK_R = 220;
    const CONN_SQ = CONN * CONN;
    const MDIST_SQ = MDIST * MDIST;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const initP = () => {
      resize();
      const n = Math.floor((W * H) / 16000);
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.4,
        color: Math.random() > 0.65 ? [255, 23, 68] : Math.random() > 0.4 ? [0, 245, 255] : Math.random() > 0.5 ? [0, 255, 157] : [213, 0, 249],
        pulse: Math.random() * Math.PI * 2,
      }));
    };
    initP();

    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; targetDark.x = e.clientX; targetDark.y = e.clientY; };
    const onLeave = () => { targetDark.x = -9999; targetDark.y = -9999; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", initP);

    let raf;
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      currentDark.x += (targetDark.x - currentDark.x) * 0.1;
      currentDark.y += (targetDark.y - currentDark.y) * 0.1;
      if (currentDark.x > -500) {
        const grad = ctx.createRadialGradient(currentDark.x, currentDark.y, 0, currentDark.x, currentDark.y, DARK_R);
        grad.addColorStop(0, "rgba(0,0,0,0.82)"); grad.addColorStop(0.35, "rgba(0,0,0,0.6)");
        grad.addColorStop(0.65, "rgba(0,0,0,0.25)"); grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
      }
      particles.forEach((p) => {
        p.pulse += 0.018;
        const mdx = mouse.x - p.x, mdy = mouse.y - p.y;
        const md_sq = mdx * mdx + mdy * mdy;
        if (md_sq < MDIST_SQ) {
          const md = Math.sqrt(md_sq);
          p.vx += (mdx / md) * 0.012; p.vy += (mdy / md) * 0.012;
        }
        p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONN_SQ) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / CONN) * 0.22;
            const [r, g, bl] = a.color;
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`; ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const p = particles[i];
        const mdx2 = p.x - mouse.x, mdy2 = p.y - mouse.y;
        const md2_sq = mdx2 * mdx2 + mdy2 * mdy2;
        if (md2_sq < MDIST_SQ) {
          const md2 = Math.sqrt(md2_sq);
          const alpha = (1 - md2 / MDIST) * 0.55;
          const [r, g, bl] = p.color;
          ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`; ctx.lineWidth = 0.9;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      particles.forEach((p) => {
        const [r, g, b] = p.color;
        const pr = p.r * (0.75 + Math.sin(p.pulse) * 0.25);
        ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`; ctx.shadowBlur = 7;
        ctx.fill(); ctx.shadowBlur = 0;
      });
      if (mouse.x > -500) {
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,245,255,0.9)"; ctx.lineWidth = 1.5;
        ctx.shadowColor = "#00f5ff"; ctx.shadowBlur = 12; ctx.stroke(); ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,245,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", initP);
    };
  }, []);
  return (
    <canvas ref={ref} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none", opacity: 0.9,
    }} />
  );
});

// ─── CANVAS: HEX GRID ────────────────────────────────────────────────────────
export const HexCanvas = memo(function HexCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, t = 0, raf;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const hex = (x, y, s, a) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        ctx.lineTo(x + s * Math.cos(angle), y + s * Math.sin(angle));
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,245,255,${a})`; ctx.lineWidth = 0.5; ctx.stroke();
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += 0.004;
      const s = 42, hx = s * Math.sqrt(3), hy = s * 1.5;
      const cols = Math.ceil(W / hx) + 2, rows = Math.ceil(H / hy) + 2;
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * hx + (r % 2 === 0 ? hx / 2 : 0), y = r * hy;
          const dx = (x - W / 2) / W, dy = (y - H / 2) / H;
          const d2 = dx * dx + dy * dy;
          const dist = Math.sqrt(d2);
          const wave = Math.abs(Math.sin(dist * 5 - t * 2));
          const a = (0.25 + 0.75 * (1 - dist)) * wave * 0.55;
          if (a > 0.005) hex(x, y, s - 4, a);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={ref} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none", opacity: 0.065,
    }} />
  );
});

// ─── LIGHTNING STREAKS ───────────────────────────────────────────────────────
export const LightningStreaks = memo(function LightningStreaks() {
  const [streaks, setStreaks] = useState([]);
  useEffect(() => {
    let id = 0;
    const spawn = () => {
      const newId = id++;
      const colors = ["rgba(0,245,255,", "rgba(0,255,157,", "rgba(213,0,249,", "rgba(255,23,68,"];
      const c = colors[Math.floor(Math.random() * colors.length)];
      const h = 80 + Math.random() * 220;
      const streak = { id: newId, left: Math.random() * 100, height: h, color: c, duration: 2.5 + Math.random() * 5, delay: Math.random() * 0.5 };
      setStreaks((s) => [...s.slice(-14), streak]);
      setTimeout(() => setStreaks((s) => s.filter((x) => x.id !== newId)), 8000);
    };
    for (let i = 0; i < 8; i++) setTimeout(spawn, i * 400);
    const interval = setInterval(() => { if (Math.random() > 0.3) spawn(); }, 600);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {streaks.map((s) => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.left}%`, width: 1, height: s.height, top: -s.height,
          background: `linear-gradient(180deg, transparent, ${s.color}0.9), ${s.color}0.4), transparent)`,
          boxShadow: `0 0 4px ${s.color}0.6)`, borderRadius: 1,
          animation: `streamFall ${s.duration}s ${s.delay}s linear forwards`,
        }} />
      ))}
    </div>
  );
});

// ─── CYBER BACKGROUND ────────────────────────────────────────────────────────
export const CyberBackground = memo(function CyberBackground() {
  return (
    <>
      <MatrixCanvas />
      <ParticleCanvas />
      <HexCanvas />
      <LightningStreaks />

      {/* Scanlines */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
        animation: "scanlineScroll 8s linear infinite",
      }} />

      {/* Ambient orbs */}
      {[
        { w: 800, h: 800, bg: "rgba(0,245,255,0.09)", top: -250, left: -250,  delay: "0s"  },
        { w: 600, h: 600, bg: "rgba(213,0,249,0.1)",  top: "40%", right: -220, delay: "-3s" },
        { w: 500, h: 500, bg: "rgba(0,255,157,0.06)", bottom: "5%", left: "15%", delay: "-6s" },
        { w: 380, h: 380, bg: "rgba(255,23,68,0.07)", top: "55%", left: "8%",  delay: "-2s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "fixed", borderRadius: "50%", filter: "blur(120px)",
          pointerEvents: "none", zIndex: 0,
          width: o.w, height: o.h, background: o.bg,
          top: o.top ?? "auto", left: o.left ?? "auto",
          right: o.right ?? "auto", bottom: o.bottom ?? "auto",
          animation: `orbF 8s ${o.delay} ease-in-out infinite`,
        }} />
      ))}

      {/* Dot / line grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(0,245,255,.04) 1px,transparent 1px),
          linear-gradient(90deg,rgba(0,245,255,.04) 1px,transparent 1px),
          linear-gradient(rgba(0,245,255,.015) 1px,transparent 1px),
          linear-gradient(90deg,rgba(0,245,255,.015) 1px,transparent 1px)`,
        backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
      }} />

      {/* Radial ambient gradients */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%,rgba(0,245,255,0.04) 0%,transparent 60%),
          radial-gradient(ellipse 40% 40% at 100% 50%,rgba(213,0,249,0.04) 0%,transparent 60%)`,
      }} />
    </>
  );
});
