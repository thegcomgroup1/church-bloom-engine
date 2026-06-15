/**
 * One Hope Church — site configuration (the swap layer).
 * Real photos sourced from onehopeaz.com (served via Lovable CDN assets).
 */

import logoAsset from "@/assets/onehope/logo.png.asset.json";
import hero from "@/assets/onehope/IMG_4336-scaled.jpg.asset.json";
import story from "@/assets/onehope/16366.jpg.asset.json";
import life1 from "@/assets/onehope/IMG_0278-scaled.jpg.asset.json";
import life2 from "@/assets/onehope/15456.jpg.asset.json";
import life3 from "@/assets/onehope/IMG_0076-scaled.jpg.asset.json";
import life4 from "@/assets/onehope/IMG_0124-scaled.jpg.asset.json";
import life5 from "@/assets/onehope/15612.jpeg.asset.json";
import life6 from "@/assets/onehope/11213.jpg.asset.json";

export const siteConfig = {
  announcement: {
    enabled: true,
    text: "We've moved! Join us Sundays at our new home — Lawrence Primary School.",
    ctaLabel: "Get directions",
    ctaUrl: "https://www.google.com/maps?q=4850+W+Jeffrey+Rd,+Tucson,+AZ+85746",
  },

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
    logoImageSrc: logoAsset.url,
    storyImageSrc: story.url,

    heroMedia: {
      type: "image" as "image" | "video",
      imageSrc: hero.url,
      videoSrc: "",
    },

    /** Per-page hero photos for interior routes. */
    pageHeroes: {
      planAVisit: hero.url,
      about: story.url,
      leadership: life3.url,
      give: life4.url,
      contact: life2.url,
      sermons: life3.url,
    },
  },


  service: {
    timesShort: "Sundays · 10:30 AM",
    timesLong: [
      { day: "Sunday", time: "10:30 AM" },
    ],
    address: "Lawrence Primary School, 4850 W Jeffrey Rd, Tucson, AZ 85746",
    mapEmbedUrl:
      "https://www.google.com/maps?q=4850+W+Jeffrey+Rd,+Tucson,+AZ+85746&output=embed",
    mapLinkUrl: "https://www.google.com/maps?q=4850+W+Jeffrey+Rd,+Tucson,+AZ+85746",
    practical: [
      { label: "Where", value: "We meet at Lawrence Primary — easy to find, easy to park" },
      { label: "Service length", value: "About one hour" },
      { label: "What to wear", value: "Come exactly as you are" },
    ],
  },

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
    { src: life1.url, alt: "The One Hope family gathered on a Sunday" },
    { src: life2.url, alt: "Welcoming a first-time guest" },
    { src: life3.url, alt: "Teaching from the Bible" },
    { src: life4.url, alt: "Friends from many backgrounds together" },
    { src: life5.url, alt: "Families connecting after service" },
    { src: life6.url, alt: "Serving the Tucson community" },
  ],

  ministries: [
    { name: "Plan Your First Visit", line: "New here? This is your ramp. We'll tell you exactly what to expect and make your first Sunday easy." },
    { name: "Rooted in the Word", line: "Bible-centered teaching for believers and seekers alike. Discipleship is a journey, and it starts wherever you are." },
    { name: "A Family for Everyone", line: "Across cultures and backgrounds, this is a place to belong, be known, and be loved." },
    { name: "Following Together", line: "Whether you're exploring faith or growing in it, we'll help you take the next step — and we'll walk it with you." },
  ],

  events: [
    {
      date: "This Sunday · 10:30 AM",
      title: "Join Us at Lawrence Primary",
      blurb: "We've moved! Come a few minutes early — we'll be watching for you and help you get settled at our new location.",
    },
    {
      date: "Every week",
      title: "New Here? Plan a Visit",
      blurb: "Let us know you're coming and we'll have someone ready to welcome you by name.",
    },
  ],

  sermon: {
    title: "Latest Message",
    speaker: "Dr. Timothy Fowler",
    series: "One Hope Church",
    date: "On YouTube",
    summary:
      "Bible-centered, plainly taught. Catch the latest message on YouTube, or join us in person this Sunday.",
    embedUrl: "https://www.youtube.com/embed/P_VkF72Wwiw",
    watchUrl: "https://www.youtube.com/watch?v=P_VkF72Wwiw",
  },

  give: {
    line: "Every gift helps One Hope love Tucson well and reach more families with the gospel. Simple, secure giving through Tithely.",
    onlineUrl: "https://give.tithe.ly/?formId=8aed056e-6865-11ee-90fc-1260ab546d11",
  },

  welcomeVideo: {
    enabled: false,
    eyebrow: "Meet us first",
    heading: "A quick hello before you visit.",
    body:
      "We know visiting a new church can feel like a big step. Here's a short hello so you know exactly who you'll be meeting on Sunday.",
    posterSrc: story.url,
    embedUrl: "",
  },

  contact: {
    phone: "(520) 940-8464",
    email: "church@onehopeaz.com",
    /** Inbox that receives visit-plan notifications and other internal alerts. */
    notificationEmail: "church@onehopeaz.com",
    socials: [
      { label: "Facebook", url: "https://www.facebook.com/onehopeaz" },
      { label: "Instagram", url: "https://www.instagram.com/onehopeaz" },
      { label: "YouTube", url: "https://www.youtube.com/@onehopeaz" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/one-hope-az/" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
