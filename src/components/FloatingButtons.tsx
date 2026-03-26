import { useState } from "react";
import { Accessibility, AlertTriangle, X, Type, ZoomIn, ZoomOut, MousePointer2, Underline, Contrast, LetterText, RotateCcw, Eye, ScanSearch, PauseCircle } from "lucide-react";

export default function FloatingButtons() {
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [textSize, setTextSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [largerCursor, setLargerCursor] = useState(false);
  const [textSpacing, setTextSpacing] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [focusHighlight, setFocusHighlight] = useState(false);
  const [pauseAnimations, setPauseAnimations] = useState(false);
  const [colorSaturation, setColorSaturation] = useState(100);

  const adjustTextSize = (delta: number) => {
    const next = Math.max(75, Math.min(150, textSize + delta));
    setTextSize(next);
    document.documentElement.style.fontSize = `${next}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
  };

  const toggleHighlightLinks = () => {
    setHighlightLinks(!highlightLinks);
    document.documentElement.classList.toggle("highlight-links");
  };

  const toggleLargerCursor = () => {
    setLargerCursor(!largerCursor);
    document.documentElement.classList.toggle("larger-cursor");
  };

  const toggleTextSpacing = () => {
    setTextSpacing(!textSpacing);
    document.documentElement.classList.toggle("text-spacing");
  };

  const toggleDyslexiaFont = () => {
    setDyslexiaFont(!dyslexiaFont);
    document.documentElement.classList.toggle("dyslexia-font");
  };

  const toggleFocusHighlight = () => {
    setFocusHighlight(!focusHighlight);
    document.documentElement.classList.toggle("focus-highlight");
  };

  const togglePauseAnimations = () => {
    setPauseAnimations(!pauseAnimations);
    document.documentElement.classList.toggle("pause-animations");
  };

  const handleSaturationChange = (value: number) => {
    setColorSaturation(value);
    document.documentElement.style.setProperty("--a11y-saturation", `${value}%`);
    if (value === 100) {
      document.documentElement.classList.remove("custom-saturation");
    } else {
      document.documentElement.classList.add("custom-saturation");
    }
  };

  const resetAll = () => {
    setTextSize(100);
    setHighContrast(false);
    setHighlightLinks(false);
    setLargerCursor(false);
    setTextSpacing(false);
    setDyslexiaFont(false);
    setFocusHighlight(false);
    setPauseAnimations(false);
    setColorSaturation(100);
    document.documentElement.style.fontSize = "100%";
    document.documentElement.style.removeProperty("--a11y-saturation");
    document.documentElement.classList.remove(
      "high-contrast", "highlight-links", "larger-cursor", "text-spacing",
      "dyslexia-font", "focus-highlight", "pause-animations", "custom-saturation"
    );
  };

  const toggleOptions = [
    { label: "High Contrast", desc: "Increase color contrast", icon: Contrast, active: highContrast, toggle: toggleHighContrast },
    { label: "Highlight Links", desc: "Underline all links", icon: Underline, active: highlightLinks, toggle: toggleHighlightLinks },
    { label: "Larger Cursor", desc: "Bigger mouse pointer", icon: MousePointer2, active: largerCursor, toggle: toggleLargerCursor },
    { label: "Text Spacing", desc: "Increase spacing between letters and lines", icon: LetterText, active: textSpacing, toggle: toggleTextSpacing },
    { label: "Dyslexia-Friendly Font", desc: "Use a font designed for easier reading", icon: Eye, active: dyslexiaFont, toggle: toggleDyslexiaFont },
    { label: "Focus Highlight", desc: "Show clear focus indicators on elements", icon: ScanSearch, active: focusHighlight, toggle: toggleFocusHighlight },
    { label: "Pause Animations", desc: "Stop all animations and transitions", icon: PauseCircle, active: pauseAnimations, toggle: togglePauseAnimations },
  ];

  return (
    <>
      {/* Disclaimer - Bottom Left */}
      <button
        onClick={() => setShowDisclaimer(true)}
        className="fixed bottom-4 left-3 sm:bottom-5 sm:left-5 z-50 flex items-center gap-1.5 px-2.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-200 hover:scale-105 active:scale-95 ring-2 ring-accent/50"
        aria-label="View Disclaimer"
      >
        <span className="sm:hidden w-5 h-5 flex items-center justify-center rounded-full bg-accent-foreground/20 text-accent-foreground font-black text-sm leading-none">!</span>
        <AlertTriangle className="hidden sm:block w-4 h-4" />
        <span className="hidden sm:inline">Disclaimer</span>
      </button>

      {/* Accessibility - Bottom Right */}
      <button
        onClick={() => setShowAccessibility(true)}
        className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ring-4 ring-accent/40"
        aria-label="Accessibility Options"
      >
        <Accessibility className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <>
          <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={() => setShowDisclaimer(false)} role="presentation" />
          <div role="dialog" aria-modal="true" aria-labelledby="disclaimer-title" className="fixed inset-x-3 sm:inset-x-4 top-1/2 -translate-y-1/2 z-[101] max-w-lg mx-auto bg-card rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
            <div className="bg-destructive px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0">
              <h2 id="disclaimer-title" className="text-destructive-foreground font-bold text-base sm:text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                Disclaimer
              </h2>
              <button onClick={() => setShowDisclaimer(false)} className="text-destructive-foreground/80 hover:text-destructive-foreground p-1" aria-label="Close disclaimer">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 text-sm text-muted-foreground leading-relaxed overflow-y-auto">
              <p>
                <strong className="text-foreground">Track My Train</strong> is an <strong className="text-foreground">independent, community-driven platform</strong> and is <strong className="text-foreground">not affiliated with, endorsed by, or officially connected to Pakistan Railways</strong> or any government entity.
              </p>
              <p>
                All train tracking data, schedules, and status information displayed on this website are sourced from publicly available data and third-party APIs. While we strive for maximum accuracy, real-time data may occasionally differ from actual train positions due to GPS signal delays, network latency, or reporting gaps.
              </p>
              <p>
                <strong className="text-foreground">We do not guarantee</strong> the accuracy, completeness, or timeliness of any information provided. Users should always verify critical travel information directly with Pakistan Railways official channels before making travel decisions.
              </p>
              <p>
                This service is provided <strong className="text-foreground">free of charge</strong> for informational purposes only. Track My Train assumes no liability for any losses, delays, or inconveniences resulting from the use of information on this platform.
              </p>
              <p className="text-xs border-t pt-3 text-muted-foreground/70">
                For official Pakistan Railways information, contact the PR helpline at <strong>117</strong> or visit the official Pakistan Railways website.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Accessibility Panel */}
      {showAccessibility && (
        <>
          <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={() => setShowAccessibility(false)} role="presentation" />
          <div role="dialog" aria-modal="true" aria-labelledby="a11y-title" className="fixed inset-x-3 sm:inset-x-4 top-1/2 -translate-y-1/2 z-[101] max-w-md mx-auto bg-card rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
            <div className="bg-primary px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0">
              <h2 id="a11y-title" className="text-primary-foreground font-bold text-base sm:text-lg flex items-center gap-2">
                <Accessibility className="w-5 h-5" aria-hidden="true" />
                Accessibility Options
              </h2>
              <button onClick={() => setShowAccessibility(false)} className="text-primary-foreground/80 hover:text-primary-foreground p-1" aria-label="Close accessibility options">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3 overflow-y-auto">
              {/* Text Size */}
              <div className="border rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="flex items-center gap-2 font-semibold text-sm">
                    <Type className="w-4 h-4 text-primary" />
                    Text Size
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{textSize}%</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => adjustTextSize(-10)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors active:bg-muted"
                  >
                    <ZoomOut className="w-4 h-4" /> Smaller
                  </button>
                  <button
                    onClick={() => adjustTextSize(10)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors active:bg-muted"
                  >
                    <ZoomIn className="w-4 h-4" /> Larger
                  </button>
                </div>
              </div>

              {/* Toggle Options */}
              {toggleOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={opt.toggle}
                  role="switch"
                  aria-checked={opt.active}
                  aria-label={opt.label}
                  className="w-full flex items-center justify-between border rounded-xl p-3 sm:p-4 hover:bg-muted/50 active:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <opt.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" aria-hidden="true" />
                    <div>
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-[11px] text-muted-foreground">{opt.desc}</div>
                    </div>
                  </div>
                  <div className={`w-10 h-[22px] sm:w-11 sm:h-6 rounded-full transition-colors flex items-center px-0.5 shrink-0 ${opt.active ? "bg-primary" : "bg-muted"}`} aria-hidden="true">
                    <div className={`w-[18px] h-[18px] sm:w-5 sm:h-5 rounded-full bg-white shadow transition-transform ${opt.active ? "translate-x-[18px] sm:translate-x-5" : "translate-x-0"}`} />
                  </div>
                </button>
              ))}

              {/* Color Saturation Slider */}
              <div className="border rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="flex items-center gap-2 font-semibold text-sm">
                    <Eye className="w-4 h-4 text-primary" />
                    Color Saturation
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{colorSaturation}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={colorSaturation}
                  onChange={(e) => handleSaturationChange(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary"
                  aria-label="Color saturation level"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                  <span>Grayscale</span>
                  <span>Full Color</span>
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={resetAll}
                className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl bg-muted hover:bg-muted/80 active:bg-muted/80 text-sm font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All Settings
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
