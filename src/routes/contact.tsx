import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — One Hope Church, Tucson AZ" },
      {
        name: "description",
        content:
          "Get in touch with One Hope Church. Phone, email, address at Lawrence Primary School, and a quick way to send us a message.",
      },
      { property: "og:title", content: "Contact — One Hope Church" },
      {
        property: "og:description",
        content: "Reach out to One Hope Church in Tucson — we'd love to hear from you.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onehopeaz.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://onehopeaz.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        {/* Hero */}
        <section className="bg-secondary py-20 text-secondary-foreground md:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary-foreground/70">
              Contact
            </p>
            <h1 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
              We'd love to hear from you.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-secondary-foreground/85 md:text-lg">
              Questions, prayer requests, or just want to say hi — drop us a note and we'll get
              back to you.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
            {/* Info */}
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Get in touch</h2>
              <dl className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Sunday service
                    </dt>
                    <dd className="mt-0.5 text-base font-medium">{siteConfig.service.timesShort}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Address
                    </dt>
                    <dd className="mt-0.5 text-base font-medium">{siteConfig.service.address}</dd>
                    <a
                      href={siteConfig.service.mapLinkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Get directions
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Phone
                    </dt>
                    <dd className="mt-0.5 text-base font-medium">
                      <a href={`tel:${siteConfig.contact.phone}`} className="hover:underline">
                        {siteConfig.contact.phone}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Email
                    </dt>
                    <dd className="mt-0.5 text-base font-medium">
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="hover:underline"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <iframe
                  src={siteConfig.service.mapEmbedUrl}
                  title="Map to Lawrence Primary School"
                  loading="lazy"
                  className="h-64 w-full"
                />
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              {submitted ? (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold">Message sent.</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out — we'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="c-name" className="text-sm font-medium">
                      Your name
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="c-subject"
                      name="subject"
                      type="text"
                      className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={5}
                      required
                      className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground shadow-sm transition-all hover:brightness-110"
                  >
                    Send message
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    We'll never share your info. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
