import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Verikon — AI-first digital solutions agency",
  description:
    "Verikon engineers AI-powered web platforms, automation systems, and custom software for ambitious teams. Strategy, design, and engineering in one senior pod.",
  metadataBase: new URL("https://verikon.ai"),
  openGraph: {
    title: "Verikon — AI-first digital solutions agency",
    description:
      "AI automation, machine learning, web platforms, and custom software — engineered for performance and scale.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased bg-bg text-fg">
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
