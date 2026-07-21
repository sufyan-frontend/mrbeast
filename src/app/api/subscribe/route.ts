import { NextResponse } from "next/server";

/**
 * Newsletter subscribe endpoint.
 *
 * By design this does NOT pretend to sign anyone up. Until you connect a real
 * email provider it returns `not_configured`, and the form shows a neutral
 * setup notice instead of a fake success message.
 *
 * To go live, set NEWSLETTER_ENDPOINT to your provider's subscribe URL
 * (Mailchimp, ConvertKit, Buttondown, Resend Audiences, …) and, if the provider
 * needs one, NEWSLETTER_API_KEY. The email is forwarded as JSON.
 */

/** Pragmatic RFC-5322 subset: one @, no spaces, a dot in the domain. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email: unknown;

  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_request", message: "Could not read that request." },
      { status: 400 },
    );
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { ok: false, code: "invalid_email", message: "Enter a valid email address." },
      { status: 422 },
    );
  }

  const endpoint = process.env.NEWSLETTER_ENDPOINT;

  if (!endpoint) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message:
          "This form isn’t connected to an email provider yet, so nothing was saved.",
      },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEWSLETTER_API_KEY
          ? { Authorization: `Bearer ${process.env.NEWSLETTER_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {
          ok: false,
          code: "upstream_error",
          message: "We couldn’t sign you up just then. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: "You’re on the list." });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "network_error",
        message: "We couldn’t reach the mail service. Please try again.",
      },
      { status: 502 },
    );
  }
}
