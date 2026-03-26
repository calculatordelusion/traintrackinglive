import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Cookie, Shield, BarChart3, Megaphone, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConsentState {
  essential: boolean; // always true
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

const CONSENT_KEY = "tmt_cookie_consent";
const CONSENT_VERSION = 1;
const CONSENT_EXPIRY_DAYS = 365;

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Check expiry (12 months)
    if (Date.now() - parsed.timestamp > CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function setConsentStorage(consent: ConsentState) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...consent, version: CONSENT_VERSION }));
}

/** Update Google Consent Mode v2 (works with gtag if loaded) */
function updateGoogleConsent(consent: ConsentState) {
  // Set Google Consent Mode v2 defaults
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("consent", "update", {
      ad_storage: consent.advertising ? "granted" : "denied",
      ad_user_data: consent.advertising ? "granted" : "denied",
      ad_personalization: consent.advertising ? "granted" : "denied",
      analytics_storage: consent.analytics ? "granted" : "denied",
      functionality_storage: "granted",
      personalization_storage: consent.analytics ? "granted" : "denied",
      security_storage: "granted",
    });
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    analytics: false,
    advertising: false,
    timestamp: Date.now(),
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      updateGoogleConsent(stored);
      // Don't show banner if consent already given
    } else {
      // Small delay so it doesn't compete with LCP
      const timer = setTimeout(() => setVisible(true), 1500);
      // Set default denied state for Google Consent Mode v2
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
        (window as any).gtag = (window as any).gtag || gtag;
        (window as any).gtag("consent", "default", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
          functionality_storage: "granted",
          personalization_storage: "denied",
          security_storage: "granted",
          wait_for_update: 500,
        });
      }
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    const c = { ...newConsent, timestamp: Date.now() };
    setConsent(c);
    setConsentStorage(c);
    updateGoogleConsent(c);
    setVisible(false);
  }, []);

  const acceptAll = () => saveConsent({ essential: true, analytics: true, advertising: true, timestamp: Date.now() });
  const rejectAll = () => saveConsent({ essential: true, analytics: false, advertising: false, timestamp: Date.now() });
  const saveCustom = () => saveConsent(consent);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-2 sm:p-3 animate-in slide-in-from-bottom-5 duration-500">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-card border border-border rounded-xl shadow-lg shadow-black/10 overflow-hidden">
          <div className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-4 h-4 text-primary shrink-0" />
              <h2 className="font-bold text-foreground text-sm">We Value Your Privacy</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              We use cookies for analytics and ads via Google AdSense.{" "}
              <Link to="/privacy" className="text-primary underline hover:no-underline">Privacy Policy</Link>
            </p>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-xs text-primary font-medium hover:underline mb-2"
            >
              {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {showDetails ? "Hide details" : "Customize"}
            </button>

            {showDetails && (
              <div className="space-y-2 mb-2 border border-border/50 rounded-lg p-2.5 bg-muted/30">
                <label className="flex items-center gap-2 cursor-not-allowed opacity-80">
                  <div className="w-8 h-5 bg-primary rounded-full flex items-center justify-end px-0.5">
                    <div className="w-3.5 h-3.5 bg-white rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground">Essential</span>
                  <span className="text-[10px] text-muted-foreground">(always on)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                    className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${consent.analytics ? "bg-primary justify-end" : "bg-muted-foreground/30 justify-start"}`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                  </button>
                  <span className="text-xs font-medium text-foreground">Analytics</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    onClick={() => setConsent(c => ({ ...c, advertising: !c.advertising }))}
                    className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${consent.advertising ? "bg-primary justify-end" : "bg-muted-foreground/30 justify-start"}`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                  </button>
                  <span className="text-xs font-medium text-foreground">Advertising</span>
                </label>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={acceptAll} size="sm" className="flex-1 gap-1 text-xs font-semibold h-8">
                <Check className="w-3 h-3" /> Accept All
              </Button>
              {showDetails && (
                <Button onClick={saveCustom} size="sm" variant="secondary" className="flex-1 gap-1 text-xs font-semibold h-8">
                  Save
                </Button>
              )}
              <Button onClick={rejectAll} size="sm" variant="outline" className="flex-1 gap-1 text-xs font-semibold h-8">
                <X className="w-3 h-3" /> Reject
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Utility to re-open cookie consent banner (used in footer link) */
export function resetCookieConsent() {
  localStorage.removeItem(CONSENT_KEY);
  window.location.reload();
}
