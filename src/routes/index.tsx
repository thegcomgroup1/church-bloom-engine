import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { Hero } from "@/components/sections/Hero";
import { TimesLocation } from "@/components/sections/TimesLocation";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { MissionStory } from "@/components/sections/MissionStory";
import { WelcomeVideo } from "@/components/sections/WelcomeVideo";
import { LifeOfChurch } from "@/components/sections/LifeOfChurch";
import { Ministries } from "@/components/sections/Ministries";
import { Events } from "@/components/sections/Events";
import { Sermons } from "@/components/sections/Sermons";
import { Give } from "@/components/sections/Give";
import { PlanYourVisit } from "@/components/sections/PlanYourVisit";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

const HERO_IMAGE_URL = siteConfig.brand.heroMedia.imageSrc;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One Hope Church — A Bible-centered family in Tucson, AZ" },
      {
        name: "description",
        content:
          "Visiting for the first time? Sundays at 10:30 AM at Lawrence Primary School in Tucson. You'll be greeted, brought in, and loved.",
      },
      { property: "og:title", content: "One Hope Church — A Bible-centered family in Tucson, AZ" },
      {
        property: "og:description",
        content:
          "Sundays at 10:30 AM at Lawrence Primary School in Tucson. Come as you are. Be known. Be loved.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onehopeaz.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://onehopeaz.com/" },
      { rel: "preload", as: "image", href: HERO_IMAGE_URL, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Church",
          name: siteConfig.church.name,
          url: "https://onehopeaz.com/",
          telephone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "4850 W Jeffrey Rd",
            addressLocality: "Tucson",
            addressRegion: "AZ",
            postalCode: "85746",
            addressCountry: "US",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Sunday",
              opens: "10:30",
              closes: "11:30",
            },
          ],
          sameAs: ["https://www.youtube.com/@onehopeaz"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Where does One Hope Church meet?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We meet at Lawrence Primary School, 4850 W Jeffrey Rd, Tucson, AZ 85746 — easy to find, easy to park.",
              },
            },
            {
              "@type": "Question",
              name: "How long is the service?",
              acceptedAnswer: { "@type": "Answer", text: "About one hour." },
            },
            {
              "@type": "Question",
              name: "What should I wear?",
              acceptedAnswer: { "@type": "Answer", text: "Come exactly as you are — casual and warm." },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <StickyHeader />
      <main>
        <Hero />
        <TimesLocation />
        <WhatToExpect />
        <MissionStory />
        <WelcomeVideo />
        <LifeOfChurch />
        <Ministries />
        <Events />
        <Sermons />
        <Give />
        <PlanYourVisit />
      </main>
      <Footer />
    </div>
  );
}
