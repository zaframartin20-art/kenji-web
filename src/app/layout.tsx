import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kenji Zan | DJ & Producer",
  description:
    "Kenji Zan — DJ & Producer especializado en Big Room House y Progressive House.",
  keywords: [
    "Kenji Zan",
    "DJ Kenji Zan",
    "Big Room House",
    "Progressive House",
    "DJ Mexico",
    "Electronic Music",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}