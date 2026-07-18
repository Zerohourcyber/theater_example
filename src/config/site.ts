/**
 * Central site configuration. The org name lives here as a single constant
 * (per SPEC §1) so it can be rebranded in one place.
 */

export const siteConfig = {
  /** Placeholder org name — change here to rebrand the whole site. */
  name: "Limelight Youth Theater",
  shortName: "Limelight",
  tagline: "Youth-led. Community-built. Stage-ready.",
  description:
    "A youth-led community theater where high schoolers and recent grads perform, direct, produce, and design — staging bold productions in partnership with a local college theater.",
  /** Public base URL; overridden by NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "hello@limelightyouththeater.org",
  collegePartner: "Riverside College",
  socials: [
    { label: "Instagram", href: "https://instagram.com", handle: "@limelightyouth" },
    { label: "TikTok", href: "https://tiktok.com", handle: "@limelightyouth" },
    { label: "YouTube", href: "https://youtube.com", handle: "Limelight Youth Theater" },
  ],
} as const;

/** Primary navigation links used by the Navbar and Footer. */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Productions", href: "/productions" },
  { label: "About", href: "/about" },
  { label: "Auditions", href: "/auditions" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

/** Secondary/legal links shown in the footer. */
export const footerLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export type SiteConfig = typeof siteConfig;
