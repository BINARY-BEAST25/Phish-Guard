import { T } from "../styles";

/**
 * Turtle (Sheldon the cyber mascot)
 * Fixed floating mascot with a speech bubble.
 */
export function Turtle({ tip, onClick }) {
  return (
    <div
      className="pg-turtle-wrap"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        pointerEvents: "none",
      }}
    >
      {tip && (
        <div
          className="pg-turtle-tip"
          style={{
            ...T.card,
            padding: "12px 16px",
            fontSize: ".78rem",
            color: "#e0f7fa",
            maxWidth: 220,
            lineHeight: 1.55,
            fontFamily: "Share Tech Mono, monospace",
            boxShadow: "0 0 30px rgba(0,245,255,.15)",
            marginBottom: 8,
            borderRadius: "12px 12px 4px 12px",
            animation: "fuA .3s ease",
            pointerEvents: "none",
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: tip }} />
        </div>
      )}

      <button
        type="button"
        className="pg-turtle-btn"
        onClick={onClick}
        style={{
          fontSize: "3rem",
          animation: "turtleBob .8s ease-in-out infinite alternate",
          cursor: "pointer",
          filter: "drop-shadow(0 0 12px rgba(0,255,157,0.4))",
          pointerEvents: "auto",
          border: "none",
          background: "transparent",
          lineHeight: 1,
          padding: 0,
        }}
      >
        {"\uD83D\uDC22"}
      </button>

      <div
        className="pg-turtle-label"
        style={{
          fontFamily: "Share Tech Mono, monospace",
          fontSize: ".6rem",
          color: "rgba(0,245,255,.6)",
          letterSpacing: 1,
          pointerEvents: "none",
        }}
      >
        [SHELDON]
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pg-turtle-wrap {
            left: 12px !important;
            right: auto !important;
            bottom: 88px !important;
          }

          .pg-turtle-tip {
            display: none !important;
          }

          .pg-turtle-btn {
            font-size: 2.35rem !important;
          }

          .pg-turtle-label {
            font-size: .52rem !important;
          }
        }
      `}</style>
    </div>
  );
}
