import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Footer } from "@/components/sections/Footer";
import { PlanYourVisitButton } from "@/components/PlanYourVisitButton";
import { PageHero } from "@/components/sections/PageHero";
import { siteConfig } from "@/config/site";
import timothyPhoto from "@/assets/leadership/timothy-fowler.jpg.asset.json";
import alexPhoto from "@/assets/leadership/alex-karnaushenko.jpg.asset.json";


type Leader = {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  placeholder?: boolean;
};

// Easy-to-edit roster. Replace placeholder cards as content becomes available.
const leaders: Leader[] = [
  {
    name: "Dr. Timothy Fowler",
    role: "Founding & Lead Pastor",
    bio: "Dr. Timothy Fowler — \"Timbo\" to his friends — is One Hope's founding pastor, known for passionate leadership and a down-to-earth, humorous Bible teaching style. He's married to Robin, with four sons and six young grandchildren. He earned his Master of Divinity from Southern Seminary and Doctor of Ministry from Liberty University Divinity School, and also serves as Mission Strategist of the Catalina Baptist Association of churches in southern Arizona.",
    photoUrl: timothyPhoto.url,
  },
  {
    name: "Alex Karnaushenko",
    role: "Pastor for Worship & Slavic Ministries",
    bio: "Alex Karnaushenko is One Hope's Pastor for Worship and Slavic Ministries. Alex came to the U.S. as a refugee from war and is known for his resilient leadership and multi-talented music abilities. He's married to Alla and has three daughters. Alex earned a Master's in Computer Science and also works in the Community Ministry field here in Tucson.",
    photoUrl: alexPhoto.url,
  },
];

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership — One Hope Church, Tucson AZ" },
      {
        name: "description",
        content:
          "Meet the team that leads, teaches, and shepherds One Hope Church in Tucson — starting with lead pastor Dr. Timothy Fowler.",
      },
      { property: "og:title", content: "Leadership — One Hope Church" },
      {
        property: "og:description",
        content: "Meet the team that leads and teaches at One Hope Church in Tucson.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onehopeaz.com/leadership" },
    ],
    links: [{ rel: "canonical", href: "https://onehopeaz.com/leadership" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Dr. Timothy Fowler",
          jobTitle: "Lead Pastor",
          worksFor: {
            "@type": "Church",
            name: "One Hope Church",
            url: "https://onehopeaz.com",
          },
        }),
      },
    ],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <PageHero
          imageSrc={siteConfig.brand.pageHeroes.leadership}
          imageAlt="Teaching from the Bible at One Hope Church"
          eyebrow="Our team"
          title="The people behind One Hope."
          intro="Real people who love Jesus, love Tucson, and would love to meet you. No celebrities, no posturing — just shepherds who care."
        />


        {/* Grid */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {leaders.map((l, i) => (
                <article
                  key={i}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="flex aspect-square items-center justify-center bg-muted">
                    {l.photoUrl ? (
                      <img
                        src={l.photoUrl}
                        alt={l.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <User className="h-20 w-20 text-muted-foreground/40" aria-hidden />
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl font-semibold">{l.name}</h2>
                    <p className="mt-1 text-sm font-medium text-primary">{l.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.bio}</p>
                    {l.placeholder && (
                      <p className="mt-3 text-xs italic text-muted-foreground/70">
                        Bio coming soon
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/40 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Come meet us in person.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              The best introduction happens face to face on a Sunday morning.
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
