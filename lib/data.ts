// All site copy lives here so it can be edited without touching layout code.

export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

export const profile = {
  name: "Vadim Fedorov",
  role: "Electrical Engineering · UC Davis",
  tagline:
    "I build and debug the firmware, circuit boards, and signal pipelines that make robots and brain-computer interfaces behave.",
  status: "Open to Summer 2027 internships",
  email: "vadimfedorov.sv@gmail.com",
  github: "https://github.com/vadimfedorovsv",
  linkedin: "https://www.linkedin.com/in/vadim-fedorov-sv/",
  resume: "/assets/resume/Vadim_Fedorov_Resume.pdf",
  headshot: "/assets/profile/vadim-fedorov-headshot.jpg",
};

export const about = [
  "I'm an Electrical Engineering student at UC Davis and an undergraduate researcher at the Laboratory for AI, Robotics, and Automation (LARA), where I work on the firmware and electronics of the Krysalis humanoid hand.",
  "I like the test-bench part of engineering. When something misbehaves, I build a test that isolates it, find the weakest link, and keep iterating across firmware and hardware until the fix holds, not just until the symptom goes away.",
  "Outside the lab I build EEG pipelines with the UC Davis Neurotech Club and contribute to PyBCI, an open-source EEG research tool.",
];

export type Stat = { value: number; prefix?: string; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 50, prefix: "~", suffix: " ms", label: "teleop latency after my I2C firmware rewrite" },
  { value: 19, label: "actuators driven at full PWM, no freezes" },
  { value: 8, suffix: "-ch", label: "EEG motor-imagery decoding pipeline" },
];

export type Project = {
  id: string;
  title: string;
  meta: string;
  summary: string;
  media:
    | {
        kind: "video";
        src: string;
        poster: string;
        caption: string;
        side: { image: { src: string; alt: string }; specs: [string, string][] };
      }
    | { kind: "images"; srcs: { src: string; alt: string }[]; caption: string };
  sections: { label: string; body: string | string[] }[];
  badges?: string[];
  tags: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "krysalis",
    title: "Krysalis Robotic Hand",
    meta: "LARA · UC Davis · 2026 – present",
    summary:
      "Firmware and electronics for a 19-actuator humanoid hand, teleoperated through a Manus glove, PyBullet, and micro-ROS.",
    media: {
      kind: "video",
      src: "/assets/video/krysalis-i2c-glove-demo-muted.mp4",
      poster: "/assets/video/krysalis-i2c-glove-poster.jpg",
      caption: "Lab demo after the I2C fix: the hand tracks the glove without dropouts.",
      side: {
        image: { src: "/assets/banner/krysalis-hand-poses.jpg", alt: "The Krysalis hand in several grasp poses." },
        specs: [
          ["Actuators", "19 + 2 wrist"],
          ["Bus", "I2C, multi-board"],
          ["Latency", "~50 ms end-to-end"],
          ["Control", "Manus glove → PyBullet → micro-ROS"],
          ["CAD / EDA", "KiCad control + power PCBs"],
        ],
      },
    },
    sections: [
      {
        label: "Problem",
        body: "Teleoperation crashed about every two seconds, and the hand couldn't move several fingers at once.",
      },
      {
        label: "What I did",
        body: [
          "Traced the crashes to I2C bus contention and rewrote firmware on both the inbound and outbound signal paths.",
          "Designed and brought up custom control PCBs, adding I2C pull-ups and dedicated voltage regulation.",
          "Found a shared power feed running through the PCB stack and designed a separate parallel power-distribution board in KiCad.",
          "Integrated two wrist rotary actuators into the glove → PyBullet → micro-ROS pipeline.",
        ],
      },
      {
        label: "Result",
        body: "Stable control at ~50 ms end-to-end latency, every motor at full PWM with no freezes, and teleoperation extended from finger joints to the wrist.",
      },
    ],
    badges: ["~50 ms latency", "19 actuators", "2 PCBs designed"],
    tags: ["C/C++", "I2C", "KiCad", "Board bring-up", "micro-ROS", "PyBullet", "Teensy"],
    links: [
      { label: "Case study", href: "https://github.com/vadimfedorovsv/krysalis-hand-case-study" },
      { label: "Krysalis paper (arXiv)", href: "https://arxiv.org/abs/2504.12967" },
    ],
  },
  {
    id: "bci",
    title: "BCI Prosthetic Leg Control",
    meta: "Neurotech Club · Dec 2025 – Jun 2026",
    summary:
      "End-to-end motor-imagery control: from recording EEG to a guarded actuator trigger on a prosthetic-leg test rig.",
    media: {
      kind: "images",
      srcs: [
        { src: "/assets/bci/decoder_metrics_summary.png", alt: "Decoder metrics: cross-validation vs. session-holdout accuracy." },
        { src: "/assets/bci/threshold_tradeoff.png", alt: "Decision-threshold tradeoff for live actuator triggering." },
        { src: "/assets/bci/trial_timeline.png", alt: "Replay timeline of classifier scores across MOVE and REST windows." },
      ],
      caption: "The gap between cross-validation and holdout accuracy is what set the safety thresholds.",
    },
    sections: [
      {
        label: "Collect",
        body: "Designed and ran a cued ankle motor-imagery paradigm, recording labeled MOVE/REST trials on an 8-channel OpenBCI Cyton.",
      },
      {
        label: "Decode",
        body: "Built the MNE pipeline: XDF import, 60 Hz notch, 8–30 Hz bandpass, common-average reference, artifact rejection, epoching, CSP + LDA.",
      },
      {
        label: "Act safely",
        body: "Linked live BrainFlow decoding to an Arduino Mega trigger with dry-run mode, decision thresholds, refractory timing, and REST-output blocking, then validated on replay and session holdout.",
      },
    ],
    badges: ["8-ch EEG", "CSP + LDA", "Hardware safety gates"],
    tags: ["Python", "MNE", "BrainFlow", "OpenBCI", "Arduino"],
    links: [
      { label: "Repository", href: "https://github.com/vadimfedorovsv/bci-prosthetic-leg-control" },
      {
        label: "Live demo quickstart",
        href: "https://github.com/vadimfedorovsv/bci-prosthetic-leg-control/blob/main/LIVE_DEMO_QUICKSTART.md",
      },
    ],
  },
  {
    id: "pybci",
    title: "PyBCI Live EEG Interface",
    meta: "Open source · 2026 – present",
    summary: "Live acquisition and visualization for PyBCI, a Python platform for EEG research.",
    media: {
      kind: "images",
      srcs: [
        {
          src: "/assets/pybci/pybci-livestream-demo-window.png",
          alt: "PyBCI livestream window with stacked real-time EEG channels and recording controls.",
        },
      ],
      caption: "The livestream view I built, running on demo signal data.",
    },
    sections: [
      {
        label: "What I built",
        body: [
          "The acquisition and streaming backend that connects board data to the research interface.",
          "Stacked real-time EEG plots in the frontend.",
          "Start, pause, save, and stop recording controls, so a full session runs from one window.",
        ],
      },
    ],
    tags: ["Python", "BrainFlow", "Real-time plotting", "GUI"],
    links: [{ label: "PyBCI repository", href: "https://github.com/prithvirajmody/PyBCI" }],
  },
];

