import { useState, useEffect } from "react";
import { T } from "../styles";
import { XPBar } from "../components";
import { SIM_STAGES } from "../constants";

// ─── SIMULATOR PAGE ──────────────────────────────────────────────────────────
export function SimulatorPage({ xp, level, xpPct, xpToNext, addXP, showToast }) {
  const [idx,      setIdx]      = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [hovFlag,  setHovFlag]  = useState(null);

  const s = SIM_STAGES[idx % SIM_STAGES.length];

  const handleAction = (type) => {
    if (feedback) return;
    const isPhish = s.type === "phishing";
    const correct = (type === "report" && isPhish) || (type === "safe" && !isPhish);

    if (correct) {
      addXP(100);
      showToast("🎯 Excellent Detection! +100 XP", "ok");
      setFeedback({
        type: "success",
        title: "Threat Neutralized",
        msg: s.explanation
      });
    } else {
      showToast("❌ Security Breach! Careful next time.", "ng");
      setFeedback({
        type: "fail",
        title: "Vulnerability Exposed",
        msg: s.explanation
      });
    }
  };

  const next = () => {
    setIdx(idx + 1);
    setFeedback(null);
    setAnalyzed(false);
    setHovFlag(null);
  };

  return (
    <div style={{
      ...T.page,
      background: "#000509",
      minHeight: "100vh",
      position: "relative",
    }}>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <div style={{ ...T.secLbl, marginBottom: 8 }}>// NEURAL SIMULATOR v4.0</div>
            <h2 style={{ ...T.secTitle, marginBottom: 0 }}>Threat <span style={{ color: "#00f5ff" }}>Analysis</span></h2>
          </div>
          <div style={{ fontFamily: "Share Tech Mono, monospace", fontSize: ".85rem", color: "#546e7a", textAlign: "right" }}>
            Scenario {idx + 1} of {SIM_STAGES.length}
            <div style={{ color: "#00f5ff", marginTop: 4 }}>Level 4 Clear Clearance</div>
          </div>
        </div>

        <XPBar xp={xp} level={level} xpPct={xpPct} xpToNext={xpToNext} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

          {/* ── EMAIL WORKSPACE ── */}
          <div style={{ ...T.card, padding: 0, minHeight: 600, display: "flex", flexDirection: "column" }}>
            <div style={{
              padding: "14px 24px", background: "rgba(255,255,255,.03)",
              borderBottom: "1px solid rgba(0,245,255,.15)", display: "flex",
              alignItems: "center", justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,.1)" }} />)}
              </div>
              <div style={{ fontFamily: "Share Tech Mono, monospace", fontSize: ".7rem", color: "#546e7a", letterSpacing: 1 }}>
                ENCRYPTED_SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}
              </div>
            </div>

            <div style={{ padding: 32, flex: 1 }}>
              <div style={{ marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: 20 }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 4, background: "rgba(0,245,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    {s.sender[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1rem" }}>{s.sender}</div>
                    <div style={{ fontSize: ".8rem", color: "#546e7a", fontFamily: "Share Tech Mono, monospace" }}>
                      &lt;{analyzed ? <span style={{ color: s.type === "phishing" ? "#ff1744" : "#00ff9d" }}>{s.email}</span> : s.email}&gt;
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#e0f7fa" }}>{s.subject}</div>
              </div>

              <div style={{
                fontSize: "1rem", lineHeight: 1.7, color: "#90a4ae", whiteSpace: "pre-wrap",
                position: "relative"
              }}>
                {s.body}

                {analyzed && s.flags.map((f, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHovFlag(f)}
                    onMouseLeave={() => setHovFlag(null)}
                    style={{
                      position: "absolute",
                      top: f.pos.t, left: f.pos.l,
                      width: f.pos.w, height: f.pos.h,
                      border: "2px dashed #ff1744",
                      background: "rgba(255,23,68,0.1)",
                      cursor: "help",
                      borderRadius: 4,
                      animation: "fuA .3s ease both"
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ padding: "24px 32px", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", gap: 12 }}>
              <button
                onClick={() => handleAction("safe")}
                disabled={!!feedback}
                style={{
                  ...T.btnG, flex: 1, padding: "14px",
                  background: "rgba(0,255,157,.05)", borderColor: "#00ff9d", color: "#00ff9d"
                }}
              >
                Mark as Safe
              </button>
              <button
                onClick={() => handleAction("report")}
                disabled={!!feedback}
                style={{
                  ...T.btnP, flex: 1, padding: "14px",
                  background: "rgba(255,23,68,.05)", borderColor: "#ff1744", color: "#ff1744",
                  boxShadow: "0 0 20px rgba(255,23,68,0.1)"
                }}
              >
                🚩 Report Phishing
              </button>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ ...T.card, padding: 20 }}>
              <div style={{ ...T.secLbl, fontSize: ".6rem", marginBottom: 12 }}>// TOOLS</div>
              <button
                onClick={() => setAnalyzed(!analyzed)}
                style={{
                  width: "100%", padding: "10px", background: analyzed ? "#00f5ff" : "transparent",
                  border: "1px solid #00f5ff", color: analyzed ? "#000" : "#00f5ff",
                  fontFamily: "Share Tech Mono, monospace", fontSize: ".75rem", cursor: "pointer",
                  transition: "all .2s", borderRadius: 3, fontWeight: 700
                }}
              >
                {analyzed ? "Disable Deep Scan" : "Enable Deep Scan"}
              </button>
            </div>

            <div style={{ ...T.card, padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ ...T.secLbl, fontSize: ".6rem", marginBottom: 16 }}>// ANALYSIS_LOG</div>

              {!analyzed && !feedback && (
                <div style={{ color: "#546e7a", fontSize: ".85rem", fontStyle: "italic", textAlign: "center", marginTop: 40 }}>
                  Initialize Deep Scan to reveal hidden threat indicators...
                </div>
              )}

              {analyzed && !hovFlag && (
                <div style={{ color: "#00f5ff", fontSize: ".85rem", fontFamily: "Share Tech Mono, monospace", animation: "fuA .4s ease" }}>
                  &gt; SCANNING COMPLETED...<br/>
                  &gt; {s.flags.length} ANOMALIES DETECTED<br/>
                  &gt; HOVER OVER HIGHLIGHTS FOR DETAILS
                </div>
              )}

              {hovFlag && (
                <div style={{ animation: "fuA .2s ease" }}>
                  <div style={{ color: "#ff1744", fontFamily: "Orbitron, sans-serif", fontSize: ".8rem", fontWeight: 800, marginBottom: 8, textTransform: "uppercase" }}>
                    Anomaly: {hovFlag.title}
                  </div>
                  <div style={{ color: "#90a4ae", fontSize: ".85rem", lineHeight: 1.6 }}>
                    {hovFlag.desc}
                  </div>
                </div>
              )}

              {feedback && (
                <div style={{
                  marginTop: "auto", padding: 16, borderRadius: 4,
                  background: feedback.type === "success" ? "rgba(0,255,157,.1)" : "rgba(255,23,68,.1)",
                  border: `1px solid ${feedback.type === "success" ? "#00ff9d" : "#ff1744"}`,
                  animation: "popIn .4s cubic-bezier(.17,.67,.83,.67)"
                }}>
                  <div style={{ fontWeight: 800, color: feedback.type === "success" ? "#00ff9d" : "#ff1744", marginBottom: 8 }}>
                    {feedback.title}
                  </div>
                  <div style={{ fontSize: ".8rem", color: "#90a4ae", lineHeight: 1.5, marginBottom: 16 }}>
                    {feedback.msg}
                  </div>
                  <button onClick={next} style={{
                    width: "100%", padding: "8px", background: feedback.type === "success" ? "#00ff9d" : "#ff1744",
                    border: "none", color: "#000", fontWeight: 800, cursor: "pointer", borderRadius: 2
                  }}>
                    Next Scenario →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
