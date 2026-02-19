## 2025-05-14 - [Redundant Animation Loops]
**Learning:** This codebase suffered from extreme redundancy in background animation components, with 6+ pages each defining and mounting their own copies of multiple heavy canvas-based animations. Mounting multiple canvas contexts with high-frequency animation loops simultaneously is a major performance bottleneck for CPU and GPU.
**Action:** Consolidate shared heavy animations into a single persistent global component (e.g., CyberBackground) mounted once at the App root. Use React.memo to prevent redundant re-renders of animation components.

## 2025-05-14 - [hot-path Nested Loop Optimization]
**Learning:** The particle network animation used an O(n^2) loop to calculate distances between all particles using Math.sqrt on every pair every frame.
**Action:** Use squared distance comparison (^2 < CONN^2$) to avoid the expensive Math.sqrt call in the hot path, only calculating the actual distance when the particles are within range.
