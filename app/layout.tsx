import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XP Insight | تقييم تجربة المنتجات الرقمية",
  description:
    "نموذج أولي عربي لقطاع الأعمال يربط تقييم تجربة المنتج بآراء المستخدمين العامة.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
