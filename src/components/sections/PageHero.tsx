import type { ReactNode } from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  /** Tailwind padding overrides for shorter heroes */
  padding?: string;
};

/**
 * Shared interior-page hero. Mirrors the homepage Hero pattern:
 * full-bleed photo background + dark gradient overlay + white text.
 */
export function PageHero({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  intro,
  children,
  padding = "py-24 md:py-32",
}: Props) {
  return (
    <section className={`relative isolate overflow-hidden ${padding}`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/80">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 md:text-lg">{intro}</p>
        )}
        {children && <div className="mt-8 flex justify-center">{children}</div>}
      </div>
    </section>
  );
}
