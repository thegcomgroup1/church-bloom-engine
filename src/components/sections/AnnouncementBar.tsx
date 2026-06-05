import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "onehope.announcement.dismissed.v1";

export function AnnouncementBar() {
  const { announcement } = siteConfig;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement.enabled) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [announcement.enabled]);

  if (!announcement.enabled || !visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <MapPin className="hidden h-4 w-4 flex-shrink-0 sm:block" aria-hidden />
        <p className="flex-1 text-sm leading-snug">
          <span className="font-medium">{announcement.text}</span>{" "}
          <a
            href={announcement.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-90"
          >
            {announcement.ctaLabel}
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
