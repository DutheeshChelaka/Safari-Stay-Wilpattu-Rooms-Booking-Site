import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "./components/SessionProvider"; // Import session provider
import Navbar from "./components/Navbar"; // Import Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Safari Stay Wilpattu",
  description: "Experience premium comfort near Wilpattu National Park.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text`}
      >
        <SessionProvider>
          <Navbar /> {/* Navbar is a client component */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
