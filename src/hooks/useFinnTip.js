import { useState, useEffect, useRef } from "react";
import { TIPS } from "../constants";

/**
 * useTurtleTip
 * Cycles through Sheldon's tips automatically.
 *
 * Returns:
 *   currentTip  – the tip string to display (null when hidden)
 *   nextTip()   – manually advance to the next tip
 */
export function useFinnTip() {
  const [tipIdx, setTipIdx] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const isSpeakingRef = useRef(false);

  const speak = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    isSpeakingRef.current = false;

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes("Female") ||
        voice.name.includes("Google UK English Female") ||
        voice.name.includes("Samantha") ||
        voice.name.includes("Google US English")
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.pitch = 1.3;
    utterance.rate = 1.0;
    utterance.volume = 1.0;
    utterance.onstart = () => {
      isSpeakingRef.current = true;
      setShowTip(true);
    };
    utterance.onend = () => {
      isSpeakingRef.current = false;
    };
    utterance.onerror = () => {
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  // Show first tip after 2 s
  useEffect(() => {
    const id = setTimeout(() => setShowTip(true), 2000);
    return () => clearTimeout(id);
  }, []);

  // Cycle every 12 s
  useEffect(() => {
    const id = setInterval(() => {
      setShowTip(true);
      setTipIdx((i) => (i + 1) % TIPS.length);
      setTimeout(() => {
        if (!isSpeakingRef.current) setShowTip(false);
      }, 4500);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  const nextTip = () => {
    const nextIdx = (tipIdx + 1) % TIPS.length;
    setShowTip(true);
    setTipIdx(nextIdx);
    speak(TIPS[nextIdx]);
  };

  return {
    currentTip: showTip ? TIPS[tipIdx] : null,
    nextTip,
  };
}
