# PhishGuard Level System

This document is the canonical human-readable reference for PhishGuard level progression.

Source of truth in code:
- `src/constants/tips.js` -> `XP_PER_LEVEL`
- Shared by frontend and database logic.

## Level Thresholds and Titles

| Level | XP Required | Rank Title |
| --- | ---: | --- |
| 1 | 0 | Recruit |
| 2 | 200 | Recruit |
| 3 | 400 | Recruit |
| 4 | 700 | Guardian |
| 5 | 1000 | Guardian |
| 6 | 1400 | Guardian |
| 7 | 1900 | Veteran |
| 8 | 2500 | Veteran |
| 9 | 3200 | Veteran |
| 10 | 4000 | Grandmaster |

Level cap:
- Max level is 10.
- XP can continue increasing after level 10.

## Badges (Current Requirements)

| Badge | Requirement |
| --- | --- |
| First Blood | Level 1 |
| Phish Spotter | 500 XP |
| Quick Draw | 3-day streak |
| Link Checker | Level 3 |
| Defender | 2000 XP |
| Quiz Master | Level 5 |
| 7d Fire | 7-day streak |
| Spear Expert | 5000 XP |
