import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const site = "https://vadimfedorovsv.github.io/robotics-portfolio";
const description =
  "Vadim Fedorov, Electrical Engineering at UC Davis. Firmware and circuit boards for a robotic hand, EEG decoding for a prosthetic leg, and notes on building hardware.";

export const metadata: Metadata = {
  metadataBase: new URL(site + "/"),
  title: { default: "Vadim Fedorov", template: "%s | Vadim Fedorov" },
  description,
  openGraph: {
    type: "website",
    url: site + "/",
    title: "Vadim Fedorov",
    description,
    images: [{ url: site + "/assets/banner/krysalis-hand-poses.jpg" }],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%231a1918'/%3E%3Ctext x='32' y='43' font-family='Georgia,serif' font-size='30' font-style='italic' text-anchor='middle' fill='%23f2efe9'%3Evf%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = { themeColor: "#1a1918" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${serif.variable} font-serif`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
