import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { LifeOfChurch } from "@/components/sections/LifeOfChurch";
import { PlanYourVisitButton } from "@/components/PlanYourVisitButton";
import { siteConfig } from "@/config/site";

const beliefs = [
  {
    title: "The Bible",
    body: "We believe the Bible is God's Word — true, trustworthy, and the final authority for what we believe and how we live.",
  },
  {
    title: "One God",
    body: "There is one God, eternally existing as Father, Son, and Holy Spirit.",
  },
  {
    title: "Jesus",
    body: "Jesus is fully God and fully man. He lived a sinless life, died on the cross for our sins, rose from the dead, and is coming again.",
  },
  {
    title: "Salvation by grace",
    body: "We are saved by grace through faith in Jesus — not by anything we earn or achieve.",
  },
  {
    title: "The Church",
    body: "The Church is a family of believers — across cultures and backgrounds — gathered to worship, grow, and love our neighbors.",
  },
  {
    title: "Following Jesus",
    body: "Discipleship is a lifelong journey. Wherever you are today, the next step is one we can take together.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — One Hope Church, Tucson AZ" },
      {
        name: "description",
        content:
          "We're a Bible-centered family in Tucson where you'll be greeted, brought in, and loved. Learn our story, mission, and what we believe.",
      },
      { property: "og:title", content: "About One Hope Church" },
      {
        property: "og:description",
        content:
          "A real family across cultures — Bible-centered, plainly taught, genuinely welcoming.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onehopeaz.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://onehopeaz.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        {/* Hero */}
        <section className="bg-secondary py-20 text-secondary-foreground md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary-foreground/70">
              About us
            </p>
            <h1 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
              {siteConfig.church.tagline}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-secondary-foreground/85 md:text-lg">
              {siteConfig.church.mission}
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <img
                src={siteConfig.brand.storyImageSrc}
                alt="One Hope Church family"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
                Our story
              </p>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                {siteConfig.church.foundedLine}
              </h2>
              <div className="mt-5 space-y-4 text-base text-muted-foreground md:text-lg">
                {siteConfig.church.story.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Beliefs */}
        <section className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
                What we believe
              </p>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                Plain truth, plainly held.
              </h2>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                We don't change the Bible — we let it change us. Here's the short version of what
                we hold to.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {beliefs.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LifeOfChurch />

        {/* CTA */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              The best way to know us is to come.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Sundays at 10:30 AM at Lawrence Primary School. We'll save you a seat.
            </p>
            <div className="mt-8 flex justify-center">
              <PlanYourVisitButton size="lg" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
