import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Things to Do - Discover Activities in Your City",
  description: "Discover the best things to do in Oklahoma City, Salt Lake City, Seattle, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
