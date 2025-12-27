import type { Metadata, Viewport } from "next";
import "./globals.css";

// Site configuration
const siteConfig = {
  name: "ApniSec",
  title: "ApniSec - Advanced Cyber Security Solutions",
  description: "Defend against cyber threats before they strike. ApniSec provides enterprise-grade security solutions including VAPT, Red Team assessments, Cloud Security, and vCISO services for businesses worldwide.",
  url: "https://apnisec.com",
  ogImage: "/og-image.png",
  keywords: [
    "cyber security",
    "VAPT",
    "vulnerability assessment",
    "penetration testing",
    "red team",
    "cloud security",
    "security audit",
    "vCISO",
    "dark web monitoring",
    "threat intelligence",
    "security consulting",
    "India"
  ],
};

// Viewport configuration (separated from metadata in Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  // Basic Meta
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "ApniSec", url: siteConfig.url }],
  creator: "ApniSec",
  publisher: "ApniSec",
  
  // Canonical URL
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@apnisec",
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  
  // Manifest
  manifest: "/manifest.json",
  
  // Category
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  sameAs: [
    "https://twitter.com/apnisec",
    "https://linkedin.com/company/apnisec",
    "https://github.com/apnisec",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    offers: [
      {
        "@type": "Offer",
        name: "Vulnerability Assessment & Penetration Testing",
        description: "Comprehensive security testing for web, mobile, and API applications",
      },
      {
        "@type": "Offer",
        name: "Red Team Assessment",
        description: "Advanced adversary simulation and social engineering testing",
      },
      {
        "@type": "Offer",
        name: "Cloud Security",
        description: "Cloud security posture management and monitoring",
      },
      {
        "@type": "Offer",
        name: "vCISO Services",
        description: "Virtual Chief Information Security Officer services",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500&f[]=cabinet-grotesk@800&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
