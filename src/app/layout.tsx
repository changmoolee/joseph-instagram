import Header from "@/components/Header/Header.component";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "joseph-instagram에 오신걸 환영합니다.",
  description: "joseph-instagram에서 사람들과 소통하세요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="relative w-full min-w-[320px] pb-[50px] pt-[100px]">
        <Header />
        {children}
      </body>
    </html>
  );
}
