import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNIVI Live Virtual Try-On — PoC",
  description: "Thử áo UNIVI trực tiếp qua camera bằng AI Virtual Try-On.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
