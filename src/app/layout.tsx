import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./legacy-styles.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechSapana - Turning Dreams Into Digital Reality",
  description:
    "TechSapana designs and engineers high-converting websites, custom software, and AI solutions.",
  openGraph: {
    title: "TechSapana - Turning Dreams Into Digital Reality",
    description: "Engineering high-converting websites, custom software, and AI solutions for modern businesses.",
    url: "https://techsapana.com",
    siteName: "TechSapana",
    images: [
      {
        url: "https://techsapana.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechSapana Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSapana - Digital Engineering",
    description: "High-converting websites and enterprise software.",
    images: ["https://techsapana.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${plusJakartaSans.variable} font-sans min-h-screen flex flex-col bg-bg-primary text-text-main`}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
