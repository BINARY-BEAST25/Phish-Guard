## 2025-05-15 - Canvas Performance Optimization
**Learning:** High-frequency rendering loops ($O(n^2)$ particle connections) and expensive CSS-like properties (shadowBlur) in HTML5 Canvas 2D can severely degrade performance on lower-end devices.
**Action:** Use squared distance checks to avoid Math.sqrt in hot loops, remove shadowBlur in favor of simpler glows or higher opacity, and pre-calculate trigonometric values for geometric patterns. Replaced standard forEach with for loops to minimize function call overhead in high-frequency rendering paths.
