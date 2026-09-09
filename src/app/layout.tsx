import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./legacy-styles.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { getGlobalSettings } from "@/app/actions/settings";
import Script from "next/script";

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
    metadataBase: new URL("https://techsapana.com"),
    title,
    description,
    keywords: ["software development", "web design", "AI solutions", "TechSapana", "engineering", "Nepal tech company", "digital agency", "full-stack development"],
    alternates: {
      canonical: "/",
    },
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
      creator: "@techsapana",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSettings = await getGlobalSettings();

  return (
    <html lang="en" suppressHydrationWarning className="text-[15px]">
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-bg-primary text-text-main`}
      >
        <ClientLayoutWrapper globalSettings={globalSettings}>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
