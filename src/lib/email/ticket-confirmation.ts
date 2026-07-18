import { siteConfig } from "@/config/site";

export interface TicketConfirmationParams {
  buyerName?: string | null;
  productionTitle: string;
  venue?: string;
  openingInfo?: string;
  quantity: number;
  amountTotalCents: number;
  orderReference: string;
}

const brand = "#3B9BFF";
const bg = "#0B0E16";
const surface = "#121A2A";
const fgColor = "#F2F6FC";
const mutedColor = "#8C96AB";

/** Simple, on-brand HTML confirmation email for ticket purchases. */
export function ticketConfirmationHtml({
  buyerName,
  productionTitle,
  venue,
  openingInfo,
  quantity,
  amountTotalCents,
  orderReference,
}: TicketConfirmationParams): string {
  const total = (amountTotalCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${bg};font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <p style="color:${brand};letter-spacing:4px;text-transform:uppercase;font-size:12px;font-family:Arial,Helvetica,sans-serif;margin:0 0 16px;">
        ✦ ${siteConfig.name}
      </p>
      <h1 style="color:${fgColor};font-size:28px;line-height:1.2;margin:0 0 8px;">
        You&rsquo;re going to the show${buyerName ? `, ${buyerName}` : ""}!
      </h1>
      <p style="color:${mutedColor};font-size:15px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;margin:0 0 28px;">
        Your general-admission tickets are confirmed. Show this email at the door.
      </p>
      <div style="background:${surface};border:1px solid ${brand};border-radius:8px;padding:24px;">
        <h2 style="color:${brand};font-size:22px;margin:0 0 12px;">${productionTitle}</h2>
        <table style="width:100%;font-family:Arial,Helvetica,sans-serif;font-size:14px;border-collapse:collapse;">
          ${venue ? `<tr><td style="color:${mutedColor};padding:4px 0;">Venue</td><td style="color:${fgColor};text-align:right;">${venue}</td></tr>` : ""}
          ${openingInfo ? `<tr><td style="color:${mutedColor};padding:4px 0;">Date</td><td style="color:${fgColor};text-align:right;">${openingInfo}</td></tr>` : ""}
          <tr><td style="color:${mutedColor};padding:4px 0;">Tickets</td><td style="color:${fgColor};text-align:right;">${quantity} × general admission</td></tr>
          <tr><td style="color:${mutedColor};padding:4px 0;">Total</td><td style="color:${fgColor};text-align:right;">${total}</td></tr>
          <tr><td style="color:${mutedColor};padding:4px 0;">Order ref</td><td style="color:${fgColor};text-align:right;font-family:monospace;">${orderReference}</td></tr>
        </table>
      </div>
      <p style="color:${mutedColor};font-size:13px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;margin:28px 0 0;">
        Open seating — doors open 30 minutes before curtain.
        Questions? Reply to this email or write to ${siteConfig.contactEmail}.
      </p>
    </div>
  </body>
</html>`;
}
