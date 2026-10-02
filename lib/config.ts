/**
 * Single place for everything the team will want to change without touching
 * components: store links, film URL, legal links and the email endpoint.
 */

export const STORE_LINKS = {
  // TODO: replace "#" with the live store URLs once the listings exist.
  appStore: "#",
  googlePlay: "#",
} as const;

export const LINKS = {
  // TODO: point these at the real pages.
  fullBreakdown: "#",
  bannedItems: "#",
  terms: "#",
  privacy: "#",
} as const;

export const FILM = {
  /**
   * Paste a privacy-friendly embed URL here to switch the placeholder player on,
   * e.g. "https://www.youtube-nocookie.com/embed/VIDEO_ID" or a Vimeo player URL.
   * Leave empty to show the placeholder.
   */
  embedUrl: "",
  /** Optional poster image in /public, e.g. "/film-poster.jpg". */
  poster: "",
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
