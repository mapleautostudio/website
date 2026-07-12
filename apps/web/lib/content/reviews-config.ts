// Shared constants for the live Google-reviews feature.

// The shop's Maps listing (clean CID form — opens the listing, where the
// "Write a review" button lives). If the owner later shares a Google Business
// Profile short review link (g.page/r/…/review), swap it in here.
export const REVIEWS_LISTING_URL =
  "https://www.google.com/maps?cid=13256745992546422008";

// Honesty thresholds — below these, showing cards or an average would misrepresent
// a brand-new shop, so the section degrades to an "early days" invite instead.
export const MIN_TEXT_FOR_CARDS = 3; // need this many text reviews to show the card grid
export const MIN_TOTAL_FOR_RATING = 5; // need this many total to show an average rating
