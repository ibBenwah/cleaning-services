'use client'

import { useState } from "react";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  service?: string;
}

const services = [
  "Commercial Cleaning",
  "Strip & Wax",
  "Standard Cleaning",
  "Super Deep Clean",
  "Move In / Move Out Cleaning",
  "Not sure / General inquiry",
];

const initialData: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Full name is required.";
  if (!data.company.trim()) errors.company = "Company or property name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.service) errors.service = "Please select a service.";
  return errors;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setFormData(initialData);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 rounded-lg border text-sm text-foreground bg-white transition-colors outline-none focus:ring-2 focus:ring-sky/30 ${
      field ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-sky"
    }`;

  if (status === "success") {
    return (
      <section id="quote" className="py-20 sm:py-28 bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-3">We got your request!</h2>
          <p className="text-muted">
            Thank you for reaching out. We&apos;ll review your details and get back to you within one business day.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sky text-sm font-semibold hover:underline"
          >
            Submit another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 sm:py-28 bg-surface">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sky text-sm font-semibold tracking-widest uppercase mb-3">
            Get Started
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-3">
            Request a Free Quote
          </h2>
          <p className="text-muted">
            Fill out the form below and we&apos;ll get back to you within one business day.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className={inputClass(errors.name)}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Company / Property Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Properties"
                className={inputClass(errors.company)}
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">{errors.company}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={inputClass(errors.email)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className={inputClass()}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={inputClass(errors.service)}
            >
              <option value="">Select a service...</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-xs text-red-500">{errors.service}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Additional Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about the space, square footage, frequency, or anything else that would help us give you an accurate quote..."
              className={inputClass()}
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-sky hover:bg-sky/90 disabled:opacity-60 text-white font-semibold py-4 rounded-lg text-base transition-colors"
          >
            {status === "submitting" ? "Sending..." : "Send Quote Request"}
          </button>
        </form>
      </div>
    </section>
  );
}
