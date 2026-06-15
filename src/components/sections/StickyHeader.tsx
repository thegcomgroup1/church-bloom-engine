import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { PlanYourVisitButton } from "@/components/PlanYourVisitButton";
import { siteConfig } from "@/config/site";

const nav = [
  { label: "Home", to: "/" as const },
  { label: "Plan a Visit", to: "/plan-a-visit" as const },
  { label: "About", to: "/about" as const },
  { label: "Leadership", to: "/leadership" as const },
  { label: "Sermons", to: "/sermons" as const },
  { label: "Give", to: "/give" as const },
  { label: "Contact", to: "/contact" as const },
];

export function StickyHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-foreground/95 backdrop-blur supports-[backdrop-filter]:bg-foreground/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={siteConfig.brand.logoImageSrc}
            alt={siteConfig.church.name}
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-white" }}
              inactiveProps={{ className: "text-white/90 hover:text-white" }}
              className="text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <PlanYourVisitButton className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-foreground/95 lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-white/10 text-white" }}
                inactiveProps={{ className: "text-white/90 hover:bg-white/10" }}
                className="rounded-md px-3 py-3 text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
