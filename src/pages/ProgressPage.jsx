import React from "react";
import { T } from "../styles";
import { BADGES } from "../constants";
import { XPBar } from "../components";

const MODULES = [
  { name: "Email Phishing Basics",       sub: "5 levels completed",       status: "done"   },
  { name: "Red Flag Identification",     sub: "6 levels completed",       status: "done"   },
  { name: "SMS / Smishing",             sub: "Level 2 of 5 in progress", status: "active" },
  { name: "Spear Phishing",             sub: "Unlock at Level 10",       status: "locked" },
  { name: "Advanced Social Engineering", sub: "Unlock at Level 15",       status: "locked" },
];

const ACTIVITY_STATS = [
  ["Quizzes Completed", "23",      "#00f5ff"],
  ["Simulations Done",  "8",       "#00ff9d"],
  ["Streak Record",     "12 days", "#ff6d00"],
  ["Community Flags",   "15",      "#d500f9"],
];

function dotColor(s)  { return s === "done" ? "#00ff9d" : s === "active" ? "#00f5ff" : "#546e7a"; }
function badgeText(s) { return s === "done" ? "✓ DONE"  : s === "active" ? "→ ACTIVE" : "🔒 LOCKED"; }

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "Orbitron, sans-serif", fontSize: ".85rem", fontWeight: 700,
      marginBottom: 20, color: "#00f5ff", letterSpacing: "0.08em",
    }}>
      // {children}
    </div>
  );
}

