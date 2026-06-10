import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Car, Shirt, Baby, Timer } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { PlanYourVisit } from "@/components/sections/PlanYourVisit";
import { siteConfig } from "@/config/site";

const faqs = [
  {
    q: "Is it kid-friendly?",
    a: "Absolutely. Bring the whole family — kids are welcome in service, and we'll help you find a comfortable spot.",
  },
  {
    q: "How long is the service?",
    a: "About one hour, start to finish.",
  },
  {
    q: "What should I wear?",
    a: "Come exactly as you are. Most folks are casual — jeans are completely normal.",
  },
  {
    q: "Where do I park?",
    a: "Park in the Lawrence Primary lot. It's easy to find and there's plenty of room.",
  },
  {
    q: "Will I be put on the spot?",
    a: "Never. No spotlight, no awkward stand-up moment, no pressure to give. You can simply come and observe.",
  },
];

export const Route = createFileRoute("/plan-a-visit")({
  head: () => ({
    meta: [
      { title: "Plan a Visit — One Hope Church, Tucson AZ" },
      {
        name: "description",
        content:
          "Your first Sunday made easy. Service times, directions to Lawrence Primary School, what to expect, and answers to common questions.",
      },
      { property: "og:title", content: "Plan a Visit — One Hope Church" },
      {
        property: "og:description",
        content:
          "Sundays at 10:30 AM at Lawrence Primary School in Tucson. Here's everything you need for your first visit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onehopeaz.com/plan-a-visit" },
    ],
    links: [{ rel: "canonical", href: "https://onehopeaz.com/plan-a-visit" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PlanAVisitPage,
});

function PlanAVisitPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        {/* Hero */}
        <section className="bg-secondary py-20 text-secondary-foreground md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary-foreground/70">
              Plan your visit
            </p>
            <h1 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
              Your first Sunday, made easy.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-secondary-foreground/85 md:text-lg">
              We'd love to meet you. Here's everything you need to walk in confident on Sunday — no
              guessing, no surprises.
            </p>
          </div>
        </section>

        {/* Times & Location */}
        <section className="border-b border-border/60 bg-muted/40 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="font-display text-3xl font-semibold md:text-4xl">
                  When &amp; where
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Service time</p>
                      <p className="mt-1 text-lg font-medium">Sundays · 10:30 AM</p>
                      <p className="text-sm text-muted-foreground">About one hour</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p className="mt-1 text-lg font-medium">{siteConfig.service.address}</p>
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

                  <div className="grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-3">
                    <Practical icon={Car} label="Parking" value="Lawrence Primary lot, plenty of room" />
                    <Practical icon={Timer} label="Service length" value="About one hour" />
                    <Practical icon={Shirt} label="What to wear" value="Come exactly as you are" />
                    <Practical icon={Baby} label="Kids" value="All ages welcome in service" />
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <iframe
                  src={siteConfig.service.mapEmbedUrl}
                  title="Map to Lawrence Primary School"
                  loading="lazy"
                  className="h-full min-h-[360px] w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <WhatToExpect />
        <PlanYourVisit />

        {/* FAQ */}
        <section className="bg-muted/40 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Questions, answered.
            </h2>
            <dl className="mt-10 space-y-8">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-display text-lg font-semibold">{f.q}</dt>
                  <dd className="mt-2 text-base text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Practical({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Car;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
