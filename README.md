# Vadim Fedorov — Robotics Portfolio

Personal portfolio for robotics firmware, PCB design and bring-up, micro-ROS, and EEG/BCI work.

**Live:** https://vadimfedorovsv.github.io/robotics-portfolio/

## Featured projects

- **Krysalis Robotic Hand** — I2C firmware rewrite (~50 ms teleop latency), control and power-distribution PCBs, wrist actuator integration.
- **BCI Prosthetic Leg Control** — 8-channel motor-imagery EEG pipeline (MNE, CSP + LDA) driving a guarded Arduino actuator trigger.
- **PyBCI Live EEG Interface** — open-source live acquisition, real-time plots, and recording controls.

## Stack

Next.js (static export) · Tailwind CSS · shadcn/ui · [Cult UI](https://www.cult-ui.com) components · Motion

## Editing content

All copy (projects, experience, skills, links) lives in [`lib/data.ts`](lib/data.ts). Images, video, and the résumé PDF are in `public/assets/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Every push to `main` builds the static site and publishes it to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Public-safety notes

The site uses public-safe summaries, a muted lab demo video, public BCI result plots, and a sanitized PyBCI capture rendered with demo signal data. It does not include private lab code, unreleased CAD/PCB files, raw EEG recordings, or subject/session identifiers.
