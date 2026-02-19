## 2024-10-31 - [Global Animation Management]
**Learning:** Consolidating heavy, Canvas-based background animations into a single global component (App level) prevents CPU spikes and memory leaks during page navigation. In high-particle or Matrix-style animations, re-initializing the animation loop on every route change is a massive performance anti-pattern.
**Action:** Always check if multiple pages or routes define the same background/Canvas component locally. If so, lift the animation layer to the root component and use `React.memo` to ensure it doesn't re-render during state changes.
