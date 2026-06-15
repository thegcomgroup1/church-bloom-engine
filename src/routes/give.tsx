import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, MapPin, Mail } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { siteConfig } from "@/config/site";


export const Route = createFileRoute("/give")({
  head: () => ({
    meta: [
      { title: "Give — One Hope Church, Tucson AZ" },
      {
        name: "description",
        content:
          "Give securely online through Tithely, in person on Sunday, or by mail. Every gift helps One Hope love Tucson well.",
      },
      { property: "og:title", content: "Give — One Hope Church" },
      {
        property: "og:description",
        content:
          "Simple, secure giving. Every gift helps One Hope love Tucson well and reach more families with the gospel.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onehopeaz.com/give" },
    ],
    links: [{ rel: "canonical", href: "https://onehopeaz.com/give" }],
  }),
  component: GivePage,
});

function GivePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <PageHero
          imageSrc={siteConfig.brand.pageHeroes.give}
          imageAlt="The One Hope Church family serving together"
          eyebrow="Give"
          title="Generosity, made simple."
          intro={siteConfig.give.line}
        >
          <div className="flex flex-col items-center gap-3">
            <a
              href={siteConfig.give.onlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow-sm transition-all hover:brightness-110"
            >
              <Heart className="mr-2 h-4 w-4" aria-hidden />
              Give online
            </a>
            <p className="flex items-center gap-2 text-xs text-white/95">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Secure giving via Tithely
            </p>
          </div>
        </PageHero>


        {/* Other ways */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center font-display text-3xl font-semibold md:text-4xl">
              Other ways to give
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">In person on Sunday</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Drop a gift in the offering on Sunday at Lawrence Primary School. Cash or check
                  payable to One Hope Church.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">By mail</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Mail a check to One Hope Church. Reach out at{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>{" "}
                  for our mailing address.
                </p>
              </div>
            </div>

            <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground">
              Thank you for your generosity. Every gift directly fuels gospel ministry in Tucson —
              welcoming neighbors, teaching the Bible, and caring for the people God brings through
              our doors.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
