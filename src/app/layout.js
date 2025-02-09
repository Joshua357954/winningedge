import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata
export const metadata = {
  title: "Winning Edge – Maximizing Returns in Sports Investments",
  description:
    "Winning Edge is your premier platform for smart sports investments, offering data-driven insights and strategies to maximize your returns.",
  keywords:
    "sports investment, sports betting, financial investment, sports analytics, sports ROI, investment platform, Winning Edge, betting strategy",
  authors: [{ name: "Winning Edge Team" }],
  icons: {
    icon: "/assets/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
