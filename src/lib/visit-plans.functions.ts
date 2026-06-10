import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const VisitPlanInput = z.object({
  name: z.string().trim().min(1, "Please share your name").max(120),
  email: z.string().trim().email("Please use a valid email").max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  partySize: z.number().int().min(1).max(50).optional(),
  plannedDate: z.string().trim().max(120).optional().or(z.literal("")),
  howHeard: z.string().trim().max(120).optional().or(z.literal("")),
  note: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot: real users leave this blank
  website: z.string().max(0).optional().or(z.literal("")),
});

export const submitVisitPlan = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => VisitPlanInput.parse(data))
  .handler(async ({ data }) => {
    // Spam trap
    if (data.website && data.website.length > 0) {
      return { ok: true as const, id: null };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      party_size: data.partySize ?? null,
      planned_date: data.plannedDate || null,
      how_heard: data.howHeard || null,
      note: data.note || null,
    };

    const { data: row, error } = await supabaseAdmin
      .from("visit_plans")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error("[visit_plans] insert failed", error);
      throw new Error("We couldn't save your request. Please try again or call us.");
    }

    return { ok: true as const, id: row.id };
  });
