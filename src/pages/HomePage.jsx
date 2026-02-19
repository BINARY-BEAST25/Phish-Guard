import { useState, useEffect } from "react";

const RED_FLAGS = [
  {
    icon: "🔗",
    name: "Suspicious URLs",
    desc: "Attackers use lookalike domains with subtle swaps — 'paypa1.com' instead of 'paypal.com'. Always hover before clicking.",
    tip: "Hover to preview destination",
  },
  {
    icon: "⚡",
    name: "Urgency Tactics",
    desc: "Phrases like 'Act NOW' or 'Account suspended' bypass rational thinking and trigger impulsive clicks.",
    tip: "Take 60 seconds to verify",
  },
  {
    icon: "🏢",
    name: "Sender Spoofing",
    desc: "Display names can be faked. Always check the actual email address domain, not just the friendly name shown.",
    tip: "Expand sender details",
  },
  {
    icon: "📎",
    name: "Dangerous Attachments",
    desc: ".exe, .zip, .docx with macros — unexpected attachments are prime malware vectors. Don't open what you didn't request.",
    tip: "Scan before opening",
  },
  {
    icon: "🔗",
    name: "Credential Requests",
    desc: "Legitimate organizations never ask for passwords or 2FA codes via email. Any such request is a guaranteed red flag.",
    tip: "Never share via email",
  },
  {
    icon: "✍️",
    name: "Generic Greetings",
    desc: "'Dear valued customer' signals mass phishing. Your bank knows your name — impersonators usually don't.",
    tip: "Check for personalization",
  },
];

const T = {
  page: {
    background: "transparent", // background handled globally
    minHeight: "100vh",
    color: "#e0f7fa",
    fontFamily: "'Rajdhani', sans-serif",
    position: "relative",
    overflowX: "hidden",
  },
  card: {
    background:
      "linear-gradient(135deg,rgba(0,12,26,0.95) 0%,rgba(0,5,14,0.98) 100%)",
    border: "1px solid rgba(0,245,255,0.12)",
    borderRadius: 6,
    backdropFilter: "blur(24px)",
    position: "relative",
    overflow: "hidden",
    transition: "all .3s",
  },
  logo: {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 900,
    fontSize: "1.15rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#e0f7fa",
  },
  btnHP: {
    padding: "12px 28px",
    background: "transparent",
    border: "1px solid #00f5ff",
    borderRadius: 3,
    color: "#00f5ff",
    fontSize: ".85rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Share Tech Mono', monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    boxShadow: "0 0 25px rgba(0,245,255,.2),inset 0 0 25px rgba(0,245,255,.05)",
    display: "flex",
    alignItems: "center",
    gap: 8,
    position: "relative",
    overflow: "hidden",
    transition: "all .25s",
  },
  btnHS: {
    padding: "12px 26px",
    background: "rgba(255,255,255,.02)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: 3,
    color: "#e0f7fa",
    fontSize: ".85rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'Share Tech Mono', monospace",
    display: "flex",
    alignItems: "center",
    gap: 8,
    letterSpacing: "0.05em",
    transition: "all .25s",
  },
  secLbl: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: ".68rem",
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: "#00f5ff",
    marginBottom: 10,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  secTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "clamp(1.7rem,3.5vw,2.5rem)",
    fontWeight: 900,
    lineHeight: 1.15,
    marginBottom: 14,
    letterSpacing: "-0.02em",
  },
};

