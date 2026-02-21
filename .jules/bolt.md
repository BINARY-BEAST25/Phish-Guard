## 2025-05-15 - Initial Assessment
**Learning:** Found several classic Canvas performance bottlenecks: use of `Math.sqrt` in nested loops, expensive `shadowBlur` in high-frequency rendering, and `setInterval` instead of `requestAnimationFrame`.
**Action:** Prioritize optimizations in `ParticleCanvas.jsx` and `HexCanvas.jsx` to reduce CPU overhead.
