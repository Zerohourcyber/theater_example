import { siteConfig } from "@/config/site";

export interface ContactNotificationParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

/**
 * Notification sent to the org inbox. Kept plain and consistently structured
 * so that a season of enquiries stays searchable and sortable in an inbox —
 * which, until the dashboard exists, is where the pipeline actually lives.
 */
export function contactNotificationHtml({
  name,
  email,
  subject,
  message,
}: ContactNotificationParams): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f7f4ee;font-family:Georgia,'Times New Roman',serif;color:#16202b;">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <p style="font-size:12px;color:#5c6873;margin:0 0 20px;font-style:italic;">
        ${escape(siteConfig.name)} — enquiry from the website
      </p>

      <table style="width:100%;font-size:14px;border-collapse:collapse;border-top:2px solid #16202b;">
        <tr>
          <td style="color:#5c6873;padding:10px 12px 10px 0;width:82px;border-bottom:1px solid #dad3c7;">From</td>
          <td style="padding:10px 0;border-bottom:1px solid #dad3c7;">${escape(name)} &lt;${escape(email)}&gt;</td>
        </tr>
        <tr>
          <td style="color:#5c6873;padding:10px 12px 10px 0;border-bottom:1px solid #dad3c7;">Subject</td>
          <td style="padding:10px 0;border-bottom:1px solid #dad3c7;">${escape(subject)}</td>
        </tr>
      </table>

      <p style="font-size:15px;line-height:1.68;white-space:pre-wrap;margin:24px 0 0;">${escape(message)}</p>

      <p style="color:#5c6873;font-size:12px;margin:28px 0 0;border-top:1px solid #dad3c7;padding-top:16px;">
        Reply directly to this email to answer ${escape(name)}.
      </p>
    </div>
  </body>
</html>`;
}
