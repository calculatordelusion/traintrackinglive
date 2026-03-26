import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CookieConsent from "@/components/CookieConsent";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip Links (ARIA) */}
      <div className="sr-only focus-within:not-sr-only" role="navigation" aria-label="Skip links">
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-[9999] px-6 py-3 bg-primary text-primary-foreground font-bold transform -translate-y-full focus:translate-y-0 transition-transform duration-200 rounded-b-lg shadow-lg"
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="fixed top-0 left-36 z-[9999] px-6 py-3 bg-primary text-primary-foreground font-bold transform -translate-y-full focus:translate-y-0 transition-transform duration-200 rounded-b-lg shadow-lg"
        >
          Skip to navigation
        </a>
        <a
          href="#search"
          className="fixed top-0 left-72 z-[9999] px-6 py-3 bg-primary text-primary-foreground font-bold transform -translate-y-full focus:translate-y-0 transition-transform duration-200 rounded-b-lg shadow-lg"
        >
          Skip to search
        </a>
      </div>
      <Navbar />
      <main id="main-content" aria-label="Main content" className="flex-1 pt-16 sm:pt-[68px]">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
}
