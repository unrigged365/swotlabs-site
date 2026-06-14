import { NextResponse } from "next/server";

const INTERESTS = ["consulting", "engineering", "generative", "safety"] as const;
type Interest = (typeof INTERESTS)[number];

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  industry: string;
  interest: Interest;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  const industry = typeof b.industry === "string" ? b.industry.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const interest = b.interest as Interest;

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 10) return { ok: false, error: "Please include a short message." };
  if (!INTERESTS.includes(interest)) return { ok: false, error: "Please select a project interest." };
  if (
    name.length > 100 ||
    email.length > 200 ||
    company.length > 200 ||
    industry.length > 100 ||
    message.length > 5000
  ) {
    return { ok: false, error: "One or more fields are too long." };
  }

  return { ok: true, data: { name, email, company, industry, interest, message } };
}

const INTEREST_LABELS: Record<Interest, string> = {
  consulting: "Strategy & Consulting",
  engineering: "ML Engineering",
  generative: "Generative AI",
  safety: "AI Safety / EU Act",
};

/**
 * Sends the lead via Resend's REST API (no SDK dependency). Returns true on
 * success. If RESEND_API_KEY is unset we skip delivery and let the caller log.
 */
async function sendEmail(data: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.CONTACT_TO_EMAIL ?? "hello@swotlabs.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "SwotLabs Site <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: `New enquiry: ${INTEREST_LABELS[data.interest]} — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || "—"}`,
        `Industry: ${data.industry || "—"}`,
        `Interest: ${INTEREST_LABELS[data.interest]}`,
        "",
        data.message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    const delivered = await sendEmail(result.data);
    if (!delivered) {
      // No provider configured — don't lose the lead silently in dev.
      console.info("[contact] RESEND_API_KEY not set; lead not emailed:", {
        name: result.data.name,
        email: result.data.email,
        interest: result.data.interest,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email us directly." },
      { status: 502 }
    );
  }
}
