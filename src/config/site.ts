/**
 * HLPR Master Ministry Base — site configuration (the swap layer).
 * ─────────────────────────────────────────────────────────────────
 * REMIX: One Hope Church, Tucson AZ (onehopeaz.com)
 * Free homepage mockup — image-only (no hero video, no welcome video).
 *
 * DESIGN BRIEF (from Timbo's call, in his words):
 *   - His current site is "all things for all people, therefore nothing
 *     for anybody." The #1 job of this mockup is to prove the OPPOSITE:
 *     ONE clear identity, ONE clear next step. RESTRAINT is the feature.
 *   - He needs "an entry point, a ramp" for a first-time visitor:
 *     "Who are you? Will I go to church there?" → Plan a Visit.
 *   - Make the website the hub: connect card, sermons link out to YouTube,
 *     sign-ups all point back to the site.
 *   - Identity is Word-centered + family + belonging. NOT attractional/flashy.
 *     His line: "We don't change the Bible, we let it change us."
 *     His promise: "You're not going to be impressed. You're going to be
 *     loved. You're going to be brought in. You're going to be greeted."
 *   - Multicultural & real: ~25 Ukrainian refugees, third-gen Hispanic,
 *     white — a genuine family across cultures. (Signature touch.)
 *   - Giving: Tithely. Sermons: YouTube (channel "One Hope").
 *
 * The fixed "gap" vs. their current site: cut the clutter, lead with one
 * identity and one prominent, repeated Plan-a-Visit ramp.
 */

import heroImage from "@/assets/placeholders/hero.jpg";
import storyImage from "@/assets/placeholders/story.jpg";
import life1 from "@/assets/placeholders/life-1.jpg";
import life2 from "@/assets/placeholders/life-2.jpg";
import life3 from "@/assets/placeholders/life-3.jpg";
import life4 from "@/assets/placeholders/life-4.jpg";
import life5 from "@/assets/placeholders/life-5.jpg";
import life6 from "@/assets/placeholders/life-6.jpg";

export const siteConfig = {
  church: {
    name: "One Hope Church",
    shortName: "One Hope",
    city: "Tucson, AZ",
    tagline: "Come as you are. Be known. Be loved.",
    mission:
      "A Bible-centered family in Tucson where you'll be greeted, brought in, and loved — and where you'll learn to follow Jesus one step at a time.",
    story: [
      "We're not a flashy church, and we're okay with that. When you walk in, you won't be wowed by lights and a show — you'll be greeted, brought in, and known. That's the point.",
      "We're a real family across cultures — folks born in Tucson, third-generation Hispanic neighbors, and around twenty-five Ukrainian friends who've become part of us. Whoever you are, there's a place for you at this table.",
    ],
    foundedLine: "A church for Tucson",
  },

  brand: {
    logoText: "One Hope",
    storyImageSrc: storyImage,

    heroMedia: {
      type: "image" as "image" | "video",
      imageSrc: heroImage,
      videoSrc: "",
    },
  },

  service: {
    timesShort: "Sundays · 10:30 AM",
    timesLong: [
      { day: "Sunday", time: "10:30 AM" },
    ],
    address: "Miller Elementary School, 6951 S Camino De La Tierra, Tucson, AZ 85746",
    mapEmbedUrl:
      "https://www.google.com/maps?q=6951+S+Camino+De+La+Tierra,+Tucson,+AZ+85746&output=embed",
    mapLinkUrl: "https://www.google.com/maps?q=6951+S+Camino+De+La+Tierra,+Tucson,+AZ+85746",
    practical: [
      { label: "Where", value: "We meet at Miller Elementary — easy to find, easy to park" },
      { label: "Service length", value: "About one hour" },
      { label: "What to wear", value: "Come exactly as you are" },
    ],
  },

  // The "ramp" Timbo asked for — answers "Will I go to church there?"
  expect: [
    {
      icon: "Heart" as const,
      title: "You'll be greeted and brought in",
      body: "No spotlight, no pressure. You'll be welcomed by name and folded into a family that's genuinely glad you came.",
    },
    {
      icon: "BookOpen" as const,
      title: "You'll hear the Bible, plainly",
      body: "We don't change the Bible — we let it change us. Expect a message rooted in Scripture that actually meets your week.",
    },
    {
      icon: "Users" as const,
      title: "A real family, across cultures",
      body: "Tucson neighbors, Hispanic families, Ukrainian friends — different stories, one table. You'll fit here.",
    },
    {
      icon: "Clock" as const,
      title: "About an hour, come as you are",
      body: "Quality, not a production. Casual, warm, and over in about an hour. Wear whatever feels like you.",
    },
  ],

  life: [
    { src: life1, alt: "The One Hope family gathered on a Sunday" },
    { src: life2, alt: "Welcoming a first-time guest" },
    { src: life3, alt: "Teaching from the Bible" },
    { src: life4, alt: "Friends from many backgrounds together" },
    { src: life5, alt: "Families connecting after service" },
    { src: life6, alt: "Serving the Tucson community" },
  ],

  // Kept deliberately short — Timbo wants LESS, not more. One identity.
  ministries: [
    { name: "Plan Your First Visit", line: "New here? This is your ramp. We'll tell you exactly what to expect and make your first Sunday easy." },
    { name: "Rooted in the Word", line: "Bible-centered teaching for believers and seekers alike. Discipleship is a journey, and it starts wherever you are." },
    { name: "A Family for Everyone", line: "Across cultures and backgrounds, this is a place to belong, be known, and be loved." },
    { name: "Following Together", line: "Whether you're exploring faith or growing in it, we'll help you take the next step — and we'll walk it with you." },
  ],

  events: [
    {
      date: "This Sunday · 10:30 AM",
      title: "Join Us at Miller Elementary",
      blurb: "Come a few minutes early — we'll be watching for you and help you get settled.",
    },
    {
      date: "Every week",
      title: "New Here? Plan a Visit",
      blurb: "Let us know you're coming and we'll have someone ready to welcome you by name.",
    },
  ],

  sermon: {
    title: "[Latest Message — link from the One Hope YouTube channel]",
    speaker: "Dr. Timothy Fowler",
    series: "[Current Series]",
    date: "[Recent Date]",
    summary:
      "Bible-centered, plainly taught. Catch the latest message on YouTube, or join us in person this Sunday.",
    embedUrl: "", // link out to YouTube, do not self-host (keeps the site fast)
    watchUrl: "#", // One Hope YouTube channel
  },

  give: {
    line: "Every gift helps One Hope love Tucson well and reach more families with the gospel. Simple, secure giving through Tithely.",
    onlineUrl: "#", // existing Tithely link
  },

  welcomeVideo: {
    enabled: false,
    eyebrow: "Meet us first",
    heading: "A quick hello before you visit.",
    body:
      "We know visiting a new church can feel like a big step. Here's a short hello so you know exactly who you'll be meeting on Sunday.",
    posterSrc: storyImage,
    embedUrl: "",
  },

  contact: {
    phone: "(520) 940-8464",
    email: "church@onehopeaz.com",
    socials: [
      { label: "YouTube", url: "#" },
      { label: "Facebook", url: "#" },
      { label: "Instagram", url: "#" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
