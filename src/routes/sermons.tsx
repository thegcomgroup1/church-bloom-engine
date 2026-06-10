import { createFileRoute } from "@tanstack/react-router";
import { Play, Youtube } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { PlanYourVisitButton } from "@/components/PlanYourVisitButton";
import { siteConfig } from "@/config/site";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@onehopeaz";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons — One Hope Church, Tucson AZ" },
      {
        name: "description",
        content:
          "Watch the latest message from One Hope Church. Bible-centered teaching, plainly taught — available on YouTube any time.",
      },
      { property: "og:title", content: "Sermons — One Hope Church" },
      {
        property: "og:description",
        content: "Watch the latest message from One Hope Church on YouTube.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onehopeaz.com/sermons" },
    ],
    links: [{ rel: "canonical", href: "https://onehopeaz.com/sermons" }],
  }),
  component: SermonsPage,
});

function SermonsPage() {
  const { sermon } = siteConfig;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        {/* Hero */}
        <section className="bg-secondary py-20 text-secondary-foreground md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary-foreground/70">
              Messages
            </p>
            <h1 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
              Listen in before you walk in.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-secondary-foreground/85 md:text-lg">
              You don't have to wonder what we teach. Sample a recent message and decide for
              yourself.
            </p>
          </div>
        </section>

        {/* Featured message */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-black shadow-sm">
              {sermon.embedUrl ? (
                <iframe
                  src={sermon.embedUrl}
                  title={sermon.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {sermon.series} · {sermon.date}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                  {sermon.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{sermon.speaker}</p>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">{sermon.summary}</p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={sermon.watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                >
                  <Play className="h-4 w-4" aria-hidden />
                  Watch on YouTube
                </a>
                <a
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-input bg-background px-5 text-sm font-medium hover:bg-accent"
                >
                  <Youtube className="h-4 w-4" aria-hidden />
                  Browse all messages
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/40 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Even better in person.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Sundays at 10:30 AM. We'd love to see you.
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
