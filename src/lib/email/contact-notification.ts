import { siteConfig } from "@/config/site";

export interface ContactNotificationParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Notification email sent to the org inbox for contact form submissions. */
export function contactNotificationHtml({
  name,
  email,
  subject,
  message,
}: ContactNotificationParams): string {
  const safe = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0B0E16;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <p style="color:#3B9BFF;letter-spacing:4px;text-transform:uppercase;font-size:12px;margin:0 0 16px;">
        ✦ ${siteConfig.name} — Contact form
      </p>
      <div style="background:#121A2A;border:1px solid #263349;border-radius:8px;padding:24px;">
        <table style="width:100%;font-size:14px;border-collapse:collapse;">
          <tr><td style="color:#8C96AB;padding:4px 0;width:90px;">From</td><td style="color:#F2F6FC;">${safe(name)} &lt;${safe(email)}&gt;</td></tr>
          <tr><td style="color:#8C96AB;padding:4px 0;">Subject</td><td style="color:#F2F6FC;">${safe(subject)}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #263349;margin:16px 0;" />
        <p style="color:#F2F6FC;font-size:15px;line-height:1.7;white-space:pre-wrap;margin:0;">${safe(message)}</p>
      </div>
      <p style="color:#8C96AB;font-size:12px;margin:20px 0 0;">
        Reply directly to this email to answer ${safe(name)}.
      </p>
    </div>
  </body>
</html>`;
}

/** Welcome email for newsletter signups. */
export function newsletterWelcomeHtml(): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0B0E16;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <p style="color:#3B9BFF;letter-spacing:4px;text-transform:uppercase;font-size:12px;font-family:Arial,Helvetica,sans-serif;margin:0 0 16px;">
        ✦ ${siteConfig.name}
      </p>
      <h1 style="color:#F2F6FC;font-size:28px;line-height:1.2;margin:0 0 12px;">
        You&rsquo;re on the list
      </h1>
      <p style="color:#8C96AB;font-size:15px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;margin:0 0 20px;">
        Welcome! You&rsquo;ll hear from us when tickets go on sale, audition
        calls open, and opening nights approach — a few emails a season,
        nothing more.
      </p>
      <p style="color:#8C96AB;font-size:13px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;margin:0;">
        Didn&rsquo;t sign up? Just ignore this email and you won&rsquo;t hear
        from us again.
      </p>
    </div>
  </body>
</html>`;
}
