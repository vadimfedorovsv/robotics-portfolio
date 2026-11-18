// All site copy lives here so it can be edited without touching layout code.

export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

export const profile = {
  name: "Vadim Fedorov",
  role: "Electrical Engineering · UC Davis",
  tagline:
    "I write firmware and design PCBs for a robotic hand, and I built an EEG decoding pipeline for a prosthetic-leg brain-computer interface.",
  status: "Open to Summer 2027 internships",
  email: "vadimfedorov.sv@gmail.com",
  github: "https://github.com/vadimfedorovsv",
  linkedin: "https://www.linkedin.com/in/vadim-fedorov-sv/",
  resume: "/assets/resume/Vadim_Fedorov_Resume.pdf",
  headshot: "/assets/profile/vadim-fedorov-headshot.jpg",
};

export const about = [
  "I'm an Electrical Engineering student at UC Davis and an undergraduate researcher at the Laboratory for AI, Robotics, and Automation (LARA), where I work on the firmware and electronics of the Krysalis humanoid hand.",
  "I like debugging at the bench. When something fails, I set up a test that isolates it and work through the firmware and hardware until I've fixed the cause, not just the symptom. On the hand, that meant tracing teleoperation crashes to I2C bus contention and limited simultaneous motion to a shared power feed.",
  "Outside the lab, I built an EEG decoding pipeline for a prosthetic-leg project with the UC Davis Neurotech Club, and I contribute to PyBCI, an open-source EEG project.",
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
        label: "Symptoms",
        body: "For days, teleoperation crashed after about two seconds of use, and the hand struggled to move several fingers at once.",
      },
      {
        label: "Fixes",
        body: [
          "Traced the crashes to I2C bus contention and rewrote the firmware on both signal paths.",
          "Designed and brought up custom control PCBs, adding I2C pull-ups and dedicated voltage regulation.",
          "Traced the motion limit to a shared power feed through the PCB stack, then designed a separate parallel power distribution board in KiCad.",
          "Integrated two wrist rotary actuators into the teleoperation pipeline (Manus glove, PyBullet, micro-ROS).",
        ],
      },
      {
        label: "After",
        body: "Control holds at about 50 ms end-to-end latency. All motors run at full PWM without freezing or lagging, and teleoperation now covers the wrist as well as the hand joints.",
      },
    ],
    badges: ["~50 ms latency", "19 actuators", "Control + power PCBs"],
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
      "Decodes ankle motor imagery from EEG and uses it to trigger an Arduino Mega actuator on a prosthetic-leg test rig.",
    media: {
      kind: "images",
      srcs: [
        { src: "/assets/bci/decoder_metrics_summary.png", alt: "Decoder metrics: cross-validation vs. session-holdout accuracy." },
        { src: "/assets/bci/threshold_tradeoff.png", alt: "Decision-threshold tradeoff for live actuator triggering." },
        { src: "/assets/bci/trial_timeline.png", alt: "Replay timeline of classifier scores across MOVE and REST windows." },
      ],
      caption: "Decoder diagnostics from the public repo: cross-validation vs. session holdout, threshold tradeoff, and replay timeline.",
    },
    sections: [
      {
        label: "Recording",
        body: "Designed and ran a cued ankle motor-imagery paradigm, recording labeled MOVE/REST trials on an 8-channel OpenBCI Cyton.",
      },
      {
        label: "Decoding",
        body: "Built the MNE pipeline: XDF import, 60 Hz notch, 8–30 Hz bandpass, common-average reference, artifact rejection, epoching, CSP + LDA.",
      },
      {
        label: "Trigger",
        body: "Linked live BrainFlow decoding to an Arduino Mega trigger with a dry-run mode, decision thresholds, refractory timing, and REST-output blocking, then checked it on replay and session holdout.",
      },
    ],
    badges: ["8-ch EEG", "CSP + LDA", "Arduino Mega trigger"],
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
        label: "My part",
        body: [
          "The live EEG acquisition and streaming backend.",
          "Stacked real-time EEG plots in the frontend.",
          "Start, pause, save, and stop controls for recording.",
        ],
      },
    ],
    tags: ["Python", "BrainFlow", "Real-time plotting", "GUI"],
    links: [{ label: "PyBCI repository", href: "https://github.com/prithvirajmody/PyBCI" }],
  },
];

export const experience = [
  {
    dates: "2026 – Now",
    title: "Undergraduate Robotics Researcher",
    org: "LARA · UC Davis",
    href: "https://arxiv.org/abs/2504.12967",
    body: "I write firmware and design the control and power PCBs for the Krysalis humanoid hand, and I added two wrist actuators to its micro-ROS teleoperation setup.",
    tags: ["Firmware", "KiCad", "micro-ROS"],
  },
  {
    dates: "2026 – Now",
    title: "Open-Source Contributor",
    org: "PyBCI",
    href: "https://github.com/prithvirajmody/PyBCI",
    body: "Built the live EEG streaming backend, the real-time plots, and the recording controls.",
    tags: ["Python", "BrainFlow"],
  },
  {
    dates: "2025 – 2026",
    title: "Projects Division Member",
    org: "Neurotech Club · UC Davis",
    href: "https://github.com/vadimfedorovsv/bci-prosthetic-leg-control",
    body: "Ran the EEG motor-imagery sessions and built the decoding pipeline and Arduino trigger logic for the BCI prosthetic-leg project.",
    tags: ["EEG", "MNE", "Arduino"],
  },
  {
    dates: "2024 – 2025",
    title: "Customer Service Representative",
    org: "Cherry Chase Pet Hospital",
    body: "Customer service at a veterinary hospital in Sunnyvale.",
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