// ─── SCAN LINE ───────────────────────────────────────────────────────────────
function ScanLine() {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPos((p) => (p >= 100 ? 0 : p + 0.6)), 30);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(90deg,transparent,#00f5ff,transparent)",
        top: `${pos}%`,
        opacity: 0.8,
        boxShadow: "0 0 8px #00f5ff",
        borderRadius: 6,
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── EMAIL MOCK ──────────────────────────────────────────────────────────────
function EmailMock() {
  return (
    <div
      style={{
        background: "rgba(0,8,18,0.97)",
        border: "1px solid rgba(0,245,255,.2)",
        borderRadius: 6,
        padding: 22,
        width: 400,
        backdropFilter: "blur(24px)",
        position: "relative",
        boxShadow:
          "0 0 60px rgba(0,245,255,.1),0 40px 80px rgba(0,0,0,.7),inset 0 0 60px rgba(0,245,255,.02)",
        animation: "floatY 4s ease-in-out infinite",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: 6,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <ScanLine />
      </div>

      <div
        style={{
          position: "absolute",
          top: -10,
          left: 16,
          background: "#000509",
          padding: "0 8px",
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: ".6rem",
          color: "#00f5ff",
          letterSpacing: "0.15em",
          zIndex: 3,
        }}
      >
        THREAT ANALYSIS
      </div>

      {[
        { top: 6, left: 6, borderWidth: "1px 0 0 1px" },
        { top: 6, right: 6, borderWidth: "1px 1px 0 0" },
        { bottom: 6, left: 6, borderWidth: "0 0 1px 1px" },
        { bottom: 6, right: 6, borderWidth: "0 1px 1px 0" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 12,
            height: 12,
            borderColor: "rgba(0,245,255,0.4)",
            borderStyle: "solid",
            zIndex: 3,
            ...s,
          }}
        />
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(255,255,255,.06)",
          position: "relative",
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 4,
            background: "linear-gradient(135deg,#ff1744,#ff6d00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: ".9rem",
            fontWeight: 700,
            boxShadow: "0 0 15px rgba(255,23,68,0.4)",
            flexShrink: 0,
          }}
        >
          ⚠
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: ".78rem",
              color: "#546e7a",
            }}
          >
            From:{" "}
            <strong style={{ color: "#ff1744" }}>billing@paypa1.com</strong>
          </div>
          <div style={{ fontSize: ".85rem", fontWeight: 600 }}>
            🔴 URGENT: Verify Your Account
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 9px",
            background: "rgba(255,23,68,.1)",
            border: "1px solid rgba(255,23,68,.4)",
            borderRadius: 2,
            fontSize: ".68rem",
            color: "#ff1744",
            fontFamily: "'Share Tech Mono',monospace",
            animation: "blinkBorder 2s infinite",
            flexShrink: 0,
          }}
        >
          ⚠ SUSPICIOUS
        </div>
      </div>
      <p
        style={{
          fontSize: ".83rem",
          lineHeight: 1.7,
          color: "#546e7a",
          marginBottom: 14,
          position: "relative",
          zIndex: 4,
        }}
      >
        Dear valued customer, your account has been{" "}
        <strong style={{ color: "#ff1744" }}>suspended</strong>. Click
        immediately to restore access or lose your funds permanently.
      </p>
      <div
        style={{
          display: "block",
          padding: "7px 11px",
          background: "rgba(255,23,68,.06)",
          border: "1px solid rgba(255,23,68,.2)",
          borderRadius: 4,
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: ".74rem",
          color: "#ff1744",
          marginBottom: 14,
          cursor: "pointer",
          wordBreak: "break-all",
          position: "relative",
          zIndex: 4,
        }}
      >
        http://secure-paypal-verify.xyz/login?token=a8c...
      </div>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", position: "relative", zIndex: 4 }}>
        {[
          { label: "⚠ Fake Domain", cls: "red" },
          { label: "⚠ Urgency", cls: "red" },
          { label: "🔗 Bad URL", cls: "orange" },
        ].map(({ label, cls }) => (
          <span
            key={label}
            style={{
              padding: "3px 9px",
              borderRadius: 2,
              fontSize: ".68rem",
              fontFamily: "'Share Tech Mono',monospace",
              background:
                cls === "red" ? "rgba(255,23,68,.1)" : "rgba(255,109,0,.1)",
              border:
                cls === "red"
                  ? "1px solid rgba(255,23,68,.35)"
                  : "1px solid rgba(255,109,0,.35)",
              color: cls === "red" ? "#ff1744" : "#ff6d00",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── NAV CARD ────────────────────────────────────────────────────────────────
function NavCard({ icon, title, desc, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...T.card,
        padding: 28,
        cursor: "pointer",
        textAlign: "center",
        borderColor: hov ? "rgba(0,245,255,.35)" : "rgba(0,245,255,0.12)",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 0 40px rgba(0,245,255,.08)" : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {hov && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,rgba(0,245,255,.04),transparent)",
            borderRadius: 6,
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{icon}</div>
        <div
          style={{
            fontFamily: "'Orbitron',sans-serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: ".82rem", color: "#546e7a", lineHeight: 1.5 }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

// ─── RED FLAG CARD ───────────────────────────────────────────────────────────
function RedFlagCard({ icon, name, desc, tip }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...T.card,
        padding: 26,
        cursor: "pointer",
        borderColor: hov ? "rgba(255,23,68,.4)" : "rgba(0,245,255,0.12)",
        boxShadow: hov ? "0 0 30px rgba(255,23,68,.1)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg,#ff1744,#ff6d00)",
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform .3s",
          borderRadius: "6px 6px 0 0",
        }}
      />
      <span style={{ fontSize: "1.7rem", marginBottom: 12, display: "block" }}>
        {icon}
      </span>
      <div
        style={{
          fontFamily: "'Orbitron',sans-serif",
          fontSize: ".95rem",
          fontWeight: 700,
          marginBottom: 7,
          color: "#ff1744",
          textShadow: "0 0 10px rgba(255,23,68,.3)",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: ".83rem",
          color: "#546e7a",
          lineHeight: 1.6,
          marginBottom: 9,
          flex: 1,
        }}
      >
        {desc}
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "3px 11px",
          borderRadius: 100,
          fontSize: ".72rem",
          fontFamily: "'Share Tech Mono',monospace",
          background: "rgba(0,255,157,.08)",
          border: "1px solid rgba(0,255,157,.2)",
          color: "#00ff9d",
          alignSelf: "flex-start",
        }}
      >
        ✓ {tip}
      </span>
    </div>
  );
}

// ─── STAT ITEM ───────────────────────────────────────────────────────────────
function StatItem({ num, lbl }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          fontFamily: "'Orbitron',sans-serif",
          fontSize: "1.6rem",
          fontWeight: 900,
          color: "#00f5ff",
          display: "block",
          textShadow: "0 0 25px rgba(0,245,255,.6)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: ".68rem",
          color: "#546e7a",
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontFamily: "'Share Tech Mono',monospace",
          marginTop: 4,
        }}
      >
        {lbl}
      </span>
    </div>
  );
}

// ─── STAT DIVIDER ────────────────────────────────────────────────────────────
function StatDivider() {
  return (
    <div
      style={{
        width: 1,
        height: 40,
        background: "rgba(0,245,255,.1)",
        flexShrink: 0,
      }}
    />
  );
}

// ─── MAIN HOMEPAGE ───────────────────────────────────────────────────────────
export function HomePage({ setPage: setPageProp }) {
  const [currentPage, setCurrentPage] = useState("home");
  const [navScrolled, setNavScrolled] = useState(false);

  const setPage = setPageProp || setCurrentPage;

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!setPageProp && currentPage !== "home") {
    return (
      <div style={{
        ...T.page,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: 24,
        zIndex: 10,
        position: "relative",
      }}>
        <div style={{
          fontFamily: "'Orbitron',sans-serif",
          fontSize: "2rem",
          color: "#00f5ff",
          textShadow: "0 0 30px rgba(0,245,255,.5)",
        }}>
          {currentPage.toUpperCase()} PAGE
        </div>
        <p style={{ color: "#546e7a", fontFamily: "'Share Tech Mono',monospace" }}>
          This page would be rendered here in the full app.
        </p>
        <button
          style={T.btnHP}
          onClick={() => setCurrentPage("home")}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ ...T.page }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 62,
          background: navScrolled ? "rgba(0,5,9,0.98)" : "rgba(0,5,9,0.92)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(0,245,255,.15)",
          boxShadow: "0 1px 30px rgba(0,245,255,0.08),inset 0 -1px 0 rgba(0,245,255,0.1)",
          transition: "background .3s",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg,transparent,#00f5ff,#d500f9,#00f5ff,transparent)",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            ...T.logo,
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "glitch 8s infinite",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onClick={() => setPage("home")}
        >
          <svg
            viewBox="0 0 36 36"
            fill="none"
            width={34}
            height={34}
            style={{ filter: "drop-shadow(0 0 12px #00f5ff)" }}
          >
            <path
              d="M18 2L4 8v12c0 8 6.67 14.93 14 16 7.33-1.07 14-7.99 14-16V8L18 2z"
              fill="rgba(0,229,255,.1)"
              stroke="#00e5ff"
              strokeWidth="1.5"
            />
            <path
              d="M12 18l4 4 8-8"
              stroke="#00e5ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Phish
          <span style={{ color: "#00f5ff", textShadow: "0 0 20px #00f5ff" }}>
            Guard
          </span>
        </div>

        <ul
          className="nav-links-row"
          style={{
            display: "flex",
            listStyle: "none",
            gap: 24,
            margin: "0 auto",
          }}
        >
          {[
            ["Home", "home"],
            ["Simulator", "simulator"],
            ["Quiz", "quiz"],
            ["🏆 Leaderboard", "leaderboard"],
            ["Gallery", "gallery"],
            ["My Progress", "progress"],
          ].map(([label, pg]) => (
            <li key={pg}>
              <a
                href="#"
                className="nav-link-item"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(pg);
                }}
                style={{
                  color: "#546e7a",
                  textDecoration: "none",
                  fontSize: ".78rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'Share Tech Mono',monospace",
                  transition: "color .2s",
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="nav-right"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            className="nav-xp-streak"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px",
              background: "rgba(0,245,255,.06)",
              border: "1px solid rgba(0,245,255,.25)",
              borderRadius: 4,
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: ".72rem",
              color: "#00f5ff",
              boxShadow: "0 0 12px rgba(0,245,255,.1),inset 0 0 12px rgba(0,245,255,.03)",
              whiteSpace: "nowrap",
            }}
          >
            ⚡ 1250 XP
          </div>
          <div
            className="nav-xp-streak"
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: ".72rem",
              color: "#ff6d00",
              whiteSpace: "nowrap",
            }}
          >
            🔥 5 day streak
          </div>
          <button
            className="btn-p-hover"
            onClick={() => setPage("quiz")}
            style={{
              padding: "7px 20px",
              background: "transparent",
              border: "1px solid #00f5ff",
              borderRadius: 3,
              color: "#00f5ff",
              fontSize: ".78rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Share Tech Mono',monospace",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(0,245,255,.2),inset 0 0 20px rgba(0,245,255,.05)",
              position: "relative",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "all .25s",
            }}
          >
            Start Quiz
          </button>
        </div>
      </nav>

      <div
        style={{
          position: "fixed",
          top: 64,
          right: 0,
          zIndex: 999,
          background: "linear-gradient(135deg,#d500f9,#8b00e8)",
          color: "white",
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: ".65rem",
          padding: "4px 16px 4px 10px",
          letterSpacing: "0.1em",
          clipPath: "polygon(8px 0,100% 0,100% 100%,0 100%)",
          boxShadow: "0 0 20px rgba(213,0,249,0.4)",
        }}
      >
        🏆 HACKATHON BUILD
      </div>

      <section
        className="hero-section"
        style={{
          padding: "0 80px",
          paddingTop: 62,
          display: "flex",
          alignItems: "center",
          gap: 60,
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="hero-left"
          style={{ flex: 1, maxWidth: 580, animation: "fuA .6s ease both" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px",
              background: "rgba(0,245,255,.05)",
              border: "1px solid rgba(0,245,255,.25)",
              borderRadius: 2,
              fontSize: ".7rem",
              color: "#00f5ff",
              fontFamily: "'Share Tech Mono',monospace",
              marginBottom: 22,
              letterSpacing: "0.12em",
              boxShadow: "0 0 20px rgba(0,245,255,0.1)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00ff9d",
                boxShadow: "0 0 12px #00ff9d",
                animation: "pulse 2s infinite",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            LIVE THREAT DETECTION ACTIVE
          </div>

          <h1
            style={{
              fontFamily: "'Orbitron',sans-serif",
              fontSize: "clamp(2.4rem,5vw,4.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 24,
              animation: "fuA .6s .1s ease both",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ display: "block" }}>
              Detect{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#00f5ff,#00ff9d)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(0,245,255,0.4))",
                }}
              >
                Phishing
              </span>
            </span>
            <span style={{ display: "block", marginTop: 6, fontSize: "0.9em", color: "#90a4ae" }}>
              Before It
            </span>
            <span
              style={{
                display: "block",
                marginTop: 6,
                color: "#ff1744",
                textShadow: "0 0 30px rgba(255,23,68,0.5)",
              }}
            >
              Detects You
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#546e7a",
              lineHeight: 1.8,
              marginBottom: 32,
              fontWeight: 400,
              animation: "fuA .6s .2s ease both",
            }}
          >
            Master cybersecurity through gamified simulations, real-world
            phishing scenarios, and adaptive learning. Level up your digital
            defenses.
          </p>

          <div
            className="hero-btns"
            style={{
              display: "flex",
              gap: 14,
              marginBottom: 44,
              flexWrap: "wrap",
              animation: "fuA .6s .3s ease both",
            }}
          >
            <button style={T.btnHP} onClick={() => setPage("simulator")}>
              ⚡ Start Simulation
            </button>
            <button style={T.btnHS} onClick={() => setPage("quiz")}>
              📖 Take Adaptive Quiz
            </button>
          </div>

          <div
            className="stats-row"
            style={{
              display: "flex",
              gap: 36,
              animation: "fuA .6s .4s ease both",
              alignItems: "center",
            }}
          >
            <StatItem num="3.4B" lbl="Phishing emails/day" />
            <StatDivider />
            <StatItem num="92%" lbl="Malware via email" />
            <StatDivider />
            <StatItem num="50K+" lbl="Users trained" />
          </div>
        </div>

        <div
          className="hero-right-vis"
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 460,
            animation: "fuA .6s .2s ease both",
          }}
        >
          <EmailMock />

          <div
            style={{
              position: "absolute",
              top: "8%",
              right: -15,
              background: "rgba(0,8,18,.98)",
              borderRadius: 4,
              padding: "11px 15px",
              border: "1px solid rgba(0,255,157,.3)",
              color: "#00ff9d",
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: ".75rem",
              letterSpacing: "0.08em",
              boxShadow: "0 0 20px rgba(0,255,157,.15)",
              animation: "fuA .6s .5s ease both",
            }}
          >
            🛡️ THREAT BLOCKED
            <br />
            <small style={{ color: "#546e7a" }}>Risk Score: 94/100</small>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "12%",
              left: -25,
              background: "rgba(0,8,18,.98)",
              borderRadius: 4,
              padding: "11px 15px",
              border: "1px solid rgba(255,23,68,.3)",
              animation: "floatY 6s 2s ease-in-out infinite",
              backdropFilter: "blur(24px)",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                fontSize: ".68rem",
                color: "#546e7a",
                marginBottom: 3,
                fontFamily: "'Share Tech Mono',monospace",
                letterSpacing: "0.08em",
              }}
            >
              FLAGS DETECTED
            </div>
            <div
              style={{
                fontFamily: "'Orbitron',sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#ff1744",
                textShadow: "0 0 15px rgba(255,23,68,.5)",
              }}
            >
              6 Red Flags
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-pad"
        style={{ padding: "60px 80px", position: "relative", zIndex: 2 }}
      >
        <div
          className="nav-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {[
            { icon: "🎯", title: "Real-vs-Fake Sim", desc: "Compare real and phishing emails side-by-side", page: "simulator" },
            { icon: "🧠", title: "Adaptive Quiz", desc: "Questions get harder as you improve", page: "quiz" },
            { icon: "🏆", title: "Leaderboard", desc: "Rank against global defenders", page: "leaderboard" },
            { icon: "🖼️", title: "Community Gallery", desc: "Browse real phishing examples submitted by users", page: "gallery" },
          ].map((c) => (
            <NavCard key={c.title} {...c} onClick={() => setPage(c.page)} />
          ))}
        </div>
      </section>

      <div
        className="stats-strip-grid"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          background: "rgba(0,245,255,.07)",
          borderTop: "1px solid rgba(0,245,255,.07)",
          borderBottom: "1px solid rgba(0,245,255,.07)",
        }}
      >
        {[
          { num: "3.4B", sub: "Phishing emails sent daily worldwide" },
          { num: "92%", sub: "Of malware delivered via email" },
          { num: "$4.9T", sub: "Global cybercrime cost by 2025" },
        ].map(({ num, sub }, idx) => (
          <div
            key={num}
            style={{
              background: "#000509",
              padding: "52px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              borderRight: idx < 2 ? "1px solid rgba(0,245,255,.07)" : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 0%,rgba(0,245,255,.04),transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                fontFamily: "'Orbitron',sans-serif",
                fontSize: "3.2rem",
                fontWeight: 900,
                color: "#00f5ff",
                display: "block",
                textShadow: "0 0 40px rgba(0,245,255,.5)",
                lineHeight: 1,
              }}
            >
              {num}
            </span>
            <div
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: ".72rem",
                color: "#546e7a",
                textTransform: "uppercase",
                letterSpacing: ".15em",
                marginTop: 12,
                maxWidth: 220,
              }}
            >
              {sub}
            </div>
          </div>
        ))}
      </div>

      <section
        className="section-pad"
        style={{
          padding: "80px 80px",
          background: "linear-gradient(180deg,transparent,rgba(0,8,18,.6),transparent)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ marginBottom: 52 }}>
          <div style={T.secLbl}>
            <span style={{ color: "rgba(0,245,255,0.4)" }}>//</span> THREAT INDICATORS
          </div>
          <h2 style={T.secTitle}>
            Know the{" "}
            <span style={{ color: "#ff1744", textShadow: "0 0 20px rgba(255,23,68,0.4)" }}>
              Red Flags
            </span>
          </h2>
          <p style={{ fontSize: ".95rem", color: "#546e7a", lineHeight: 1.8, maxWidth: 540 }}>
            Master these 6 universal phishing indicators to protect yourself from 95% of attacks.
          </p>
        </div>
        <div
          className="flags-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {RED_FLAGS.map((f) => (
            <RedFlagCard key={f.name} {...f} />
          ))}
        </div>
      </section>

      <footer
        className="footer-wrap"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "72px 80px 36px",
          background: "linear-gradient(180deg,transparent,rgba(0,5,9,.98))",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg,transparent,#00f5ff,#d500f9,#00f5ff,transparent)",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 56,
            marginBottom: 56,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                ...T.logo,
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "1.2rem",
                animation: "glitch 8s infinite",
              }}
            >
              <svg
                viewBox="0 0 36 36"
                fill="none"
                width={28}
                height={28}
                style={{ filter: "drop-shadow(0 0 10px #00f5ff)", flexShrink: 0 }}
              >
                <path
                  d="M18 2L4 8v12c0 8 6.67 14.93 14 16 7.33-1.07 14-7.99 14-16V8L18 2z"
                  fill="rgba(0,229,255,.1)"
                  stroke="#00e5ff"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 18l4 4 8-8"
                  stroke="#00e5ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Phish
              <span style={{ color: "#00f5ff", textShadow: "0 0 18px #00f5ff" }}>Guard</span>
            </div>
            <p
              style={{
                fontSize: ".85rem",
                color: "#546e7a",
                lineHeight: 1.8,
                marginTop: 12,
                maxWidth: 250,
              }}
            >
              Empowering internet users with skills to identify, avoid, and report phishing attacks.
            </p>
            <div style={{ display: "flex", gap: 9, marginTop: 18 }}>
              {["𝕏", "in", "gh", "yt"].map((s) => (
                <a
                  key={s}
                  className="soc-btn"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 4,
                    border: "1px solid rgba(0,245,255,.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: ".88rem",
                    cursor: "pointer",
                    color: "#546e7a",
                    textDecoration: "none",
                    transition: "all .2s",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {[
            [
              "Platform",
              [
                { label: "Simulator", page: "simulator" },
                { label: "Quiz", page: "quiz" },
                { label: "Leaderboard", page: "leaderboard" },
                { label: "Gallery", page: "gallery" },
              ],
            ],
            [
              "Resources",
              [
                { label: "Checklist PDF", page: null },
                { label: "Report Phishing", page: null },
                { label: "FAQ", page: null },
                { label: "CISA Guidance", page: null },
              ],
            ],
            [
              "Contact",
              [
                { label: "hello@phishguard.io", page: null },
                { label: "About Us", page: null },
                { label: "Privacy Policy", page: null },
              ],
            ],
          ].map(([title, items]) => (
            <div key={title}>
              <div
                style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: ".75rem",
                  fontWeight: 700,
                  marginBottom: 14,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#00f5ff",
                }}
              >
                {title}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {items.map(({ label, page }) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="ft-lk"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page) setPage(page);
                      }}
                      style={{
                        fontSize: ".82rem",
                        color: "#546e7a",
                        textDecoration: "none",
                        fontFamily: "'Share Tech Mono',monospace",
                        transition: "color .2s",
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 26,
            borderTop: "1px solid rgba(255,255,255,.04)",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: ".75rem",
              color: "#546e7a",
              fontFamily: "'Share Tech Mono',monospace",
              flexShrink: 0,
            }}
          >
            © 2026 PhishGuard. Protecting internet users worldwide.
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "5px 13px",
              background: "rgba(255,23,68,.06)",
              border: "1px solid rgba(255,23,68,.18)",
              borderRadius: 3,
              fontSize: ".7rem",
              fontFamily: "'Share Tech Mono',monospace",
              color: "#ff1744",
              overflow: "hidden",
              maxWidth: 340,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#ff1744",
                boxShadow: "0 0 8px #ff1744",
                flexShrink: 0,
                animation: "pulse 1.5s infinite",
              }}
            />
            <div style={{ overflow: "hidden" }}>
              <span
                style={{
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  animation: "ticker 14s linear infinite",
                }}
              >
                LIVE: 3.4B phishing emails today · 47,291 new phishing sites detected · Stay vigilant · Never click unverified links
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── DEFAULT EXPORT (standalone app entry point) ─────────────────────────────
export default function App() {
  return <HomePage />;
}
