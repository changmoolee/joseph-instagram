"use client";

import Header from "@/components/Header/Header.component";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="w-full min-w-[320px]">
        <Header />
        {children}
      </body>
    </html>
  );
}
