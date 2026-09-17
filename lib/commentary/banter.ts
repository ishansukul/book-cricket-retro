// Authentic Indian Classroom Banter & Teacher Stealth Alerts

export interface BanterQuote {
  category: 'boundary' | 'dot' | 'wicket' | 'stealth_warning' | 'century';
  text: string;
  hindiText: string;
  speaker: string;
}

export const CLASSROOM_BANTER: BanterQuote[] = [
  {
    category: 'boundary',
    text: "Mahi shot! Ball straight out of the class window!",
    hindiText: "अरे भाई! सीधा खिड़की से बाहर छक्का!",
    speaker: "Bunty (Backbencher)"
  },
  {
    category: 'boundary',
    text: "Pure timing! Natraj pencil level sharpness.",
    hindiText: "एकदम टाइमिंग! नटराज पेंसिल की तरह तीखा।",
    speaker: "Rohan (Topper)"
  },
  {
    category: 'dot',
    text: "Dot ball... Sir is turning around, keep the book flat!",
    hindiText: "डॉट बॉल... सर मुड़ रहे हैं, किताब सीधी रख!",
    speaker: "Ankit (Scorer)"
  },
  {
    category: 'wicket',
    text: "OUT! Clean bowled on the last page digit! Pack your bag!",
    hindiText: "आउट! लास्ट डिजिट 0 आ गया! गिल्लियां उड़ गईं!",
    speaker: "Bunty (Backbencher)"
  },
  {
    category: 'stealth_warning',
    text: "CHUP! Sharma Sir has chalk in hand and is looking this way!",
    hindiText: "चुप! शर्मा सर हाथ में चॉक लेके इधर ही देख रहे हैं!",
    speaker: "Class Monitor"
  },
  {
    category: 'century',
    text: "CENTURY! 100 on the scorecard! Treat from canteen confirmed!",
    hindiText: "शतक! 100 रन पूरे! समोसे की पार्टी पक्की!",
    speaker: "Entire Last Row"
  }
];

export function getRandomBanter(category: BanterQuote['category']): BanterQuote {
  const matching = CLASSROOM_BANTER.filter(b => b.category === category);
  return matching[Math.floor(Math.random() * matching.length)] || CLASSROOM_BANTER[0];
}
