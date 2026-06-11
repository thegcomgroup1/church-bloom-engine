import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import { siteConfig } from "@/config/site";

const SearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (search) => SearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Unsubscribe — One Hope Church" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Manage your email preferences for One Hope Church." },
    ],
  }),
  component: UnsubscribePage,
});

type Status =
  | "validating"
  | "ready"
  | "submitting"
  | "success"
  | "already"
  | "invalid"
  | "error";

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [status, setStatus] = useState<Status>("validating");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/email/unsubscribe?token=${encodeURIComponent(token)}`,
          { method: "GET" },
        );
        if (cancelled) return;
        if (!res.ok) {
          setStatus("invalid");
          return;
        }
        const data = (await res.json()) as { valid?: boolean; reason?: string };
        if (data.valid) setStatus("ready");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function confirm() {
    if (!token) return;
    setStatus("submitting");
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const data = (await res.json()) as { success?: boolean; reason?: string };
      if (data.success) setStatus("success");
      else if (data.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-16 flex items-start justify-center">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Email preferences
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          One Hope Church · {siteConfig.church.city}
        </p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground">
          {status === "validating" && <p>Checking your link…</p>}

          {status === "ready" && (
            <>
              <p>
                Click below and we'll stop sending you emails from One Hope.
                You can always come back — just reply to any previous email or
                call us at {siteConfig.contact.phone}.
              </p>
              <button
                onClick={confirm}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Confirm unsubscribe
              </button>
            </>
          )}

          {status === "submitting" && <p>Updating your preferences…</p>}

          {status === "success" && (
            <p>
              You're unsubscribed. We won't send you any more emails from One
              Hope. If this was a mistake, just reply to a previous email or
              call us — we'll get you back on the list.
            </p>
          )}

          {status === "already" && (
            <p>
              You're already unsubscribed. Nothing else to do here. If you'd
              like to start hearing from us again, reply to a previous email
              or give us a call.
            </p>
          )}

          {status === "invalid" && (
            <p>
              This unsubscribe link isn't valid or has expired. If you want to
              stop receiving emails, reply to any previous email from us and
              we'll handle it directly.
            </p>
          )}

          {status === "error" && (
            <p>
              Something went wrong on our end. Please try again in a moment,
              or reply to a previous email so we can help.
            </p>
          )}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Need help?{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="underline underline-offset-2"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </main>
  );
}
