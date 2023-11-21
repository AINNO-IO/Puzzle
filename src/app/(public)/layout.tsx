import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puzzle app",
  description: "Play puzzles and be happy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className="">
        {children}
      </body>
    </html>
  );
}
