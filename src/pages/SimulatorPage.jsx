import { useState, useEffect, useRef } from "react";
import { T } from "../styles";
import { SIM_STAGES } from "../constants";


// ─── FLAG ELEMENT ─────────────────────────────────────────────────────────────
function FlagElement({ id, text, hint, flagged, submitted, revealed, onToggle }) {
  const isFlagged  = flagged.has(id);
  const isRevealed = revealed && !isFlagged;

  let bg = "rgba(255,199,0,.1)", border = "2px dashed #ffd600", color = "#e0f7fa";
  if (isFlagged)  { bg = "rgba(255,23,68,.18)"; border = "2px solid #ff1744"; color = "#ff1744"; }
  if (isRevealed) { bg = "rgba(255,109,0,.15)"; border = "2px solid #ff6d00"; color = "#ff6d00"; }

  return (
    <span
      title={hint}
      onClick={() => onToggle(id)}
      style={{
        background: bg, border, borderRadius: 3, padding: "0 4px",
        cursor: "pointer", color,
        fontFamily: "Share Tech Mono, monospace", fontSize: ".85em",
        transition: "all .2s", display: "inline",
      }}
    >
      {text}
      {!submitted  && <sup style={{ fontSize: ".6em",  marginLeft: 2, color: "#ffd600" }}>?</sup>}
      {submitted && isFlagged  && <sup style={{ fontSize: ".65em", marginLeft: 2 }}>✓</sup>}
      {isRevealed              && <sup style={{ fontSize: ".65em", marginLeft: 2 }}>!</sup>}
    </span>
  );
}

// ─── PHISH BODY ───────────────────────────────────────────────────────────────
function PhishBody({ stage, flagged, submitted, revealed, onToggle }) {
  const lines = stage.phish.body.split("\n");
  const flags = stage.phish.flags.slice(1);

  return (
    <p>
      {lines.map((line, li) => {
        let rest = line;
        const parts = [];
        flags.forEach((f) => {
          const idx = rest.indexOf(f.text);
          if (idx >= 0) {
            if (idx > 0) parts.push(rest.slice(0, idx));
            parts.push(
              <FlagElement
                key={f.id} id={f.id} text={f.text} hint={f.hint}
                flagged={flagged} submitted={submitted} revealed={revealed} onToggle={onToggle}
              />
            );
            rest = rest.slice(idx + f.text.length);
          }
        });
        parts.push(rest);
        return (
          <span key={li}>
            {parts}
            {li < lines.length - 1 ? <br /> : null}
          </span>
        );
      })}
    </p>
  );
}