export const experience = [
  {
    dates: "2026 — Now",
    title: "Undergraduate Robotics Researcher",
    org: "LARA · UC Davis",
    href: "https://arxiv.org/abs/2504.12967",
    body: "Firmware, PCB design, and power distribution for the Krysalis humanoid hand; wrist actuator integration into the micro-ROS teleoperation stack.",
    tags: ["Firmware", "KiCad", "micro-ROS"],
  },
  {
    dates: "2026 — Now",
    title: "Open-Source Contributor",
    org: "PyBCI",
    href: "https://github.com/prithvirajmody/PyBCI",
    body: "Live EEG acquisition backend, real-time plotting, and recording controls.",
    tags: ["Python", "BrainFlow"],
  },
  {
    dates: "2025 — 2026",
    title: "Projects Division Member",
    org: "Neurotech Club · UC Davis",
    href: "https://github.com/vadimfedorovsv/bci-prosthetic-leg-control",
    body: "EEG collection, decoding, and actuator-safety work for the BCI prosthetic-leg project.",
    tags: ["EEG", "MNE", "Arduino"],
  },
  {
    dates: "2024 — 2025",
    title: "Customer Service Representative",
    org: "Cherry Chase Pet Hospital",
    body: "Client communication across phone, email, and front desk; coordinated appointments and intake with veterinary staff during peak hours.",
    tags: [],
  },
];

export const education = {
  school: "University of California, Davis",
  degree: "B.S. Electrical Engineering",
  grad: "Expected June 2028",
  gpa: "3.54",
  honors: "Dean's List, Fall 2025 & Winter 2025",
};

export const publication = {
  title: "The Implementation of Ethical AI Within Autonomous Vehicles",
  venue: "Journal of Student Research · Vol. 13, No. 1 · 2024",
  authors: "Vadim Fedorov, Noah T. Curran",
  summary:
    "Compares real-world autonomous-vehicle incidents with theoretical decision cases and argues for clearer guidelines grounded in safety, individual autonomy, and public trust.",
  doi: "10.47611/jsrhs.v13i1.5973",
  href: "https://www.researchgate.net/publication/382926048_The_Implementation_of_Ethical_AI_Within_Autonomous_Vehicles",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Firmware & code", items: ["C / C++", "Embedded C", "Python", "Java", "MATLAB"] },
  { group: "Electronics & CAD", items: ["KiCad", "PCB layout", "Board bring-up", "I2C", "Teensy", "Soldering", "SolidWorks"] },
  { group: "Robotics", items: ["micro-ROS", "ROS 2", "PyBullet", "Teleoperation", "PWM motor control"] },
  { group: "Neurotech", items: ["MNE", "BrainFlow", "OpenBCI Cyton", "CSP / LDA", "EEG filtering"] },
  { group: "Tools", items: ["Git", "Linux", "Prototyping"] },
];
