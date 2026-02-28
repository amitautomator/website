"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  :root {
    --white:   #ffffff;
    --off:     #fafaf8;
    --surface: #f5f4f0;
    --border:  #e9e7e1;
    --border2: #d6d2c9;
    --ink:     #0f0f0e;
    --ink2:    #38372f;
    --muted:   #7c7a72;
    --accent:  #e8390e;
    --accent2: #ff6b3d;
    --blue:    #1a56db;
    --gold:    #c98a06;
    --shadow-sm: 0 1px 3px rgba(15,15,14,0.06), 0 1px 2px rgba(15,15,14,0.04);
    --shadow-md: 0 4px 16px rgba(15,15,14,0.08), 0 2px 6px rgba(15,15,14,0.05);
    --shadow-lg: 0 16px 48px rgba(15,15,14,0.11), 0 4px 16px rgba(15,15,14,0.06);
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body:    'DM Sans', system-ui, sans-serif;
  }

  .ct-page *, .ct-page *::before, .ct-page *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }
  .ct-page {
    font-family: var(--font-body);
    background: var(--white);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* ── Reveal ── */
  .ct-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .ct-reveal.visible { opacity: 1; transform: translateY(0); }
  .ct-rd1 { transition-delay: 0.1s; }
  .ct-rd2 { transition-delay: 0.2s; }

  /* ════════════════════════════════
     HERO
  ════════════════════════════════ */
  .ct-hero {
    padding: 7rem 7vw 5.5rem;
    border-bottom: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .ct-hero::before {
    content: '';
    position: absolute; top: -20%; right: -10%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.05) 0%, rgba(26,86,219,0.03) 55%, transparent 70%);
    pointer-events: none;
  }
  .ct-hero-inner { max-width: 640px; position: relative; z-index: 1; }

  /* Eyebrow — mirrors homepage .eyebrow */
  .ct-eyebrow {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.25rem;
  }
  .ct-eyebrow-bar {
    width: 1.8rem; height: 1.5px;
    background: var(--accent); border-radius: 2px; flex-shrink: 0;
  }

  /*
   * Hero heading — DM Serif Display at weight 400, same as homepage .hero-brand.
   * Italic accent word mirrors .line-accent technique.
   */
  .ct-hero-h1 {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5.2vw, 5rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-bottom: 1.4rem;
  }
  .ct-hero-h1 em {
    font-style: italic;
    color: var(--accent);
  }

  /* Hero sub — mirrors homepage .hero-sub */
  .ct-hero-sub {
    font-family: var(--font-body);
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    color: var(--muted);
    line-height: 1.8;
    font-weight: 400;
    max-width: 520px;
    letter-spacing: 0.005em;
  }

  /* ════════════════════════════════
     BODY: 2-COL LAYOUT
  ════════════════════════════════ */
  .ct-body {
    padding: 5.5rem 7vw 6rem;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 5rem;
    align-items: start;
  }
  @media (max-width: 960px) {
    .ct-body { grid-template-columns: 1fr; gap: 3.5rem; padding: 4rem 1.5rem 5rem; }
  }

  /* ── LEFT: Contact info ── */
  .ct-info { display: flex; flex-direction: column; gap: 2rem; }

  /* Info lead — mirrors homepage .section-body */
  .ct-info-lead {
    font-family: var(--font-body);
    font-size: 0.97rem;
    color: var(--muted);
    line-height: 1.85;
    font-weight: 400;
    letter-spacing: 0.005em;
  }

  .ct-contact-list { display: flex; flex-direction: column; gap: 0.75rem; }

  /* Contact item — mirrors homepage .feature-item style with card treatment */
  .ct-contact-item {
    display: flex; align-items: center; gap: 1rem;
    background: var(--off);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    text-decoration: none;
    color: inherit;
  }
  .ct-contact-item:hover {
    border-color: var(--accent);
    box-shadow: 0 4px 20px rgba(232,57,14,0.08);
    transform: translateX(4px);
  }
  .ct-contact-icon {
    width: 2.5rem; height: 2.5rem; min-width: 2.5rem;
    border-radius: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .ct-contact-icon img { width: 22px !important; height: 22px !important; object-fit: contain; }

  /* Contact label — mirrors homepage .eyebrow style at smaller scale */
  .ct-contact-label {
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 0.15rem;
  }
  .ct-contact-value {
    font-family: var(--font-body);
    font-size: 0.92rem; font-weight: 500; color: var(--ink);
    letter-spacing: 0.005em;
  }

  .ct-divider { width: 100%; height: 1px; background: var(--border); }

  /* Trust note — mirrors homepage .ab-mission blockquote style */
  .ct-trust {
    background: var(--off);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: 0 10px 10px 0;
    padding: 1.25rem 1.5rem;
    font-family: var(--font-body);
    font-size: 0.9rem; color: var(--muted);
    line-height: 1.8; font-style: italic; font-weight: 400;
    letter-spacing: 0.005em;
  }

  /* ── RIGHT: Form card ── */
  .ct-form-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: var(--shadow-lg);
    position: relative; overflow: hidden;
  }
  .ct-form-card::before {
    content: '';
    position: absolute; top: -10%; right: -10%;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.03) 0%, transparent 65%);
    pointer-events: none;
  }

  .ct-form-header { margin-bottom: 2rem; }

  /* Form eyebrow — matches homepage .eyebrow-blue pattern */
  .ct-form-eyebrow {
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--blue); margin-bottom: 0.55rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .ct-form-eyebrow::before {
    content: ''; width: 1.5rem; height: 1.5px;
    background: var(--blue); border-radius: 2px;
  }

  /*
   * Form title uses DM Serif Display — matches section headings throughout.
   */
  .ct-form-title {
    font-family: var(--font-display);
    font-size: 1.6rem; font-weight: 400;
    letter-spacing: -0.01em; color: var(--ink);
    line-height: 1.2;
  }

  /* Form grid */
  .ct-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.1rem;
  }
  @media (max-width: 560px) { .ct-form-grid { grid-template-columns: 1fr; } }
  .ct-col-full { grid-column: 1 / -1; }

  .ct-field { display: flex; flex-direction: column; gap: 0.4rem; }

  /* Label — matches homepage .eyebrow at smaller scale */
  .ct-label {
    font-family: var(--font-body);
    font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.03em; color: var(--ink2);
  }
  .ct-label span { color: var(--accent); margin-left: 0.1rem; }

  /* Inputs — DM Sans, clean focus ring using accent color */
  .ct-input, .ct-select, .ct-textarea {
    width: 100%;
    background: var(--off);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 0.72rem 1rem;
    font-family: var(--font-body);
    font-size: 0.875rem; color: var(--ink);
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    letter-spacing: 0.005em;
  }
  .ct-input::placeholder, .ct-textarea::placeholder { color: var(--muted); }
  .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
    border-color: var(--accent);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(232,57,14,0.08);
  }
  .ct-input:hover, .ct-select:hover, .ct-textarea:hover {
    border-color: var(--border2);
  }
  .ct-textarea { resize: vertical; min-height: 110px; line-height: 1.7; }

  .ct-select-wrap { position: relative; }
  .ct-select-arrow {
    position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%);
    pointer-events: none; color: var(--muted);
  }

  /* Submit button — mirrors homepage .btn-primary exactly */
  .ct-submit {
    width: 100%;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    margin-top: 0.5rem;
    background: var(--accent); color: #fff; border: none;
    padding: 0.95rem 2rem;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.875rem; font-weight: 600; letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 10px rgba(232,57,14,0.2), 0 1px 3px rgba(232,57,14,0.1);
  }
  .ct-submit:hover:not(:disabled) {
    background: #cc2f08;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(232,57,14,0.28);
  }
  .ct-submit:disabled { opacity: 0.65; cursor: not-allowed; }

  .ct-spinner {
    width: 15px; height: 15px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    animation: ct-spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes ct-spin { to { transform: rotate(360deg); } }

  /* ════════════════════════════════
     TOAST ALERTS
  ════════════════════════════════ */
  .ct-toast-stack {
    position: fixed; bottom: 1.5rem; right: 1.5rem;
    display: flex; flex-direction: column; gap: 0.6rem;
    z-index: 9999; pointer-events: none;
  }
  .ct-toast {
    pointer-events: all;
    display: flex; align-items: flex-start; gap: 0.75rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    box-shadow: var(--shadow-lg);
    min-width: 280px; max-width: 360px;
    animation: ct-toast-in 0.35s cubic-bezier(0.22,1,0.36,1);
    position: relative;
  }
  @keyframes ct-toast-in {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
  }
  .ct-toast-dot {
    width: 8px; height: 8px; border-radius: 50%;
    flex-shrink: 0; margin-top: 0.3rem;
  }
  .ct-toast-dot-success { background: #16a34a; }
  .ct-toast-dot-error   { background: var(--accent); }
  .ct-toast-dot-warning { background: var(--gold); }
  .ct-toast-dot-info    { background: var(--blue); }
  .ct-toast-msg {
    font-family: var(--font-body);
    font-size: 0.875rem; color: var(--ink2); line-height: 1.5; flex: 1;
    letter-spacing: 0.005em;
  }
  .ct-toast-close {
    background: none; border: none; cursor: pointer; padding: 0;
    color: var(--muted); font-size: 1rem; line-height: 1;
    transition: color 0.15s; flex-shrink: 0;
  }
  .ct-toast-close:hover { color: var(--ink); }
  .ct-toast::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; border-radius: 12px 0 0 12px;
  }
  .ct-toast-success::before { background: #16a34a; }
  .ct-toast-error::before   { background: var(--accent); }
  .ct-toast-warning::before { background: var(--gold); }
  .ct-toast-info::before    { background: var(--blue); }
`;

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ct-reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Toast ─────────────────────────────────────────────────────────────────────
type AlertType = "success" | "error" | "warning" | "info";
interface AlertItem {
  id: number;
  type: AlertType;
  message: string;
  duration?: number;
}

function ToastStack({
  alerts,
  onClose,
}: {
  alerts: AlertItem[];
  onClose: (id: number) => void;
}) {
  useEffect(() => {
    alerts.forEach((a) => {
      if (a.duration) {
        const t = setTimeout(() => onClose(a.id), a.duration);
        return () => clearTimeout(t);
      }
    });
  }, [alerts, onClose]);

  return (
    <div className="ct-toast-stack">
      {alerts.map((a) => (
        <div key={a.id} className={`ct-toast ct-toast-${a.type}`}>
          <div className={`ct-toast-dot ct-toast-dot-${a.type}`} />
          <span className="ct-toast-msg">{a.message}</span>
          <button
            className="ct-toast-close"
            onClick={() => onClose(a.id)}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const companySizes = [
  "1-20",
  "21-50",
  "51-100",
  "101-200",
  "201-500",
  "501-1000",
  ">1000",
];
const interestedOptions = [
  "Google Workspace Automation",
  "Google Workspace Training",
  "FMS & PMS Services",
  "WhatsApp Automation",
  "HRMS",
  "Website",
];
const contactItems = [
  {
    label: "Call Us",
    value: "+91 7210756879",
    icon: "/C.gif",
    href: "tel:+917210756879",
  },
  {
    label: "WhatsApp",
    value: "+91 7210756879",
    icon: "/W.gif",
    href: "https://wa.me/917210756879",
  },
  {
    label: "Email Us",
    value: "amit23kumar04@gmail.com",
    icon: "/M.gif",
    href: "mailto:amit23kumar04@gmail.com",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  useReveal();

  const [isPending, setIsPending] = useState(false);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    designation: "",
    companyName: "",
    companySize: "",
    interestedIn: "",
    message: "",
  });

  const addAlert = (type: AlertType, message: string, duration = 4000) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, type, message, duration }]);
  };
  const removeAlert = (id: number) =>
    setAlerts((prev) => prev.filter((a) => a.id !== id));

  const set =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const cleaned = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, v.trim()]),
    );
    if (!cleaned.name || !cleaned.email || !cleaned.message) {
      addAlert("error", "Please fill in all required fields.");
      setIsPending(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) {
      addAlert("warning", "Please enter a valid email address.");
      setIsPending(false);
      return;
    }
    try {
      addAlert("info", "Sending your message…", 2500);
      await axios.post("/api/contact-us", cleaned, {
        headers: { "Content-Type": "application/json" },
      });
      addAlert("success", "Message sent! We'll get back to you soon.");
      setFormData({
        name: "",
        contactNo: "",
        email: "",
        designation: "",
        companyName: "",
        companySize: "",
        interestedIn: "",
        message: "",
      });
    } catch {
      addAlert("error", "Failed to send. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="ct-page">
      <style>{globalStyles}</style>

      {/* ── HERO ── */}
      <section className="ct-hero">
        <div className="ct-hero-inner ct-reveal">
          <div className="ct-eyebrow">
            <span className="ct-eyebrow-bar" />
            Let's Talk
          </div>
          <h1 className="ct-hero-h1">
            Get in <em>Touch</em>
            <br />
            with Us
          </h1>
          <p className="ct-hero-sub">
            Ready to streamline your business with Google Workspace automation?
            Contact us for a free consultation — we'll help you save time,
            reduce errors, and focus on what truly matters.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="ct-body">
        {/* LEFT — contact info */}
        <div className="ct-info ct-reveal">
          <p className="ct-info-lead">
            Reach out through any channel below, or fill in the form and we'll
            respond within one business day.
          </p>

          <div className="ct-contact-list">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="ct-contact-item"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <div className="ct-contact-icon">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={22}
                    height={22}
                    unoptimized
                  />
                </div>
                <div>
                  <div className="ct-contact-label">{item.label}</div>
                  <div className="ct-contact-value">{item.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="ct-divider" />

          <div className="ct-trust">
            "We typically respond within a few hours during business days. All
            consultations are completely free with no obligation."
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="ct-form-card ct-reveal ct-rd1">
          <div className="ct-form-header">
            <div className="ct-form-eyebrow">Free Consultation</div>
            <div className="ct-form-title">Send Us a Message</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="ct-form-grid">
              <div className="ct-field">
                <label className="ct-label">
                  Name <span>*</span>
                </label>
                <input
                  className="ct-input"
                  type="text"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={set("name")}
                />
              </div>

              <div className="ct-field">
                <label className="ct-label">Contact No.</label>
                <input
                  className="ct-input"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.contactNo}
                  onChange={set("contactNo")}
                />
              </div>

              <div className="ct-field">
                <label className="ct-label">
                  Email <span>*</span>
                </label>
                <input
                  className="ct-input"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={formData.email}
                  onChange={set("email")}
                />
              </div>

              <div className="ct-field">
                <label className="ct-label">Designation</label>
                <input
                  className="ct-input"
                  type="text"
                  placeholder="e.g. CEO, Manager"
                  value={formData.designation}
                  onChange={set("designation")}
                />
              </div>

              <div className="ct-field">
                <label className="ct-label">Company Name</label>
                <input
                  className="ct-input"
                  type="text"
                  placeholder="Your company"
                  value={formData.companyName}
                  onChange={set("companyName")}
                />
              </div>

              <div className="ct-field">
                <label className="ct-label">Company Size</label>
                <div className="ct-select-wrap">
                  <select
                    className="ct-select"
                    value={formData.companySize}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        companySize: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    {companySizes.map((s) => (
                      <option key={s} value={s}>
                        {s} employees
                      </option>
                    ))}
                  </select>
                  <span className="ct-select-arrow">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="ct-field ct-col-full">
                <label className="ct-label">Interested In</label>
                <div className="ct-select-wrap">
                  <select
                    className="ct-select"
                    value={formData.interestedIn}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        interestedIn: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {interestedOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <span className="ct-select-arrow">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="ct-field ct-col-full">
                <label className="ct-label">
                  Message <span>*</span>
                </label>
                <textarea
                  className="ct-textarea"
                  placeholder="Tell us about your project or challenge…"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={set("message")}
                />
              </div>
            </div>

            <button type="submit" className="ct-submit" disabled={isPending}>
              {isPending ? (
                <>
                  <span className="ct-spinner" /> Sending…
                </>
              ) : (
                <>Send Message →</>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── TOASTS ── */}
      <ToastStack alerts={alerts} onClose={removeAlert} />
    </div>
  );
}
