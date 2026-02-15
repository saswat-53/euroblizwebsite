"use client"

import { useTranslations } from "next-intl"
import { useState, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

// Placeholder for the form input fields (using basic Tailwind classes)
const InputField = ({
    labelKey,
    type = "text",
    placeholderKey,
    value,
    onChange,
    name
}: {
    labelKey: string
    type?: string
    placeholderKey: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}) => {
    const t = useTranslations('contact');
    return (
        <div className="space-y-1">
            <label htmlFor={labelKey} className="text-xs font-semibold uppercase text-muted-foreground">{t(labelKey as any)}</label>
            <input
                type={type}
                id={labelKey}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={t(placeholderKey as any)}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                required={name !== "phone"}
            />
        </div>
    );
};


export function ContactSection() {
  const t = useTranslations()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const formAnimation = useScrollAnimation({ animationType: "fade-right", delay: 100 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    // Get reCAPTCHA token
    const recaptchaToken = recaptchaRef.current?.getValue()

    if (!recaptchaToken) {
      setSubmitStatus({
        type: "error",
        message: t("contact.recaptcha_error") || "Please complete the reCAPTCHA verification"
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || t("contact.success_message") || "Message sent successfully!"
        })
        setFormData({ name: "", email: "", phone: "", message: "" })
        recaptchaRef.current?.reset()
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || t("contact.error_message") || "Failed to send message"
        })
        recaptchaRef.current?.reset()
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus({
        type: "error",
        message: t("contact.error_message") || "An error occurred. Please try again."
      })
      recaptchaRef.current?.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // Gradient background to distinguish from partners section
    <section id="contact" className="py-20 px-4 bg-linear-to-br from-primary/95 to-section-dark">
      <div className="max-w-xl mx-auto"> {/* Centering the entire block and limiting width */}

        {/* Contact Form (High-contrast card) */}
        <div ref={formAnimation.ref} className={`p-8 md:p-10 bg-card rounded-xl shadow-2xl border border-primary/20 ${formAnimation.animationClasses}`}>

          {/* Header */}
          <h2 className="text-4xl font-extrabold text-foreground text-center mb-2">{t("contact.title")}</h2>
          <p className="text-muted-foreground text-center mb-8">{t("contact.subtitle")}</p>

          {/* Status Message */}
          {submitStatus.type && (
            <div className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-500/10 border border-green-500/50 text-green-600"
                : "bg-red-500/10 border border-red-500/50 text-red-600"
            }`}>
              {submitStatus.message}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                  {/* Name field uses full-width on mobile, split on desktop */}
                  <InputField
                    labelKey="name"
                    placeholderKey="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputField
                    labelKey="email"
                    type="email"
                    placeholderKey="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
              </div>

              <InputField
                labelKey="phone"
                placeholderKey="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-semibold uppercase text-muted-foreground">{t("contact.message" as any)}</label>
                  <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.message" as any)}
                      rows={4}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      required
                  ></textarea>
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  theme="light"
                />
              </div>

              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {isSubmitting ? t("contact.success_message") || "Sending..." : t("contact.submit") || "Submit"}
              </button>
          </form>

        </div>
      </div>
    </section>
  )
}