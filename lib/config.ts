/**
 * Single place for everything the team will want to change without touching
 * components: store links, film URL, legal links and the email endpoint.
 */

export const STORE_LINKS = {
  appStore: "https://apps.apple.com/gb/app/revaliyo/id6762087168",
  googlePlay: "https://play.google.com/store/apps/details?id=com.baryonminds.revaliyo&pcampaignid=web_share",
} as const;

export const LINKS = {
  // TODO: still to be provided.
  bannedItems: "#",
  terms: "https://www.baryonminds.com/products/revaliyo/terms",
  privacy: "https://www.baryonminds.com/products/revaliyo/privacy",
} as const;

export const FILM = {
  /**
   * Paste a privacy-friendly embed URL here to switch the placeholder player on,
   * e.g. "https://www.youtube-nocookie.com/embed/VIDEO_ID" or a Vimeo player URL.
   * Leave empty to show the placeholder.
   */
  embedUrl: "",
  /** Optional poster image in /public, e.g. "/film-poster.jpg". */
  poster: "/images/film-poster.jpg",
} as const;

export const SUBSCRIBE = {
  /**
   * Endpoint that receives `POST { email }` as JSON (Formspree, Mailchimp proxy,
   * your own route, etc). Set NEXT_PUBLIC_SUBSCRIBE_ENDPOINT in .env.local.
   * When empty the form validates and shows success, but stores nothing.
   */
  endpoint: process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT ?? "",
} as const;

export const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Milton Keynes", href: "#milton-keynes" },
  { label: "FAQ", href: "#faq" },
] as const;
