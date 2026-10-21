/* ==========================================================================
   SITE CONFIG: this is the ONLY file you need to edit.
   --------------------------------------------------------------------------
   MEDIA PATHS
   - Put videos in the /videos folder and images in /assets, then write the
     path here, e.g. "videos/skincare-ad.mp4" or "assets/subhan.jpg".
   - Every "video" / "image" field below is optional. Leave it "" to skip.
   - If a file is missing, a clean placeholder is shown instead of a broken box.
   - Tips: use MP4 (H.264), keep reels under ~15 MB, 9:16 for reels, 16:9 for
     wide videos. GitHub rejects files over 100 MB.
   ========================================================================== */
window.SITE = {
  name: "Subhan Zahid",
  role: "Meta Ads Creator & AI Video Generator",
  tagline: "Meta Ads That Convert. AI Videos That Stop the Scroll.",
  location: "Pakistan",
  availability: "Available for new projects",

  email: "zahidsubhan478@gmail.com",
  phoneDisplay: "0323 1254439",
  whatsapp: "923231254439", // country code, no "+" or spaces
  waMessage: "Hi Subhan, I saw your portfolio and I'd like to discuss Meta ads / AI video for my business.",

  links: {
    tiktok: "https://www.tiktok.com/@subhan_zahid1",                     // ← paste your Google Drive portfolio link here
    instagram: "https://www.instagram.com/subhan__zahid/",
    linkedin: "https://www.linkedin.com/in/subhan-zahid-01930737b/?isSelfProfile=true",

  },

  // Contact form: "" = opens the visitor's email app (mailto).
  // Or paste a free Web3Forms access key (web3forms.com) to receive emails directly.
  form: { web3formsKey: "" },

  /* ---------- HERO ---------- */
  hero: {
    video: "hero.mp4",   // vertical 9:16 reel shown beside the headline
    poster: ""                  // optional thumbnail image
  },

  stats: [
    { value: 50, suffix: "+", label: "Ads Launched" },
    { value: 100, suffix: "+", label: "AI Videos Made" },
    { value: 3, suffix: "x", label: "Avg. ROAS" }
  ],

  /* ---------- SELECTED WORK ----------
     category: "Meta Ads" or "AI Videos"
     ratio:    "9/16" (reel) or "16/9" (wide, spans two columns on bigger screens)
     NOTE: titles/results below are placeholders, replace with your real ones. */
  work: [
    { title: "Herthbloom skincare Campaign", category: "Meta Ads", result: "2.8x ROAS in 14 days", video: "meta ads1.mp4", poster: "", ratio: "9/16" },
    { title: "AI UGC Product Ad Commercial", category: "AI Videos", result: "1.2M views in 7 days", video: "ai1.mp4", poster: "", ratio: "9/16" },
    { title: "Fashion Drop: Reels Ad", category: "Meta Ads", result: "41% lower cost per sale", video: "meta ads2.mp4", poster: "", ratio: "9/16" },
    { title: "AI Rodent Repellent Product Ad", category: "AI Videos", result: "Used across 5 platforms", video: "ai2.mp4", poster: "", ratio: "16/9" },
    { title: "tooltrix Ads Campaign", category: "Meta Ads", result: "1M views in 3days", video: "meta ads3.mp4", poster: "", ratio: "9/16" },
    { title: "E-commerce hair curler Ads", category: "Meta Ads", result: "4.1x increase in sales in 20 days", video: "meta ads4.mp4", poster: "", ratio: "9/16" },
    { title: "Canvas Buy 1 Get 1 Free: AI Offer Ad", category: "AI Videos", result: "45% lower cost per purchase", video: "ai4.mp4", poster: "", ratio: "16/9" }
  ],

  /* ---------- ABOUT ---------- */
  about: {
    image: "face.jpg",  // portrait photo (4:5 works best)
    video: ""                    // optional: a short intro video replaces the photo
  },
  skills: [
    "Meta Ads Manager", "Facebook Ads", "Instagram Ads", "AI Video Generation",
    "UGC-style Ads", "Ad Copywriting", "Audience Targeting", "A/B Testing"
  ],

  /* ---------- SERVICES (video/image = optional background for each card) ---------- */
  services: [
    { title: "Meta Ads Campaigns", text: "Full setup, targeting, creatives and optimization on Facebook & Instagram.", video: "videos/service-1.mp4", image: "" },
    { title: "AI Video Ads", text: "Scroll-stopping AI-generated videos for product promos, reels and ads.", video: "videos/service-2.mp4", image: "" },
    { title: "UGC & Reel Creatives", text: "Short-form, hook-driven creatives built for conversions.", video: "videos/service-3.mp4", image: "" },
    { title: "Ad Strategy & Scaling", text: "Audience research, A/B testing and scaling winning campaigns.", video: "videos/service-4.mp4", image: "" }
  ],

  /* ---------- PROCESS ---------- */
  process: [
    { title: "Brief", text: "We talk goals, offer and audience." },
    { title: "Strategy", text: "Angles, hooks and a testing plan." },
    { title: "Creative", text: "Ads and AI videos built to stop the scroll." },
    { title: "Launch", text: "Campaigns go live, tracked end to end." },
    { title: "Optimize", text: "Test, learn, then scale what wins." }
  ]
};
