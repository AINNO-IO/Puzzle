import type { Metadata } from "next";
import { Inter } from "next/font/google";

export default function Footer() {
  return (
    <footer className="footer footer-center p-8 mt-20 border-t text-base-content">
      <aside>
        <p>Copyright © 2023 - All right reserved by Modakoda</p>
      </aside>
    </footer>
  );
}
