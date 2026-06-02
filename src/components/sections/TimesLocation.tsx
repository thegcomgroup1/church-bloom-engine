import { MapPin, Clock, Car, Shirt, Timer } from "lucide-react";
import { siteConfig } from "@/config/site";

const iconMap = { Parking: Car, "What to wear": Shirt, "Service length": Timer } as const;

export function TimesLocation() {
  return (
    <section id="times" className="border-b border-border/60 bg-muted/40 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              When &amp; where to find us
            </h2>
            <p className="mt-3 max-w-md text-base text-muted-foreground md:text-lg">
              Everything you need to walk in on Sunday — no guessing.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service times</p>
                  <ul className="mt-1 space-y-0.5">
                    {siteConfig.service.timesLong.map((t, i) => (
                      <li key={i} className="text-lg font-medium">
                        {t.day} · {t.time}
                      </li>
                    ))}
                  </ul>
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
                {siteConfig.service.practical.map((p) => {
                  const Icon = iconMap[p.label as keyof typeof iconMap] ?? Clock;
                  return (
                    <div key={p.label} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {p.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium">{p.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <iframe
              src={siteConfig.service.mapEmbedUrl}
              title={`Map to ${siteConfig.church.name}`}
              loading="lazy"
              className="h-full min-h-[360px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
