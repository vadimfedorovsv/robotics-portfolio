// Short notes in Vadim's own words, from his interview answers (2026-11-18).
// Each one gets its own page at /<slug>/. Only add text Vadim has read and approved.

export type Note = { slug: string; title: string; paragraphs: string[]; list?: string[] };

export const notes: Note[] = [
  {
    slug: "beliefs",
    title: "Things I believe",
    paragraphs: [],
    list: [
      "Keep it simple. I tend to start with ambitious builds, but the core has to work before the extra features and small details matter.",
      "In an integrated system, figure out whether it's hardware or software before anything else.",
      "If it works on the first try, be suspicious. There's almost always something to improve.",
      "Make it reliable first, then make it do more.",
      "Good teams talk to each other and keep everyone involved. Group input makes a project better, more creative, and more functional.",
      "Check each other's work, and help each other out.",
    ],
  },
  {
    slug: "two-second-crash",
    title: "The two-second crash",
    paragraphs: [
      "The Krysalis hand has 19 actuators, and for days its teleoperation kept crashing after about two seconds. We'd start controlling it, and two seconds later it would go down again.",
      "I started by sending manual commands to each board on its own, then mimicked the teleoperation flow one step at a time. That's how I finally found that it was a software error, and where it was happening. The cause was I2C bus contention.",
      "I rewrote the firmware on both signal paths. After that, control held at about 50 ms end-to-end latency.",
    ],
  },
  {
    slug: "debugging",
    title: "How I debug",
    paragraphs: [
      "The first thing I do is make sure no component is actually faulty. Otherwise I'm chasing a ghost I can't fix.",
      "Once I trust the parts, I figure out whether the problem is in the hardware, the software, or both. From there I use whatever tools it takes to pinpoint it.",
      "And if something works on the first try, I get suspicious. It usually means there's still something to improve.",
    ],
  },
  {
    slug: "neurotech",
    title: "Why neurotech",
    paragraphs: [
      "I joined the Neurotech Club because it combines hardware and software in a really interesting way, and it lets you interface with human thoughts and the body.",
      "For our prosthetic-leg project, I built the whole classifier and all of the software for it myself, and we got it working live on a small 3D-printed demo.",
    ],
  },
  {
    slug: "now",
    title: "Now",
    paragraphs: [
      "Right now I'm building an automated trading system that goes from research and validation all the way to live trading, and runs on its own. The goal is for it to be profitable.",
      "Along the way I've gotten pretty obsessed with trading, automation, and quant trading.",
    ],
  },
  {
    slug: "ethical-ai",
    title: "Why I wrote about ethical AI",
    paragraphs: [
      "In 2024 I published a paper with Noah T. Curran in the Journal of Student Research about ethical AI in autonomous vehicles. It pulled together things I care about: electrical engineering, autonomous cars, and AI.",
      "I also really enjoy philosophy and talking through moral questions. I think that kind of thinking has to be applied to AI, especially in physical AI such as autonomous vehicles.",
    ],
  },
];
