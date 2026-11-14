"use server";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Adds an email to the waitlist.
 * - Saves to Supabase (table `waitlist`, see supabase/schema.sql) through its REST API.
 * - Sends a confirmation email through Resend.
 * If the env vars are missing, it runs in demo mode so the page still works locally.
 */
export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Honeypot: real people never fill this hidden field.
  if (formData.get("company")) {
    return { status: "success", message: "You're on the list." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  // New Supabase projects give a "publishable" key (sb_publishable_…); older ones an anon JWT.
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.info(`[waitlist] demo mode, would save: ${email}`);
    return { status: "success", message: "You're on the list. Watch your inbox." };
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        // Only legacy anon keys are JWTs; publishable keys go in `apikey` alone.
        ...(supabaseKey.startsWith("eyJ") ? { Authorization: `Bearer ${supabaseKey}` } : {}),
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    if (res.status === 409) {
      return { status: "success", message: "You're already on the list. We'll be in touch." };
    }
    if (!res.ok) {
      console.error("[waitlist] supabase error", res.status, await res.text());
      return { status: "error", message: "Something went wrong. Please try again." };
    }
  } catch (err) {
    console.error("[waitlist] supabase request failed", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  await sendConfirmation(email);
  return { status: "success", message: "You're on the list. Watch your inbox." };
}

async function sendConfirmation(email: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  // Resend's free tier can send from onboarding@resend.dev until you verify a domain.
  const from = process.env.RESEND_FROM ?? "Ondra <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: email,
        subject: "You're on the Ondra waitlist",
        html: `<div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:auto;padding:32px;color:#1f1b16">
  <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;margin:0 0 16px">You're in.</h1>
  <p style="line-height:1.6;color:#5c554c">Thanks for joining the Ondra private beta. We're letting teams in every week, and we'll email you the moment your spot opens.</p>
  <p style="line-height:1.6;color:#5c554c">Until then, every meeting is still yours to remember.</p>
  <p style="margin-top:32px;color:#9a9186;font-size:13px">The Ondra team</p>
</div>`,
      }),
      cache: "no-store",
    });
    if (!res.ok) console.error("[waitlist] resend error", res.status, await res.text());
  } catch (err) {
    console.error("[waitlist] resend request failed", err);
  }
}
