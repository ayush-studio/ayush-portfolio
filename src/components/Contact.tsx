"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useToast } from "./Toast";
import { RECRUITER_QUICK_FACTS } from "@/data/data";

interface FormState {
  name: string;
  email: string;
  message: string;
  botcheck: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

/**
 * Contact — Production contact form with serverless API delivery + mailto fallback.
 */
export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", botcheck: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // ─── Validation ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit Handler ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("API submission issue");
      }

      setStatus("success");
      showToast("Message sent successfully! Ayush will get back to you shortly.");
      setForm({ name: "", email: "", message: "", botcheck: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      // Graceful fallback to client mailto
      const mailtoUrl = `mailto:${RECRUITER_QUICK_FACTS.email}?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
      window.open(mailtoUrl, "_blank");
      setStatus("success");
      showToast("Opened message draft in your email client!");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(RECRUITER_QUICK_FACTS.email);
    setCopiedEmail(true);
    showToast("Email copied to clipboard! (ayushkumaar41@gmail.com)");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl glass border text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]
     bg-transparent outline-none transition-colors duration-200
     focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30
     ${errors[field] ? "border-red-500/60" : "border-[var(--border-color)]"}`;

  return (
    <section id="contact" className="py-24 relative">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.08), transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
            06 // Collaboration &amp; Inquiries
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg mx-auto text-sm sm:text-base">
            Open to senior engineering roles, technical advisory, or conversations on
            frontend architecture and AI workflows.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                Let&apos;s build something{" "}
                <span className="gradient-text">exceptional</span> together.
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                Whether you need a frontend systems architect, want to eliminate LLM token costs
                with deterministic algorithms, or seek a senior React/Angular engineer for your team —
                I respond quickly.
              </p>
            </div>

            {/* Quick Copy Email Card */}
            <div className="glass rounded-xl p-4 border border-[var(--border-color)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-[var(--text-secondary)]">Direct Email</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {RECRUITER_QUICK_FACTS.email}
                  </p>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold glass border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              {[
                {
                  icon: FaGithub,
                  label: "GitHub",
                  value: "github.com/ayush-studio",
                  href: RECRUITER_QUICK_FACTS.github,
                  color: "hover:text-gray-300",
                },
                {
                  icon: FaLinkedinIn,
                  label: "LinkedIn",
                  value: "linkedin.com/in/ayush-kumar-017640191",
                  href: RECRUITER_QUICK_FACTS.linkedin,
                  color: "hover:text-blue-400",
                },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className={`flex items-center justify-between p-3.5 rounded-xl glass border border-[var(--border-color)]
                               hover:border-[var(--accent)]/40 transition-all duration-200 group ${color}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)]/20 transition-colors">
                      <Icon size={16} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-[var(--text-secondary)]">
                        {label}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">{value}</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="glass rounded-2xl p-6 sm:p-8 border border-[var(--border-color)] space-y-5"
            >
              {/* Honeypot field (hidden from users, traps automated bots) */}
              <input
                type="text"
                name="botcheck"
                value={form.botcheck}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                >
                  Your Name / Organization
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan · Technical Recruiter"
                  className={inputClass("name")}
                  disabled={status === "loading"}
                />
                {errors.name && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  className={inputClass("email")}
                  disabled={status === "loading"}
                />
                {errors.email && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about the role, project scope, or opportunity..."
                  className={`${inputClass("message")} resize-none`}
                  disabled={status === "loading"}
                />
                {errors.message && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                id="contact-submit-btn"
                type="submit"
                disabled={status === "loading"}
                whileHover={status === "idle" ? { scale: 1.01 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300
                  ${
                    status === "success"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                      : status === "loading"
                      ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 cursor-pointer"
                  }`}
              >
                {status === "loading" && (
                  <><Loader2 size={16} className="animate-spin" /> Transmitting Message…</>
                )}
                {status === "success" && (
                  <><CheckCircle2 size={16} /> Delivered! Will reply within 24h 🎉</>
                )}
                {(status === "idle" || status === "error") && (
                  <><Send size={16} /> Send Direct Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-[var(--border-color)] text-center">
        <p className="text-[var(--text-secondary)] text-sm">
          Crafted with precision by{" "}
          <span className="gradient-text font-semibold">Ayush Kumar</span>
          {" "}· Next.js 16 (App Router), TypeScript, Tailwind CSS &amp; Framer Motion
        </p>
      </div>
    </section>
  );
}
