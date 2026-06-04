import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mapleautostudio.ca"),
  title: "Maple Auto Studio — Finish, calibrated.",
  description:
    "Independent detailing partner of Akaal Auto Hub. Detailing packages, ceramic coating, paint correction, and tint — by appointment or mobile pickup.",
  openGraph: {
    title: "Maple Auto Studio — Finish, calibrated.",
    description:
      "Independent detailing partner of Akaal Auto Hub. Detailing packages, ceramic coating, paint correction, and tint — by appointment or mobile pickup.",
    url: "https://mapleautostudio.ca",
    siteName: "Maple Auto Studio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Maple Auto Studio" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Auto Studio — Finish, calibrated.",
    description:
      "Independent detailing partner of Akaal Auto Hub. Detailing packages, ceramic coating, paint correction, and tint — by appointment or mobile pickup.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1418" },
    { media: "(prefers-color-scheme: light)", color: "#f2f4f6" },
  ],
};

const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
