import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

const site = "https://vadimfedorovsv.github.io/robotics-portfolio";
const description =
  "Vadim Fedorov, Electrical Engineering at UC Davis. Robotics firmware, PCB design and bring-up, micro-ROS, and EEG/BCI signal processing.";

export const metadata: Metadata = {
  metadataBase: new URL(site + "/"),
  title: "Vadim Fedorov | Robotics, Embedded Systems, BCI",
  description,
  openGraph: {
    type: "website",
    url: site + "/",
    title: "Vadim Fedorov | Robotics, Embedded Systems, BCI",
    description,
    images: [{ url: site + "/assets/banner/krysalis-hand-poses.jpg" }],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%2334d399'/%3E%3Ctext x='32' y='42' font-family='Arial,sans-serif' font-size='28' font-weight='700' text-anchor='middle' fill='%2304140d'%3EVF%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = { themeColor: "#0a0d0c" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
