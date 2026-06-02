import { siteConfig } from "@/config/site";

export function LifeOfChurch() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Life here
          </p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
            Real people. Real Sundays. Real life together.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            A look at what an ordinary week at {siteConfig.church.name} actually feels like.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {siteConfig.life.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl bg-muted ${
                i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03] ${
                  i === 0 ? "aspect-square sm:aspect-auto" : "aspect-[4/3]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
