import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./legacy-styles.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    settings = await prisma.globalSettings.findUnique({
      where: { id: "default" }
    });
  } catch (e) {
    // Ignore error if DB is down or table not created yet
  }

  const title = settings?.metaTitle || "TechSapana - Turning Dreams Into Digital Reality";
  const description = settings?.metaDescription || "TechSapana designs and engineers high-converting websites, custom software, and AI solutions.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
      title,
      description,
      images: ["https://techsapana.com/og-image.jpg"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-bg-primary text-text-main`}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
