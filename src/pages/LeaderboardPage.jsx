import { useState, useEffect, useRef } from "react";
import { T } from "../styles";
import { LB_DATA } from "../constants";

const TABS = ["🌍 Global", "👥 This Week", "🏫 Class"];


// ─── LEADERBOARD PAGE ─────────────────────────────────────────────────────────
export function LeaderboardPage() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{
      ...T.page,
      background: "#000509",
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes orbF           { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.08)} }
        @keyframes scanlineScroll { 0%{background-position:0 0} 100%{background-position:0 100px} }
        @keyframes streamFall     { 0%{top:-300px;opacity:0} 10%{opacity:.7} 90%{opacity:.3} 100%{top:110vh;opacity:0} }
        @keyframes fuA            { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rowIn          { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes cardGlow {
          0%,100% { box-shadow: 0 0 0 0 transparent; }
          50%     { box-shadow: 0 0 24px rgba(0,245,255,.12); }
        }
      `}</style>


      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 2, padding: "80px 60px 60px", maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={T.secLbl}>
          <span style={{ color: "rgba(0,245,255,0.4)" }}>//</span> HALL OF DEFENDERS
        </div>
        <h2 style={{ ...T.secTitle, marginBottom: 8 }}>
          Global <span style={{ color: "#00f5ff" }}>Leaderboard</span>
        </h2>
        <p style={{ color: "#546e7a", marginBottom: 36, fontFamily: "Rajdhani, sans-serif", fontSize: ".95rem" }}>
          Compete with thousands of learners worldwide. Your rank updates in real-time.
        </p>

        {/* ── Stat cards ── */}
        <div style={{ display: "flex", gap: 20, marginBottom: 36, flexWrap: "wrap" }}>
          {[
            { val: "#47",  color: "#ffd600", lbl: "Your Rank",  icon: "🏅" },
            { val: "1,250",color: "#00f5ff", lbl: "Your XP",    icon: "⚡" },
            { val: "🔥 5", color: "#ff6d00", lbl: "Day Streak", icon: null },
            { val: "87%",  color: "#00ff9d", lbl: "Accuracy",   icon: "🎯" },
          ].map(({ val, color, lbl }) => (
            <div
              key={lbl}
              style={{
                ...T.card,
                padding: "22px 28px",
                textAlign: "center",
                flex: 1,
                minWidth: 140,
                animation: "cardGlow 4s ease-in-out infinite",
                borderColor: `${color}22`,
              }}
            >
              {/* top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                borderRadius: "6px 6px 0 0",
                opacity: 0.6,
              }} />
              <div style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 800,
                color,
                textShadow: `0 0 20px ${color}88`,
                lineHeight: 1,
                marginBottom: 6,
              }}>
                {val}
              </div>
              <div style={{
                fontSize: ".72rem",
                color: "#546e7a",
                fontFamily: "Share Tech Mono, monospace",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {lbl}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                padding: "8px 22px",
                borderRadius: 4,
                border: tab === i ? "1px solid rgba(0,245,255,.4)" : "1px solid rgba(0,245,255,.12)",
                background: tab === i ? "rgba(0,245,255,.08)" : "transparent",
                fontSize: ".85rem",
                fontWeight: 600,
                cursor: "pointer",
                color: tab === i ? "#00f5ff" : "#546e7a",
                fontFamily: "Share Tech Mono, monospace",
                letterSpacing: "0.05em",
                transition: "all .2s",
                boxShadow: tab === i ? "0 0 14px rgba(0,245,255,.12)" : "none",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        <div style={{ ...T.card, overflow: "hidden" }}>

          {/* Table top accent */}
          <div style={{
            height: 2,
            background: "linear-gradient(90deg,transparent,#00f5ff,#d500f9,#00f5ff,transparent)",
            opacity: 0.5,
          }} />

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(0,245,255,.03)" }}>
                {["Rank", "Defender", "XP", "Streak", "Badges"].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontFamily: "Share Tech Mono, monospace",
                      fontSize: ".68rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(0,245,255,.6)",
                      padding: "12px 16px",
                      textAlign: "left",
                      borderBottom: "1px solid rgba(0,245,255,.1)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LB_DATA.map((u, rowIdx) => {
                const rankColor =
                  u.rank === 1 ? "#ffd600" :
                  u.rank === 2 ? "#b0bec5" :
                  u.rank === 3 ? "#ff9e80" : "#e0f7fa";

                const rankBg =
                  u.rank === 1 ? "rgba(255,214,0,.06)"  :
                  u.rank === 2 ? "rgba(176,190,197,.04)" :
                  u.rank === 3 ? "rgba(255,158,128,.05)" : "transparent";

                return (
                  <tr
                    key={u.rank}
                    style={{
                      background: u.isYou ? "rgba(0,245,255,.05)" : rankBg,
                      borderTop:  u.isYou ? "1px solid rgba(0,245,255,.2)" : "none",
                      borderBottom: u.isYou ? "1px solid rgba(0,245,255,.1)" : "none",
                      transition: "background .2s",
                      animation: `rowIn .4s ${rowIdx * 0.05}s ease both`,
                    }}
                  >
                    {/* Rank */}
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.04)", width: 60 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {u.rank <= 3 && (
                          <span style={{ fontSize: "1rem" }}>
                            {u.rank === 1 ? "🥇" : u.rank === 2 ? "🥈" : "🥉"}
                          </span>
                        )}
                        <span style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: u.rank <= 3 ? "1rem" : ".9rem",
                          fontWeight: 800,
                          color: rankColor,
                          textShadow: u.rank <= 3 ? `0 0 15px ${rankColor}` : "none",
                        }}>
                          {u.rank <= 3 ? "" : `#${u.rank}`}
                        </span>
                      </div>
                    </td>

                    {/* Defender */}
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: ".82rem", fontWeight: 700,
                          background: u.color, color: "#000",
                          boxShadow: u.isYou ? "0 0 12px rgba(0,245,255,.4)" : "none",
                          border: u.isYou ? "2px solid rgba(0,245,255,.5)" : "2px solid transparent",
                          flexShrink: 0,
                        }}>
                          {u.initials}
                        </div>
                        <div>
                          <div style={{
                            fontSize: ".9rem", fontWeight: 600,
                            color: u.isYou ? "#00f5ff" : "#e0f7fa",
                          }}>
                            {u.name}
                            {u.isYou && (
                              <span style={{
                                marginLeft: 8, fontSize: ".68rem",
                                fontFamily: "Share Tech Mono, monospace",
                                color: "#00f5ff", letterSpacing: "0.1em",
                                padding: "1px 6px",
                                border: "1px solid rgba(0,245,255,.3)",
                                borderRadius: 2,
                                background: "rgba(0,245,255,.06)",
                              }}>YOU</span>
                            )}
                          </div>
                          <div style={{
                            fontSize: ".75rem", color: "#546e7a",
                            fontFamily: "Share Tech Mono, monospace",
                          }}>
                            Level {u.level}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* XP */}
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <span style={{
                        fontFamily: "Share Tech Mono, monospace",
                        fontSize: ".88rem",
                        color: "#00f5ff",
                        fontWeight: 700,
                        textShadow: "0 0 10px rgba(0,245,255,.4)",
                      }}>
                        {u.xp.toLocaleString()} XP
                      </span>
                    </td>

                    {/* Streak */}
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <span style={{
                        fontFamily: "Share Tech Mono, monospace",
                        fontSize: ".82rem",
                        color: "#ff6d00",
                      }}>
                        🔥 {u.streak}d
                      </span>
                    </td>

                    {/* Badges */}
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <div style={{ display: "flex", gap: 5 }}>
                        {u.badges.map((b, i) => (
                          <span
                            key={i}
                            title={b}
                            style={{
                              fontSize: "1.1rem",
                              filter: "drop-shadow(0 0 4px rgba(0,245,255,.3))",
                              cursor: "default",
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}