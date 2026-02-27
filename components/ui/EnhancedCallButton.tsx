import { PhoneCall } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

  :root {
    --accent: #e8390e;
    --ink:    #111110;
  }

  /* ── Floating button ── */
  .fcb-wrap {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 50;
  }
  @media (min-width: 640px) { .fcb-wrap { right: 2rem; bottom: 2rem; } }

  .fcb-group { position: relative; display: inline-flex; }

  /* pulse rings */
  .fcb-ring {
    position: absolute; inset: 0;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0;
    animation: fcb-pulse 2.4s cubic-bezier(0.4,0,0.6,1) infinite;
  }
  .fcb-ring:nth-child(2) { animation-delay: 0.8s; }
  @keyframes fcb-pulse {
    0%   { transform: scale(1);   opacity: 0.35; }
    70%  { transform: scale(1.75); opacity: 0; }
    100% { transform: scale(1.75); opacity: 0; }
  }

  /* main button */
  .fcb-btn {
    position: relative; z-index: 1;
    width: 54px; height: 54px;
    border-radius: 50%;
    background: var(--accent);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(232,57,14,0.38), 0 1px 4px rgba(232,57,14,0.2);
    transition: transform 0.22s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.22s;
    border: 2.5px solid rgba(255,255,255,0.25);
  }
  @media (min-width: 640px) { .fcb-btn { width: 60px; height: 60px; } }

  .fcb-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 32px rgba(232,57,14,0.45), 0 2px 8px rgba(232,57,14,0.25);
  }
  .fcb-btn:active { transform: scale(0.95); }

  .fcb-btn svg {
    width: 22px; height: 22px;
    transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
  }
  @media (min-width: 640px) { .fcb-btn svg { width: 24px; height: 24px; } }
  .fcb-group:hover .fcb-btn svg { transform: rotate(12deg); }

  /* tooltip */
  .fcb-tooltip {
    position: absolute;
    right: calc(100% + 0.75rem);
    top: 50%;
    transform: translateY(-50%) translateX(6px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s cubic-bezier(0.22,1,0.36,1);
    white-space: nowrap;
  }
  .fcb-group:hover .fcb-tooltip {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }

  .fcb-tooltip-inner {
    background: var(--ink);
    border-radius: 9px;
    padding: 0.55rem 0.9rem;
    box-shadow: 0 8px 24px rgba(17,17,16,0.18);
    position: relative;
  }
  .fcb-tooltip-num {
    font-family: 'Syne', sans-serif;
    font-size: 0.82rem; font-weight: 700;
    color: #fff; letter-spacing: 0.02em;
    display: flex; align-items: center; gap: 0.4rem;
  }
  .fcb-tooltip-num::before {
    content: '';
    width: 6px; height: 6px; border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
    box-shadow: 0 0 6px rgba(74,222,128,0.6);
    animation: fcb-blink 1.5s ease-in-out infinite;
  }
  @keyframes fcb-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  .fcb-tooltip-sub {
    font-size: 0.68rem; color: rgba(255,255,255,0.4);
    margin-top: 0.1rem; letter-spacing: 0.04em;
  }

  /* arrow pointing right */
  .fcb-arrow {
    position: absolute;
    right: -5px; top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 10px; height: 10px;
    background: var(--ink);
    border-radius: 1px;
  }
`;

export function EnhancedCallButton() {
  return (
    <>
      <style>{styles}</style>

      <div className="fcb-wrap">
        <div className="fcb-group">
          {/* Pulse rings */}
          <div className="fcb-ring" aria-hidden="true" />
          <div className="fcb-ring" aria-hidden="true" />

          {/* Button */}
          <a
            href="tel:+917210756879"
            className="fcb-btn"
            aria-label="Call +91 7210756879"
            title="Call us"
          >
            <PhoneCall />
          </a>

          {/* Tooltip */}
          <div className="fcb-tooltip" role="tooltip">
            <div className="fcb-tooltip-inner">
              <div className="fcb-tooltip-num">+91 7210-756-879</div>
              <div className="fcb-tooltip-sub">Available now · Tap to call</div>
              <div className="fcb-arrow" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