// ─── SIMULATOR PAGE ───────────────────────────────────────────────────────────
export function SimulatorPage({ addXP, showToast }) {
  const [stageIdx,  setStageIdx]  = useState(0);
  const [flagged,   setFlagged]   = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [revealed,  setRevealed]  = useState(false);

  const stage = SIM_STAGES[stageIdx];
  const total = stage.phish.flags.length;
  const pct   = Math.min(100, (flagged.size / total) * 100);

  const toggleFlag = (id) => {
    if (submitted) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const submit = () => {
    setSubmitted(true);
    const found  = stage.phish.flags.filter((f) => flagged.has(f.id)).length;
    const xpGain = Math.round((found / total) * 80);
    addXP(xpGain);
    showToast(`${found}/${total} flags found! +${xpGain} XP`, found === total ? "ok" : "inf");
  };

  const nextStage = () => {
    setStageIdx((s) => (s + 1) % SIM_STAGES.length);
    setFlagged(new Set());
    setSubmitted(false);
    setRevealed(false);
  };

  const panelHdr = (legit) => ({
    padding: "12px 20px",
    display: "flex", alignItems: "center", gap: 8,
    fontFamily: "Share Tech Mono, monospace", fontSize: ".73rem",
    letterSpacing: 2, textTransform: "uppercase",
    borderBottom: legit ? "1px solid rgba(0,255,157,.1)" : "1px solid rgba(255,23,68,.1)",
    color:      legit ? "#00ff9d" : "#ff1744",
    background: legit ? "rgba(0,255,157,.04)" : "rgba(255,23,68,.04)",
  });

  return (
    <div style={{
      ...T.page,
      background: "#000509",
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* ── Injected keyframes (same as HomePage) ── */}
      <style>{`
        @keyframes orbF        { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.08)} }
        @keyframes scanlineScroll { 0%{background-position:0 0} 100%{background-position:0 100px} }
        @keyframes streamFall  { 0%{top:-300px;opacity:0} 10%{opacity:.7} 90%{opacity:.3} 100%{top:110vh;opacity:0} }
        @keyframes fuA         { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse       { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.6)} }
      `}</style>


      {/* ── Page content (sits above all background layers) ── */}
      <div style={{ position: "relative", zIndex: 2, padding: "80px 40px 60px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <div style={T.secLbl}>
              <span style={{ color: "rgba(0,245,255,0.4)" }}>//</span> REAL-VS-FAKE SIMULATOR
            </div>
            <h2 style={T.secTitle}>
              Spot the <span style={{ color: "#00f5ff" }}>Phishing</span>
            </h2>
            <p style={{ fontSize: ".95rem", color: "#546e7a" }}>
              Click suspicious elements in the phishing email to flag them.
            </p>
          </div>
        </div>

        {/* Stage progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <span style={{ fontFamily: "Share Tech Mono, monospace", fontSize: ".73rem", color: "#546e7a" }}>
            Stage {stageIdx + 1} of {SIM_STAGES.length} ·
          </span>
          <div style={{ flex: 1, height: 6, background: "rgba(0,245,255,.1)", borderRadius: 100, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg,#00f5ff,#00ff9d)",
              borderRadius: 100, width: `${pct}%`,
              transition: "width .6s", boxShadow: "0 0 15px #00f5ff",
            }} />
          </div>
          <span style={{ fontFamily: "Share Tech Mono, monospace", fontSize: ".73rem", color: "#00f5ff" }}>
            {flagged.size}/{total} flagged
          </span>
        </div>

        {/* Split panel */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* LEFT: Legitimate email */}
          <div style={{ ...T.card, overflow: "hidden" }}>
            <div style={panelHdr(true)}>✅ LEGITIMATE EMAIL — Reference</div>
            <div style={{ padding: 22, fontSize: ".88rem", lineHeight: 1.75, color: "#546e7a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00ff9d,#0891b2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem", fontWeight: 700, color: "#000" }}>✓</div>
                <div>
                  <div style={{ fontSize: ".85rem", fontWeight: 600, marginBottom: 2, color: "#e0f7fa" }}>{stage.legit.from}</div>
                  <div style={{ fontFamily: "Share Tech Mono, monospace", fontSize: ".73rem", color: "#00ff9d" }}>{stage.legit.addr}</div>
                </div>
              </div>
              <strong style={{ color: "#e0f7fa", display: "block", marginBottom: 12 }}>{stage.legit.subject}</strong>
              <p style={{ whiteSpace: "pre-wrap" }}>{stage.legit.body}</p>
            </div>
          </div>

          {/* RIGHT: Phishing email */}
          <div style={{ ...T.card, overflow: "hidden" }}>
            <div style={panelHdr(false)}>🎣 SUSPICIOUS EMAIL — Click to flag phishing cues</div>
            <div style={{ padding: 22, fontSize: ".88rem", lineHeight: 1.75, color: "#546e7a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#ff1744,#ff6d00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem", fontWeight: 700 }}>!</div>
                <div>
                  <div style={{ fontSize: ".85rem", fontWeight: 600, marginBottom: 2, color: "#e0f7fa" }}>{stage.phish.from}</div>
                  <FlagElement
                    id={stage.phish.flags[0].id}
                    text={stage.phish.addr}
                    hint={stage.phish.flags[0].hint}
                    flagged={flagged}
                    submitted={submitted}
                    revealed={revealed}
                    onToggle={toggleFlag}
                  />
                </div>
              </div>
              <strong style={{ color: "#e0f7fa", display: "block", marginBottom: 12 }}>{stage.phish.subject}</strong>
              <PhishBody
                stage={stage} flagged={flagged}
                submitted={submitted} revealed={revealed} onToggle={toggleFlag}
              />
            </div>
          </div>
        </div>

        {/* Action row */}
        <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
          {!submitted && (
            <button style={T.btnHP} onClick={submit}>Submit Flags</button>
          )}
          {!revealed && (
            <button style={T.btnG} onClick={() => setRevealed(true)}>Reveal All Missed</button>
          )}
          {submitted && (
            <button style={T.btnP} onClick={nextStage}>Next Stage →</button>
          )}
        </div>

        {/* Result banner */}
        {submitted && (
          <div style={{
            marginTop: 20, padding: "16px 22px",
            background: "rgba(0,255,157,.06)", border: "1px solid rgba(0,255,157,.2)",
            borderRadius: 6, fontFamily: "Orbitron, sans-serif",
            fontSize: "1rem", fontWeight: 700, color: "#00ff9d",
            textAlign: "center", animation: "fuA .4s ease both",
          }}>
            {flagged.size === total
              ? "🏆 Perfect! All phishing cues identified!"
              : `✓ Stage complete! Found ${flagged.size}/${total} flags. Keep practising!`}
          </div>
        )}
      </div>
    </div>
  );
}