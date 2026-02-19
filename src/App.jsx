import { useState } from "react";

import { GLOBAL_CSS }                            from "./styles/globalStyles";
import { useXPSystem }                           from "./hooks/useXPSystem";
import { useToast }                              from "./hooks/useToast";
import { useTurtleTip }                          from "./hooks/useTurtleTip";
import { CyberBackground, Navbar, Toast,
         LevelUpOverlay, Turtle }                from "./components";
import { HomePage, QuizPage, SimulatorPage,
         LeaderboardPage, GalleryPage,
         ProgressPage }                          from "./pages";

/**
 * App
 * Root component. Owns global state (page, XP, toast, turtle tip) and
 * renders the correct page component based on `page` state.
 */
export default function App() {
  const [page, setPage] = useState("home");

  // Global systems
  const { xp, level, addXP, xpPct, xpToNext, levelUpData, clearLevelUp } = useXPSystem();
  const { toast, showToast }   = useToast();
  const { currentTip, nextTip } = useTurtleTip();

  const STREAK = 5; // static for demo

  // Shared props passed down to pages that need XP / toast
  const xpProps  = { xp, level, xpPct, xpToNext, addXP };
  const toastProp = { showToast };

  return (
    <>
      {/* ── Global CSS ── */}
      <style>{GLOBAL_CSS}</style>

      {/* ── Global Background stack ── */}
      <CyberBackground />

      {/* ── Hackathon badge ── */}
      <div
        style={{
          position:     "fixed",
          top:          64,
          right:        0,
          zIndex:       999,
          background:   "linear-gradient(135deg,#d500f9,#8b00e8)",
          color:        "white",
          fontFamily:   "Share Tech Mono, monospace",
          fontSize:     ".65rem",
          padding:      "4px 16px 4px 10px",
          letterSpacing:"0.1em",
          clipPath:     "polygon(8px 0,100% 0,100% 100%,0 100%)",
          boxShadow:    "0 0 20px rgba(213,0,249,0.4)",
        }}
      >
        🏆 HACKATHON BUILD
      </div>

      {/* ── Navigation ── */}
      <Navbar page={page} setPage={setPage} xp={xp} streak={STREAK} />

      {/* ── Pages ── */}
      {page === "home"        && <HomePage        setPage={setPage} />}
      {page === "quiz"        && <QuizPage        {...xpProps} {...toastProp} setPage={setPage} />}
      {page === "simulator"   && <SimulatorPage   {...xpProps} {...toastProp} />}
      {page === "leaderboard" && <LeaderboardPage />}
      {page === "gallery"     && <GalleryPage     {...toastProp} />}
      {page === "progress"    && <ProgressPage    {...xpProps} />}

      {/* ── Global overlays ── */}
      <Toast          msg={toast.msg} type={toast.type} visible={toast.visible} />
      <LevelUpOverlay data={levelUpData}  onClose={clearLevelUp} />
      <Turtle         tip={currentTip}    onClick={nextTip} />
    </>
  );
}