// ─── PROGRESS PAGE ────────────────────────────────────────────────────────────
export function ProgressPage({ xp, level, xpPct, xpToNext }) {
  return (
    <div style={{
      ...T.page,
      background: "#000509",
      minHeight:  "100vh",
      position:   "relative",
      overflowX:  "hidden",
    }}>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes avatarGlow     {
          0%,100% { box-shadow: 0 0 40px rgba(0,245,255,.25), 0 0 80px rgba(213,0,249,.15); }
          50%     { box-shadow: 0 0 60px rgba(0,245,255,.45), 0 0 100px rgba(213,0,249,.3); }
        }
        @keyframes statIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 2, padding: "80px 60px 60px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Profile header ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 28, marginBottom: 48,
          flexWrap: "wrap", animation: "fuA .5s ease both",
        }}>
          {/* Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: 6,
            background: "linear-gradient(135deg,#00f5ff,#d500f9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Orbitron, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#000",
            animation: "avatarGlow 4s ease-in-out infinite",
            flexShrink: 0,
          }}>
            CK
          </div>

          <div>
            <h2 style={{
              fontFamily: "Orbitron, sans-serif", fontSize: "1.5rem", fontWeight: 800,
              marginBottom: 6, letterSpacing: "-0.01em",
            }}>
              CyberKnight_99
            </h2>
            <p style={{ color: "#546e7a", fontFamily: "Share Tech Mono, monospace", fontSize: ".82rem" }}>
              Level {level} · Awareness Recruit · Joined 60 days ago
            </p>
            {/* Live status dot */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#00ff9d", boxShadow: "0 0 10px #00ff9d",
                display: "inline-block", animation: "pulse 2s infinite",
              }} />
              <span style={{ fontFamily: "Share Tech Mono, monospace", fontSize: ".68rem", color: "#00ff9d", letterSpacing: "0.1em" }}>
                ONLINE · ACTIVE SESSION
              </span>
            </div>
          </div>

          {/* Global rank */}
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{
              fontFamily: "Share Tech Mono, monospace", fontSize: ".72rem",
              color: "#546e7a", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Global Rank
            </div>
            <div style={{
              fontFamily: "Orbitron, sans-serif", fontSize: "2.4rem", fontWeight: 800,
              color: "#ffd600", textShadow: "0 0 30px rgba(255,214,0,0.5)", lineHeight: 1,
            }}>
              #47
            </div>
            <div style={{
              fontFamily: "Share Tech Mono, monospace", fontSize: ".68rem",
              color: "#546e7a", marginTop: 4,
            }}>
              Top 5% worldwide
            </div>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
          {[
            ["⚡", xp.toLocaleString(), "Total XP",      "#00f5ff"],
            ["🔥", "5",                 "Day Streak",    "#ff6d00"],
            ["🎯", "87%",               "Accuracy",      "#00ff9d"],
            ["📧", "34",               "Emails Flagged", "#d500f9"],
          ].map(([icon, val, lbl, color], idx) => (
            <div
              key={lbl}
              style={{
                ...T.card,
                padding: "24px 20px",
                textAlign: "center",
                animation: `statIn .5s ${idx * 0.08}s ease both`,
                borderColor: `${color}22`,
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                borderRadius: "6px 6px 0 0", opacity: 0.7,
              }} />
              <span style={{ fontSize: "2rem", display: "block", marginBottom: 8 }}>{icon}</span>
              <div style={{
                fontFamily: "Orbitron, sans-serif", fontSize: "1.6rem", fontWeight: 800,
                color, marginBottom: 4, textShadow: `0 0 20px ${color}60`,
              }}>
                {val}
              </div>
              <div style={{
                fontSize: ".72rem", color: "#546e7a",
                fontFamily: "Share Tech Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {lbl}
              </div>
            </div>
          ))}
        </div>

        {/* ── Two-column layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* ── LEFT col: badges + learning map ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Badge rack */}
            <div style={{ ...T.card, padding: 28 }}>
              <SectionLabel>ACHIEVEMENT BADGES</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                {BADGES.map((b, idx) => (
                  <div
                    key={b.name}
                    title={b.name + (b.prog ? " · " + b.prog : "")}
                    style={{
                      textAlign: "center",
                      padding:   "14px 8px",
                      borderRadius: 6,
                      cursor:    b.earned ? "pointer" : "default",
                      transition: "all .2s",
                      animation: `statIn .4s ${idx * 0.04}s ease both`,
                      ...(b.earned
                        ? {
                            background: "linear-gradient(135deg,rgba(0,245,255,.06),rgba(0,12,26,0.95))",
                            border:     "1px solid rgba(0,245,255,.25)",
                            boxShadow:  "0 0 20px rgba(0,245,255,.06)",
                          }
                        : {
                            background: "rgba(0,5,14,0.8)",
                            border:     "1px solid rgba(255,255,255,.06)",
                            opacity:    0.5,
                            filter:     "grayscale(0.8)",
                          }),
                    }}
                  >
                    <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{b.icon}</div>
                    <div style={{
                      fontFamily: "Share Tech Mono, monospace", fontSize: ".6rem",
                      color: b.earned ? "#e0f7fa" : "#546e7a",
                    }}>
                      {b.name}
                    </div>
                    {!b.earned && b.prog && (
                      <div style={{ fontSize: ".58rem", color: "#546e7a", marginTop: 2 }}>{b.prog}</div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 16, padding: "10px 14px",
                background: "rgba(0,245,255,.04)", border: "1px solid rgba(0,245,255,.1)",
                borderRadius: 4, fontSize: ".78rem", color: "#546e7a",
                fontFamily: "Share Tech Mono, monospace",
              }}>
                300 XP until next badge →{" "}
                <span style={{ color: "#00f5ff" }}>Spear Expert</span>
              </div>
            </div>

            {/* Learning map */}
            <div style={{ ...T.card, padding: 28 }}>
              <SectionLabel>LEARNING MAP</SectionLabel>
              {MODULES.map((m, i) => {
                const dc = dotColor(m.status);
                return (
                  <div
                    key={m.name}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "13px 0",
                      borderBottom: i < MODULES.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                      animation: `statIn .4s ${i * 0.07}s ease both`,
                    }}
                  >
                    {/* Status dot */}
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: dc, boxShadow: `0 0 8px ${dc}`,
                      flexShrink: 0,
                      animation: m.status === "active" ? "pulse 2s infinite" : "none",
                    }} />

                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: ".88rem", fontWeight: 600,
                        color: m.status === "locked" ? "#546e7a" : "#e0f7fa",
                      }}>
                        {m.name}
                      </div>
                      <div style={{
                        fontSize: ".73rem", color: "#546e7a",
                        fontFamily: "Share Tech Mono, monospace", marginTop: 2,
                      }}>
                        {m.sub}
                      </div>
                    </div>

                    {/* Status badge */}
                    <span style={{
                      fontFamily: "Share Tech Mono, monospace", fontSize: ".68rem",
                      color: dc, padding: "2px 8px", borderRadius: 2,
                      border: `1px solid ${dc}40`,
                      background: `${dc}0a`,
                      whiteSpace: "nowrap",
                    }}>
                      {badgeText(m.status)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT col: XP + activity + Sheldon ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* XP block */}
            <div style={{ ...T.card, padding: 28 }}>
              <SectionLabel>XP PROGRESS</SectionLabel>
              <XPBar xp={xp} level={level} xpPct={xpPct} xpToNext={xpToNext} />
              <div style={{ marginTop: 16 }}>
                {ACTIVITY_STATS.map(([lbl, val, color], idx) => (
                  <div
                    key={lbl}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "11px 0",
                      borderBottom: idx < ACTIVITY_STATS.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                      animation: `statIn .4s ${idx * 0.07}s ease both`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: color, boxShadow: `0 0 6px ${color}`,
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: ".85rem", color: "#546e7a" }}>{lbl}</span>
                    </div>
                    <span style={{
                      fontFamily: "Orbitron, sans-serif", fontSize: ".9rem",
                      fontWeight: 700, color,
                      textShadow: `0 0 12px ${color}60`,
                    }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly activity mini-chart */}
            <div style={{ ...T.card, padding: 28 }}>
              <SectionLabel>WEEKLY ACTIVITY</SectionLabel>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 70 }}>
                {[40, 75, 55, 90, 60, 100, 80].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: "100%",
                      height: `${h}%`,
                      background: i === 6
                        ? "linear-gradient(180deg,#00f5ff,#00ff9d)"
                        : "rgba(0,245,255,.18)",
                      borderRadius: "3px 3px 0 0",
                      boxShadow: i === 6 ? "0 0 12px rgba(0,245,255,.4)" : "none",
                      transition: "all .3s",
                    }} />
                    <span style={{
                      fontFamily: "Share Tech Mono, monospace", fontSize: ".58rem",
                      color: i === 6 ? "#00f5ff" : "#546e7a",
                    }}>
                      {["M","T","W","T","F","S","S"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 12, fontFamily: "Share Tech Mono, monospace",
                fontSize: ".72rem", color: "#546e7a", textAlign: "right",
              }}>
                This week: <span style={{ color: "#00f5ff" }}>247 XP earned</span>
              </div>
            </div>

            {/* Sheldon's tip */}
            <div style={{ ...T.card, padding: 28 }}>
              <SectionLabel>SHELDON'S TIP</SectionLabel>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  fontSize: "2rem", flexShrink: 0,
                  filter: "drop-shadow(0 0 8px rgba(0,245,255,.3))",
                }}>
                  🐢
                </div>
                <p style={{
                  fontSize: ".85rem", color: "#546e7a",
                  lineHeight: 1.7, fontStyle: "italic", margin: 0,
                }}>
                  "You're on a 5-day streak! Keep going — just{" "}
                  <span style={{ color: "#00ff9d" }}>2 more days</span> to unlock the{" "}
                  <span style={{ color: "#ffd600" }}>Dedication Badge</span>. Today, try the Spear Phishing simulator!"
                </p>
              </div>
              {/* Tip action */}
              <div style={{
                marginTop: 14, padding: "8px 14px",
                background: "rgba(0,245,255,.04)", border: "1px solid rgba(0,245,255,.12)",
                borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: "Share Tech Mono, monospace", fontSize: ".72rem", color: "#00f5ff" }}>
                  → Try: Spear Phishing Simulator
                </span>
                <span style={{ fontSize: ".72rem", color: "#546e7a", fontFamily: "Share Tech Mono, monospace" }}>
                  +150 XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
