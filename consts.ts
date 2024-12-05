import { PLANS } from "./config/stripe";

export const MAX_FREE_COUNTS = 100;
export const MAX_PRO_COUNTS = 10000;

export const pricingItems = [
  {
    plan: "Free",
    tagline: "For individuals who want to try out the most advanced AI audio",
    credits: PLANS.find((p) => p.slug === "free")!.credits,
    features: [
      {
        text: "10 minutes of ultra-high quality text to speech per month",
        footnote: "High-quality audios made with the best AI tool.",
      },
      {
        text: "Create custom, synthetic voices.",
      },
      {
        text: "API access.",
      },
      {
        text: "Mobile-friendly interface.",
      },
      {
        text: "Clone your voice with as little as 1 minute of audio",
        negative: true,
      },
      {
        text: "Access to the Dubbing Studio for more control over translation & timing",
        negative: true,
      },
    ],
  },
  {
    plan: "Pro",
    tagline: "For creators making premium content for global audiences",
    credits: PLANS.find((p) => p.slug === "pro")!.credits,
    features: [
      {
        text: "30 minutes of ultra-high quality text to speech per month",
        footnote: "High-quality audios made with the best AI tool.",
      },
      {
        text: "Create custom, synthetic voices.",
      },
      {
        text: "Access to the Dubbing Studio for more control over translation & timing",
      },
      {
        text: "Mobile-friendly interface.",
      },
      {
        text: "License to use ElevenLabs for commercial use",
      },
    ],
  },
];

export const REVIEWS = [
  {
      name: "Michael Smith",
      username: "@michaelsmith",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
      review: "SevenLabz is revolutionary! The AI-powered text-to-audio feature has transformed how I consume content. It's a must-try for anyone!"
  },
  {
      name: "Emily Johnson",
      username: "@emilyjohnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 4,
      review: "Fantastic tool for converting text to audio. SevenLabz made it easy for me to listen to articles on the go. Highly recommend!"
  },
  {
      name: "Daniel Williams",
      username: "@danielwilliams",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      review: "I've been using SevenLabz for a while now. The audio quality is exceptional, and the AI voice is incredibly natural!"
  },
  {
      name: "Sophia Brown",
      username: "@sophiabrown",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4,
      review: "SevenLabz is amazing! It allows me to multitask while listening to my favorite articles. A game-changer for productivity."
  },
  {
      name: "James Taylor",
      username: "@jamestaylor",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
      review: "Absolutely love SevenLabz! The AI-generated audio is intuitive and powerful. It has changed how I engage with written content."
  },
  {
      name: "Olivia Martinez",
      username: "@oliviamartinez",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4,
      review: "SevenLabz has great potential. It has helped me consume more information efficiently. Excited for future updates!"
  },
  {
      name: "William Garcia",
      username: "@williamgarcia",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5,
      review: "SevenLabz is a game-changer for audio content. It's easy to use and incredibly effective. Highly recommended for anyone!"
  },
  {
      name: "Mia Rodriguez",
      username: "@miarodriguez",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 4,
      review: "I've tried several text-to-audio tools, but SevenLabz stands out. It's simple, effective, and really enhances my learning."
  },
  {
      name: "Henry Lee",
      username: "@henrylee",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 5,
      review: "SevenLabz has transformed my daily routine. Listening to articles is now a breeze. I can't imagine my day without it."
  },
] as const;
