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
