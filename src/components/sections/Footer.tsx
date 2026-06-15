import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

const sitemap = [
  { label: "Home", to: "/" as const },
  { label: "Plan a Visit", to: "/plan-a-visit" as const },
  { label: "About", to: "/about" as const },
  { label: "Leadership", to: "/leadership" as const },
  { label: "Sermons", to: "/sermons" as const },
  { label: "Give", to: "/give" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img
              src={siteConfig.brand.logoImageSrc}
              alt={siteConfig.church.name}
              className="mb-3 h-12 w-auto"
            />
            <p className="font-display text-xl font-semibold text-secondary">
              {siteConfig.church.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{siteConfig.service.address}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {siteConfig.contact.phone} · {siteConfig.contact.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Explore
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-y-2">
              {sitemap.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-sm font-medium text-foreground hover:text-primary"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Follow along
            </p>
            <nav aria-label="Social" className="mt-3 flex flex-col gap-2">
              {siteConfig.contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className="text-sm font-medium text-foreground hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {year} {siteConfig.church.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
