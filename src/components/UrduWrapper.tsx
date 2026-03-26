import { LanguageProvider } from "@/lib/i18n";
import type { ReactNode } from "react";

/**
 * Wraps any page component with Urdu language context.
 * Sets RTL direction, Urdu font, and provides translation helpers.
 */
export default function UrduWrapper({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider lang="ur">
      {children}
    </LanguageProvider>
  );
}
