import { useState, useEffect } from "react";
import { T } from "../styles";

const MOCK_LEADERS = [
  { rank: 1, name: "Cyb3r_Knight", xp: 12450, level: 42, streak: 15, badge: "Master" },
  { rank: 2, name: "Null_Ptr", xp: 11200, level: 38, streak: 8, badge: "Elite" },
  { rank: 3, name: "Phish_Buster", xp: 10850, level: 36, streak: 12, badge: "Elite" },
  { rank: 4, name: "Zero_Trust", xp: 9400, level: 31, streak: 5, badge: "Pro" },
  { rank: 5, name: "Data_Guardian", xp: 8900, level: 29, streak: 6, badge: "Pro" },
  { rank: 6, name: "Secure_Soul", xp: 7200, level: 24, streak: 4, badge: "Guardian" },
  { rank: 7, name: "Bit_Shield", xp: 6800, level: 22, streak: 7, badge: "Guardian" },
  { rank: 8, name: "Root_Access", xp: 5400, level: 18, streak: 3, badge: "Adept" },
  { rank: 9, name: "Net_Runner", xp: 4900, level: 16, streak: 5, badge: "Adept" },
  { rank: 10, name: "User_1029", xp: 1250, level: 4, streak: 5, badge: "Novice", isUser: true },
];

export function LeaderboardPage() {
  const [hovRow, setHovRow] = useState(null);

  return (
    <div style={{
      ...T.page,
      background: "#000509",
      minHeight: "100vh",
      position: "relative",
    }}>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={T.secLbl}>// GLOBAL RANKINGS</div>
          <h2 style={{ ...T.secTitle, fontSize: "2.8rem" }}>Elite <span style={{ color: "#00f5ff" }}>Defenders</span></h2>
          <div style={{ width: 60, height: 2, background: "#00f5ff", margin: "16px auto" }} />
        </div>

        <div style={{ ...T.card, padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(0,245,255,0.05)", borderBottom: "1px solid rgba(0,245,255,0.15)" }}>
                {["Rank", "Defender", "Level", "Streak", "Experience", "Standing"].map(h => (
                  <th key={h} style={{
                    padding: "18px 24px", fontFamily: "Share Tech Mono, monospace",
                    fontSize: ".7rem", color: "#00f5ff", textTransform: "uppercase", letterSpacing: 1
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERS.map((l) => (
                <tr
                  key={l.rank}
                  onMouseEnter={() => setHovRow(l.rank)}
                  onMouseLeave={() => setHovRow(null)}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,.03)",
                    background: l.isUser ? "rgba(0,245,255,.05)" : hovRow === l.rank ? "rgba(255,255,255,.02)" : "transparent",
                    transition: "all .2s"
                  }}
                >
                  <td style={{ padding: "16px 24px", fontFamily: "Orbitron, sans-serif", fontWeight: 800, color: l.rank <= 3 ? "#00f5ff" : "#546e7a" }}>
                    #{l.rank}
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: l.rank <= 3 ? "linear-gradient(135deg,#00f5ff,#d500f9)" : "rgba(255,255,255,.1)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".8rem"
                      }}>
                        {l.name[0]}
                      </div>
                      <span style={{ fontWeight: 700, color: l.isUser ? "#00f5ff" : "#e0f7fa" }}>
                        {l.name} {l.isUser && "(You)"}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", color: "#90a4ae" }}>Lvl {l.level}</td>
                  <td style={{ padding: "16px 24px", color: "#ff6d00", fontFamily: "Share Tech Mono, monospace" }}>🔥 {l.streak}</td>
                  <td style={{ padding: "16px 24px", color: "#00ff9d", fontWeight: 700 }}>{l.xp.toLocaleString()} XP</td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{
                      padding: "4px 10px", borderRadius: 2, background: "rgba(0,245,255,.08)",
                      color: "#00f5ff", fontSize: ".65rem", textTransform: "uppercase",
                      fontFamily: "Share Tech Mono, monospace", border: "1px solid rgba(0,245,255,.2)"
                    }}>{l.badge}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#546e7a", fontSize: ".85rem", fontFamily: "Share Tech Mono, monospace" }}>
          &gt; RANKINGS UPDATED REAL-TIME BASED ON GLOBAL THREAT MITIGATION DATA
        </div>
      </div>
    </div>
  );
}
