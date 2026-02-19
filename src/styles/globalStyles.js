// ─── GLOBAL CSS STRING ────────────────────────────────────────────────────────
// Injected via <style>{GLOBAL_CSS}</style> in the root App component.
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

  :root {
    --bg:     #000509;
    --bg2:    #020c16;
    --card:   rgba(0,12,26,0.92);
    --cyan:   #00f5ff;
    --green:  #00ff9d;
    --red:    #ff1744;
    --orange: #ff6d00;
    --purple: #d500f9;
    --gold:   #ffd600;
    --txt:    #e0f7fa;
    --txt2:   #546e7a;
    --glow:   rgba(0,245,255,0.25);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'Rajdhani', sans-serif;
    background: var(--bg);
    color: var(--txt);
    overflow-x: hidden;
    font-size: 16px;
  }

  #root { min-height: 100vh; }

  /* ── GRID BACKGROUND ── */
  .pg-bg {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(0,245,255,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,245,255,.04) 1px, transparent 1px),
      linear-gradient(rgba(0,245,255,.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,245,255,.012) 1px, transparent 1px);
    background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
  }
  .pg-bg::after {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,245,255,.05) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 100% 50%, rgba(213,0,249,.04) 0%, transparent 60%);
  }

  /* ── SCANLINES ── */
  .scanlines {
    position: fixed; inset: 0; z-index: 1; pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,.06) 2px,
      rgba(0,0,0,.06) 4px
    );
  }

  /* ── AMBIENT ORBS ── */
  .orb {
    position: fixed; border-radius: 50%;
    filter: blur(120px); pointer-events: none; z-index: 0;
    animation: orbF 8s ease-in-out infinite;
  }

  /* ── KEYFRAMES ── */
  @keyframes orbF {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-40px) scale(1.08); }
  }
  @keyframes fuA {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%     { opacity: .4; transform: scale(1.6); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-14px); }
  }
  @keyframes scan {
    0%   { top: 0; opacity: .8; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes glitch {
    0%,90%,100% { transform: none; }
    92% { transform: translate(-2px, 1px); }
    94% { transform: translate(2px, -1px); }
    96% { transform: translate(-1px, 0); }
    98% { transform: translate(0, 1px); }
  }
  @keyframes popIn {
    from { transform: scale(.6); opacity: 0; }
    to   { transform: scale(1);  opacity: 1; }
  }
  @keyframes confFall {
    0%   { transform: translateY(-10px) rotate(0);    opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes turtleBob {
    from { transform: translateY(0); }
    to   { transform: translateY(-6px); }
  }
  @keyframes ticker {
    0%   { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  @keyframes scanlineScroll { 0%{background-position:0 0} 100%{background-position:0 100px} }
  @keyframes streamFall     { 0%{top:-300px;opacity:0} 10%{opacity:.7} 90%{opacity:.3} 100%{top:110vh;opacity:0} }
  @keyframes rowIn          { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
  @keyframes cardIn         { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cardGlow {
    0%,100% { box-shadow: 0 0 0 0 transparent; }
    50%     { box-shadow: 0 0 24px rgba(0,245,255,.12); }
  }
  @keyframes timerPulse     { 0%,100%{box-shadow:0 0 0 0 rgba(255,23,68,0)} 50%{box-shadow:0 0 0 6px rgba(255,23,68,.25)} }
  @keyframes avatarGlow     {
    0%,100% { box-shadow: 0 0 40px rgba(0,245,255,.25), 0 0 80px rgba(213,0,249,.15); }
    50%     { box-shadow: 0 0 60px rgba(0,245,255,.45), 0 0 100px rgba(213,0,249,.3); }
  }
  @keyframes statIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes dotPulse {
    0%,100% { box-shadow: 0 0 6px currentColor; }
    50%     { box-shadow: 0 0 14px currentColor; }
  }

  .nav-link-item { position: relative; }
  .nav-link-item::after {
    content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;
    background:#00f5ff;transition:width .3s;box-shadow:0 0 8px #00f5ff;
  }
  .nav-link-item:hover { color: #00f5ff !important; text-shadow: 0 0 12px rgba(0,245,255,0.6); }
  .nav-link-item:hover::after { width:100%; }

  .btn-p-hover:hover {
    box-shadow: 0 0 35px rgba(0,245,255,.45),inset 0 0 20px rgba(0,245,255,.1) !important;
    transform: translateY(-1px);
  }

  .ft-lk:hover { color: #00f5ff !important; }
  .soc-btn:hover { border-color:#00f5ff !important; color:#00f5ff !important; box-shadow:0 0 15px rgba(0,245,255,.2); }

  /* ── RESPONSIVE ── */
  @media (max-width:1100px) {
    .nav-cards-grid { grid-template-columns: repeat(2,1fr) !important; }
    .stats-strip-grid { grid-template-columns: repeat(3,1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
  }

  @media (max-width:900px) {
    .hero-section {
      flex-direction: column !important;
      padding: 100px 24px 60px !important;
      gap: 48px !important;
      min-height: auto !important;
    }
    .hero-left { max-width: 100% !important; }
    .hero-right-vis { display: none !important; }
    .nav-links-row { display: none !important; }
    .section-pad { padding: 52px 24px !important; }
    .nav-cards-grid { grid-template-columns: repeat(2,1fr) !important; }
    .flags-grid { grid-template-columns: repeat(2,1fr) !important; }
    .stats-strip-grid { grid-template-columns: 1fr !important; }
    .stats-row { flex-wrap: wrap !important; gap: 24px !important; }
    .footer-wrap { padding: 52px 24px 28px !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
    .nav-xp-streak { display: none !important; }
  }

  @media (max-width:600px) {
    .nav-cards-grid { grid-template-columns: 1fr !important; }
    .flags-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .hero-btns { flex-direction: column !important; }
  }
`;
