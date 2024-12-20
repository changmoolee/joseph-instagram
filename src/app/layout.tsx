"use client";

import Header from "@/components/Header/Header.component";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-w-[430px]">
        <Header />
        {children}
      </body>
    </html>
  );
}
