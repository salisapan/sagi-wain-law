// Notifies Adv. Sagi Wain by email when a new row lands in public.sagi_wain_leads.
// Triggered by a Supabase Database Webhook (table: sagi_wain_leads, event: INSERT).
// Requires the RESEND_API_KEY and LEAD_NOTIFY_EMAIL secrets (see README.md in this folder).

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const WEBHOOK_SECRET = Deno.env.get("LEADS_WEBHOOK_SECRET"); // optional, recommended
const NOTIFY_EMAIL = Deno.env.get("LEAD_NOTIFY_EMAIL"); // Sagi's real inbox

// TODO: replace with a Resend-verified sending address once a domain is added.
const FROM_ADDRESS = "אתר שגיא ויין <leads@yourdomain.com>";

const INTEREST_LABELS: Record<string, string> = {
  contracts: "בדיקת חוזים וליווי עסקאות",
  rental: "דיני שכירות",
  inheritance: "ירושה וצוואות",
  investors: "ליווי משקיעים",
  other: "אחר",
};

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (WEBHOOK_SECRET) {
    const provided = req.headers.get("x-webhook-secret");
    if (provided !== WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.error("RESEND_API_KEY or LEAD_NOTIFY_EMAIL is not set");
    return new Response("Server not configured", { status: 500 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const record = payload?.record;
  const name: string | undefined = record?.name;
  const phone: string | undefined = record?.phone;

  if (!name || !phone) {
    return new Response("Missing required fields in payload", { status: 400 });
  }

  const email: string = record?.email ?? "לא סופק";
  const interest: string = INTEREST_LABELS[record?.interest] ?? record?.interest ?? "לא צוין";
  const message: string = record?.message ?? "—";

  const text = [
    "התקבלה פנייה חדשה מהאתר:",
    "",
    `שם: ${name}`,
    `טלפון: ${phone}`,
    `אימייל: ${email}`,
    `תחום עניין: ${interest}`,
    `הודעה: ${message}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [NOTIFY_EMAIL],
        subject: `פנייה חדשה מהאתר — ${name}`,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend API error:", res.status, body);
      return new Response("Failed to send email", { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error sending lead notification:", err);
    return new Response("Internal error", { status: 500 });
  }
});
