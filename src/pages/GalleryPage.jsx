import { useState } from "react";
import { T } from "../styles";
import { GALLERY_DATA } from "../constants";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function tagStyle(status) {
  if (status === "phish")     return T.tagPhish;
  if (status === "review")    return T.tagReview;
  return T.tagDismissed;
}
function tagText(status) {
  if (status === "phish")     return "🎣 Confirmed Phish";
  if (status === "review")    return "🔍 Under Review";
  return "✓ Dismissed";
}
function thumbBg(type) {
  if (type === "email") return "linear-gradient(135deg,rgba(0,12,26,.98),rgba(0,5,14,1))";
  if (type === "sms")   return "linear-gradient(135deg,rgba(14,0,26,.98),rgba(0,5,14,1))";
  return                       "linear-gradient(135deg,rgba(26,10,0,.98),rgba(0,5,14,1))";
}

// ─── SUBMIT MODAL ─────────────────────────────────────────────────────────────
function SubmitModal({ onClose, showToast }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,5,9,.85)",
        zIndex: 3000,
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ ...T.card, width: "90%", maxWidth: 520, padding: 36, animation: "popIn .4s ease both" }}
      >
        <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.3rem", fontWeight: 800, marginBottom: 20 }}>
          📤 Submit Phishing Example
        </div>

        <div style={{ padding: "10px 14px", background: "rgba(255,109,0,.06)", border: "1px solid rgba(255,109,0,.2)", borderRadius: 4, fontSize: ".78rem", color: "#ff6d00", marginBottom: 16, lineHeight: 1.6 }}>
          ⚠️ Only submit real phishing attempts. Do not include personal information.
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: ".78rem", color: "#546e7a", marginBottom: 7, fontFamily: "Share Tech Mono, monospace" }}>Category</label>
          <select style={{ width: "100%", padding: "10px 14px", background: "rgba(0,8,18,.95)", border: "1px solid rgba(0,245,255,.15)", borderRadius: 3, color: "#e0f7fa", fontFamily: "Share Tech Mono, monospace" }}>
            {["Email Phishing", "SMS / Smishing", "Fake Website", "Voice / Vishing"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: ".78rem", color: "#546e7a", marginBottom: 7, fontFamily: "Share Tech Mono, monospace" }}>Short Description</label>
          <input
            type="text"
            placeholder="e.g. Fake PayPal billing email with spoofed domain"
            style={{ width: "100%", padding: "10px 14px", background: "rgba(0,8,18,.95)", border: "1px solid rgba(0,245,255,.15)", borderRadius: 3, color: "#e0f7fa", fontFamily: "Share Tech Mono, monospace" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: ".78rem", color: "#546e7a", marginBottom: 7, fontFamily: "Share Tech Mono, monospace" }}>Screenshot Upload</label>
          <div style={{ border: "1px dashed rgba(0,245,255,.2)", borderRadius: 4, padding: 28, textAlign: "center", cursor: "pointer", fontSize: ".85rem", color: "#546e7a" }}>
            <span style={{ color: "#00f5ff" }}>📎 Click to upload screenshot</span>
            <br />
            <small style={{ fontSize: ".75rem" }}>PNG, JPG — Max 5 MB</small>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: ".78rem", color: "#546e7a", marginBottom: 7, fontFamily: "Share Tech Mono, monospace" }}>Additional Notes (optional)</label>
          <textarea
            rows={3}
            placeholder="Any additional context about this phishing attempt..."
            style={{ width: "100%", padding: "10px 14px", background: "rgba(0,8,18,.95)", border: "1px solid rgba(0,245,255,.15)", borderRadius: 3, color: "#e0f7fa", fontFamily: "Share Tech Mono, monospace", resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button style={T.btnG} onClick={onClose}>Cancel</button>
          <button
            style={T.btnP}
            onClick={() => {
              onClose();
              showToast("✅ Submission received! Our team will review it shortly.", "ok");
            }}
          >
            Submit Example
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY CARD ─────────────────────────────────────────────────────────────
// Extracted into its own component so useState is called at the top level (not inside .map())
function GalleryCard({ g, liked, likeCount, onToggleLike, onFavourite }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...T.card,
        overflow:    "hidden",
        transition:  "all .3s",
        borderColor: hov ? "rgba(0,245,255,.35)" : "rgba(0,245,255,0.12)",
        transform:   hov ? "translateY(-3px)" : "none",
        boxShadow:   hov ? "0 0 30px rgba(0,245,255,.07)" : "none",
      }}
    >
      {/* Thumbnail */}
      <div style={{
        padding:      12,
        fontFamily:   "Share Tech Mono, monospace",
        fontSize:     ".68rem",
        lineHeight:   1.6,
        whiteSpace:   "pre-wrap",
        background:   thumbBg(g.type),
        borderBottom: "1px solid rgba(0,245,255,.08)",
        minHeight:    90,
        color:        "#546e7a",
        position:     "relative",
        overflow:     "hidden",
      }}>
        {g.thumb}
        {/* channel badge */}
        <span style={{
          position:   "absolute",
          top:        8,
          right:      8,
          padding:    "2px 8px",
          borderRadius: 2,
          fontSize:   ".62rem",
          fontFamily: "Share Tech Mono, monospace",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          background: g.type === "email" ? "rgba(0,245,255,.1)"
                    : g.type === "sms"   ? "rgba(213,0,249,.1)"
                    : "rgba(255,109,0,.1)",
          border:     g.type === "email" ? "1px solid rgba(0,245,255,.25)"
                    : g.type === "sms"   ? "1px solid rgba(213,0,249,.25)"
                    : "1px solid rgba(255,109,0,.25)",
          color:      g.type === "email" ? "#00f5ff"
                    : g.type === "sms"   ? "#d500f9"
                    : "#ff6d00",
        }}>
          {g.type === "email" ? "📧 Email" : g.type === "sms" ? "💬 SMS" : "🌐 Web"}
        </span>
      </div>

      {/* Meta */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: ".85rem", fontWeight: 700, marginBottom: 6 }}>
          {g.title}
        </div>
        <div style={{ fontSize: ".82rem", color: "#546e7a", marginBottom: 12, lineHeight: 1.5 }}>
          {g.caption}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={tagStyle(g.status)}>{tagText(g.status)}</span>

          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => onToggleLike(g.id)}
              style={{
                background:   liked ? "rgba(255,23,68,.08)" : "transparent",
                border:       `1px solid ${liked ? "rgba(255,23,68,.4)" : "rgba(255,255,255,.08)"}`,
                borderRadius: 3,
                color:        liked ? "#ff1744" : "#546e7a",
                fontSize:     ".78rem",
                padding:      "4px 10px",
                cursor:       "pointer",
                fontFamily:   "Share Tech Mono, monospace",
                transition:   "all .2s",
              }}
            >
              👍 {likeCount}
            </button>
            <button
              onClick={onFavourite}
              style={{
                background:   "transparent",
                border:       "1px solid rgba(255,255,255,.08)",
                borderRadius: 3,
                color:        "#546e7a",
                fontSize:     ".82rem",
                padding:      "4px 10px",
                cursor:       "pointer",
                transition:   "all .2s",
              }}
            >
              ★
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
export function GalleryPage({ showToast }) {
  const [search,       setSearch]       = useState("");
  const [typeFilter,   setTypeFilter]   = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [likes,        setLikes]        = useState(() =>
    Object.fromEntries(GALLERY_DATA.map((g) => [g.id, g.likes]))
  );
  const [liked,        setLiked]        = useState({});
  const [showModal,    setShowModal]    = useState(false);

  const filtered = GALLERY_DATA.filter((g) => {
    if (search       && !g.title.toLowerCase().includes(search) && !g.caption.toLowerCase().includes(search)) return false;
    if (typeFilter   && g.type   !== typeFilter)   return false;
    if (statusFilter && g.status !== statusFilter) return false;
    return true;
  });

  const toggleLike = (id) => {
    const wasLiked = !!liked[id];
    setLiked((p) => ({ ...p, [id]: !wasLiked }));
    setLikes((p) => ({ ...p, [id]: p[id] + (wasLiked ? -1 : 1) }));
  };

  const selectStyle = {
    padding:      "10px 14px",
    background:   "rgba(0,8,18,.95)",
    border:       "1px solid rgba(0,245,255,.15)",
    borderRadius: 3,
    color:        "#546e7a",
    fontFamily:   "Share Tech Mono, monospace",
    fontSize:     ".82rem",
    outline:      "none",
    cursor:       "pointer",
  };

  return (
    <div style={{
      ...T.page,
      background:  "#000509",
      minHeight:   "100vh",
      position:    "relative",
      overflowX:   "hidden",
    }}>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes popIn          { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
        @keyframes cardIn         { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 2, padding: "80px 60px 60px" }}>

        {/* Header */}
        <div style={T.secLbl}>
          <span style={{ color: "rgba(0,245,255,0.4)" }}>//</span> COMMUNITY GALLERY
        </div>
        <h2 style={{ ...T.secTitle, marginBottom: 8 }}>
          Real <span style={{ color: "#ff1744" }}>Phishing</span> Examples
        </h2>
        <p style={{ color: "#546e7a", marginBottom: 32, fontFamily: "Rajdhani, sans-serif", fontSize: ".95rem" }}>
          Browse user-submitted phishing screenshots. Learn from real attacks.
        </p>

        {/* ── Filters ── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="🔍 Search phishing examples..."
            style={{
              flex: 1, minWidth: 200,
              padding: "10px 14px",
              background: "rgba(0,8,18,.95)",
              border: "1px solid rgba(0,245,255,.15)",
              borderRadius: 3,
              color: "#e0f7fa",
              fontFamily: "Share Tech Mono, monospace",
              fontSize: ".82rem",
              outline: "none",
            }}
          />
          <select value={typeFilter}   onChange={(e) => setTypeFilter(e.target.value)}   style={selectStyle}>
            <option value="">All Channels</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="web">Fake Website</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
            <option value="">All Status</option>
            <option value="phish">Confirmed Phish</option>
            <option value="review">Under Review</option>
            <option value="dismissed">Dismissed</option>
          </select>

          {/* Result count */}
          <div style={{
            display: "flex", alignItems: "center",
            padding: "0 14px",
            fontFamily: "Share Tech Mono, monospace",
            fontSize: ".72rem",
            color: "#546e7a",
            border: "1px solid rgba(0,245,255,.08)",
            borderRadius: 3,
            background: "rgba(0,8,18,.6)",
            whiteSpace: "nowrap",
          }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {filtered.map((g, idx) => (
            <div key={g.id} style={{ animation: `cardIn .4s ${idx * 0.06}s ease both` }}>
              <GalleryCard
                g={g}
                liked={!!liked[g.id]}
                likeCount={likes[g.id]}
                onToggleLike={toggleLike}
                onFavourite={() => showToast("⭐ Added to favorites!", "ok")}
              />
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{
              gridColumn: "1/-1", textAlign: "center", padding: 64,
              color: "#546e7a", fontFamily: "Share Tech Mono, monospace",
              fontSize: ".9rem", animation: "fuA .4s ease both",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>🔍</div>
              No results found. Try different filters.
            </div>
          )}
        </div>

        {/* ── Submit CTA ── */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button style={T.btnHP} onClick={() => setShowModal(true)}>
            + Submit a Phishing Example
          </button>
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <SubmitModal onClose={() => setShowModal(false)} showToast={showToast} />
      )}
    </div>
  );
}
