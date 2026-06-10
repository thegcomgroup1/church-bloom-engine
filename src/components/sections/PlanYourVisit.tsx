import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, Phone, Mail, Clock, Check, Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { submitVisitPlan } from "@/lib/visit-plans.functions";

type Status = "idle" | "submitting" | "done" | "error";

const HOW_HEARD = [
  "Friend or family",
  "Google search",
  "Social media",
  "Drove by",
  "Other",
];

export function PlanYourVisit() {
  const submit = useServerFn(submitVisitPlan);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const fd = new FormData(e.currentTarget);
    const partyRaw = String(fd.get("partySize") ?? "");
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      partySize: partyRaw ? Number(partyRaw) : undefined,
      plannedDate: String(fd.get("plannedDate") ?? ""),
      howHeard: String(fd.get("howHeard") ?? ""),
      note: String(fd.get("note") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    try {
      await submit({ data: payload });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us.",
      );
      setStatus("error");
    }
  }

  return (
    <section id="plan-your-visit" className="bg-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Plan your visit
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
              Let us know you're coming.
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              Tell us a little about you and we'll look out for you on Sunday. No pressure, no
              long forms, no follow-up sales pitch.
            </p>

            <dl className="mt-10 space-y-5">
              <Item icon={Clock} label="Services" value={siteConfig.service.timesShort} />
              <Item icon={MapPin} label="Address" value={siteConfig.service.address} />
              <Item icon={Phone} label="Phone" value={siteConfig.contact.phone} />
              <Item icon={Mail} label="Email" value={siteConfig.contact.email} />
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            {status === "done" ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">We've got you.</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Someone from our welcome team will reach out with a friendly note before Sunday.
                  We're looking forward to meeting you.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                {/* Honeypot — hidden from real users */}
                <div className="hidden" aria-hidden>
                  <label>
                    Website
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <Field id="pv-name" label="Your name" name="name" autoComplete="name" required />
                <Field id="pv-email" label="Email" name="email" type="email" autoComplete="email" required />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="pv-phone"
                    label="Phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    optional
                  />
                  <div>
                    <label htmlFor="pv-party" className="text-sm font-medium">
                      How many in your party? <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <select
                      id="pv-party"
                      name="partySize"
                      defaultValue=""
                      className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select…</option>
                      <option value="1">Just me</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5 or more</option>
                    </select>
                  </div>
                </div>

                <Field
                  id="pv-when"
                  label="Which Sunday?"
                  name="plannedDate"
                  placeholder="This Sunday, next weekend, not sure yet…"
                  optional
                />

                <div>
                  <label htmlFor="pv-heard" className="text-sm font-medium">
                    How did you hear about us? <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <select
                    id="pv-heard"
                    name="howHeard"
                    defaultValue=""
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select…</option>
                    {HOW_HEARD.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pv-note" className="text-sm font-medium">
                    Anything we should know? <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    id="pv-note"
                    name="note"
                    rows={3}
                    placeholder="Questions, prayer request, accessibility needs…"
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {error && (
                  <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "I'm planning to visit"
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  We'll never share your info. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 text-base font-medium">{value}</dd>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  required,
  optional,
  placeholder,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}{" "}
        {optional && <span className="text-muted-foreground">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
