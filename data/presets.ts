import { Slide } from '../types';

interface PresetData {
  en: Slide[];
  bn: Slide[];
}

export interface PresetMeta {
  id: string;
  en: string;
  bn: string;
  coverUrl: string;
}

export const PRESET_LIST: PresetMeta[] = [
  { 
    id: "washing-hands", 
    en: "Washing Hands Properly", 
    bn: "সঠিকভাবে হাত ধোয়া",
    coverUrl: "/covers/washing-hands.png"
  },
  { 
    id: "road-safety", 
    en: "Crossing the Road Safely", 
    bn: "নিরাপদে রাস্তা পারাপার",
    coverUrl: "/covers/road-safety.png"
  },
  { 
    id: "school-clean", 
    en: "Keeping Our School Clean", 
    bn: "বিদ্যালয় পরিষ্কার রাখা",
    coverUrl: "/covers/school-clean.png"
  },
  { 
    id: "respect-elders", 
    en: "Respecting Elders", 
    bn: "বড়দের সম্মান করা",
    coverUrl: "/covers/respect-elders.png"
  },
  { 
    id: "wasting-water", 
    en: "Not Wasting Water", 
    bn: "পানি অপচয় রোধ",
    coverUrl: "/covers/wasting-water.png"
  },
  { 
    id: "standing-line", 
    en: "Standing in Line", 
    bn: "লাইনে ধরে দাঁড়ানো",
    coverUrl: "/covers/standing-line.png"
  },
];

// Note: mediaUrl is removed. The App will generate it using getOrGenerateSlideImage(id, prompt)
// id format will be: `preset-${lessonId}-slide-${index}`

export const PRESET_LESSONS: Record<string, PresetData> = {
  'washing-hands': {
    en: [
      {
        title: "Germs are Everywhere!",
        explanation: "Our hands touch many things every day like doorknobs and toys. Germs live on these things and can make us sick.",
        visualPrompt: "Close-up cartoon illustration of a child's hands covered in cute, colorful little germ monsters.",
        mediaType: 'image'
      },
      {
        title: "Use Soap and Water",
        explanation: "Water alone is not enough! We need soap to fight the germs. Make sure to get a good lather going.",
        visualPrompt: "A bar of soap creating lots of shiny bubbles with a rubber ducky nearby.",
        mediaType: 'image'
      },
      {
        title: "Scrub for 20 Seconds",
        explanation: "Scrub between your fingers. Sing 'Happy Birthday' twice while you wash to know the time is right!",
        visualPrompt: "A happy child washing hands at a sink, scrubbing for 20 seconds.",
        mediaType: 'image'
      },
      {
        title: "Rinse Well",
        explanation: "Wash away all the soap bubbles and the germs with clean running water.",
        visualPrompt: "Clean, sparkling water rinsing suds off hands into a sink.",
        mediaType: 'image'
      },
      {
        title: "Dry Your Hands",
        explanation: "Use a clean towel or air dry your hands. Now your hands are sparkling clean!",
        visualPrompt: "Two hands held up high, sparkling clean, drying with a towel.",
        mediaType: 'image'
      }
    ],
    bn: [
      {
        title: "জীবাণু সব জায়গায়!",
        explanation: "আমাদের হাত প্রতিদিন অনেক কিছু স্পর্শ করে। জীবাণু এখানে থাকে এবং আমাদের অসুস্থ করতে পারে।",
        visualPrompt: "Close-up cartoon illustration of a child's hands covered in cute, colorful little germ monsters.",
        mediaType: 'image'
      },
      {
        title: "সাবান এবং পানি ব্যবহার করো",
        explanation: "শুধু পানি যথেষ্ট নয়! জীবাণুর সাথে লড়াই করতে আমাদের সাবান দরকার। ভালো করে ফেনা তৈরি করো।",
        visualPrompt: "A bar of soap creating lots of shiny bubbles with a rubber ducky nearby.",
        mediaType: 'image'
      },
      {
        title: "২০ সেকেন্ড ধরে ঘষো",
        explanation: "আঙ্গুলের মাঝে ভালো করে ঘষো। সময় ঠিক রাখতে হাত ধোয়ার সময় দুবার 'হ্যাপি বার্থডে' গান গাও!",
        visualPrompt: "A happy child washing hands at a sink, scrubbing for 20 seconds.",
        mediaType: 'image'
      },
      {
        title: "ভালো করে ধুয়ে ফেলো",
        explanation: "পরিষ্কার পানি দিয়ে সমস্ত সাবান এবং জীবাণু ধুয়ে ফেলো।",
        visualPrompt: "Clean, sparkling water rinsing suds off hands into a sink.",
        mediaType: 'image'
      },
      {
        title: "হাত শুকিয়ে নাও",
        explanation: "তোয়ালে বা বাতাসে হাত শুকিয়ে নাও। এখন তোমার হাত ঝকঝকে পরিষ্কার!",
        visualPrompt: "Two hands held up high, sparkling clean, drying with a towel.",
        mediaType: 'image'
      }
    ]
  },
  'road-safety': {
    en: [
      {
        title: "Stop at the Curb",
        explanation: "Never run into the street. Always stop at the edge of the sidewalk and wait.",
        visualPrompt: "A child stopping safely at the edge of a sidewalk curb. City street background.",
        mediaType: 'image'
      },
      {
        title: "Look Left and Right",
        explanation: "Turn your head to look both ways. Look for cars coming your way.",
        visualPrompt: "A cartoon child looking left and right with exaggerated eye movement lines, checking for cars.",
        mediaType: 'image'
      },
      {
        title: "Listen Carefully",
        explanation: "Sometimes you can hear a car before you see it. Take headphones off and listen.",
        visualPrompt: "A child cupping their hand to their ear to listen for traffic.",
        mediaType: 'image'
      },
      {
        title: "Use the Zebra Crossing",
        explanation: "Cross where there are white stripes on the road. It helps drivers see you.",
        visualPrompt: "A happy child walking across a black and white zebra crossing.",
        mediaType: 'image'
      },
      {
        title: "Hold an Adult's Hand",
        explanation: "If you are small, always hold an adult's hand while crossing. Together is safer!",
        visualPrompt: "A small child holding the hand of a taller parent walking.",
        mediaType: 'image'
      }
    ],
    bn: [
      {
        title: "রাস্তার কিনারে থামো",
        explanation: "দৌড়ে রাস্তায় নামবে না। সর্বদা ফুটপাতের কিনারে থামো এবং অপেক্ষা করো।",
        visualPrompt: "A child stopping safely at the edge of a sidewalk curb. City street background.",
        mediaType: 'image'
      },
      {
        title: "ডানে এবং বামে তাকাও",
        explanation: "উভয় দিকে তাকাও। দেখো কোনো গাড়ি আসছে কিনা।",
        visualPrompt: "A cartoon child looking left and right with exaggerated eye movement lines, checking for cars.",
        mediaType: 'image'
      },
      {
        title: "মনোযোগ দিয়ে শোনো",
        explanation: "গাড়ির শব্দ শোনার চেষ্টা করো। কানে হেডফোন থাকলে খুলে ফেলো।",
        visualPrompt: "A child cupping their hand to their ear to listen for traffic.",
        mediaType: 'image'
      },
      {
        title: "জেব্রা ক্রসিং ব্যবহার করো",
        explanation: "রাস্তার সাদা দাগ বা জেব্রা ক্রসিং দিয়ে পার হও। এটি চালকদের তোমাকে দেখতে সাহায্য করে।",
        visualPrompt: "A happy child walking across a black and white zebra crossing.",
        mediaType: 'image'
      },
      {
        title: "বড়দের হাত ধরো",
        explanation: "রাস্তা পার হওয়ার সময় সবসময় বড়দের হাত ধরো। একসাথে পার হওয়া নিরাপদ!",
        visualPrompt: "A small child holding the hand of a taller parent walking.",
        mediaType: 'image'
      }
    ]
  },
  'school-clean': {
    en: [
      {
        title: "Pick Up Trash",
        explanation: "If you see paper or plastic on the floor, pick it up.",
        visualPrompt: "A helpful student bending down to pick up a crumpled piece of paper.",
        mediaType: 'image'
      },
      {
        title: "Use the Dustbin",
        explanation: "Always throw your wrappers in the bin, never on the ground.",
        visualPrompt: "A student throwing trash into a colorful recycling bin.",
        mediaType: 'image'
      },
      {
        title: "Keep Desks Tidy",
        explanation: "Arrange your books and pencils neatly. Don't draw on the desks.",
        visualPrompt: "A neat and tidy school desk with books stacked perfectly.",
        mediaType: 'image'
      },
      {
        title: "Don't Spill Food",
        explanation: "Eat carefully. If you spill something, clean it up or ask for help.",
        visualPrompt: "A child eating lunch carefully at a table, no mess.",
        mediaType: 'image'
      },
      {
        title: "Work Together",
        explanation: "Cleaning is easier when we help each other. Let's keep our class beautiful!",
        visualPrompt: "A group of diverse children happily cleaning a classroom together.",
        mediaType: 'image'
      }
    ],
    bn: [
      {
        title: "ময়লা কুড়াও",
        explanation: "মেঝেতে কাগজ বা প্লাস্টিক দেখলে তা তুলে ফেলো।",
        visualPrompt: "A helpful student bending down to pick up a crumpled piece of paper.",
        mediaType: 'image'
      },
      {
        title: "ডাস্টবিন ব্যবহার করো",
        explanation: "সবসময় ময়লা নির্দিষ্ট ঝুড়িতে ফেলবে, কখনও মাটিতে ফেলবে না।",
        visualPrompt: "A student throwing trash into a colorful recycling bin.",
        mediaType: 'image'
      },
      {
        title: "ডেস্ক গুছিয়ে রাখো",
        explanation: "বই এবং পেন্সিল সাজিয়ে রাখো। ডেস্কের ওপর আঁকাআঁকি করবে না।",
        visualPrompt: "A neat and tidy school desk with books stacked perfectly.",
        mediaType: 'image'
      },
      {
        title: "খাবার ফেলবে না",
        explanation: "সাবধানে খাবে। যদি কিছু পড়ে যায়, তবে তা পরিষ্কার করো।",
        visualPrompt: "A child eating lunch carefully at a table, no mess.",
        mediaType: 'image'
      },
      {
        title: "সবাই মিলে কাজ করো",
        explanation: "সবাই মিলে কাজ করলে পরিষ্কার করা সহজ হয়। এসো, আমাদের শ্রেণীকক্ষ সুন্দর রাখি!",
        visualPrompt: "A group of diverse children happily cleaning a classroom together.",
        mediaType: 'image'
      }
    ]
  },
  'respect-elders': {
    en: [
      {
        title: "Say Salam or Hello",
        explanation: "Always greet elders when you see them to show respect.",
        visualPrompt: "A young child waving and smiling respectfully at an elderly person.",
        mediaType: 'image'
      },
      {
        title: "Listen When They Speak",
        explanation: "Look at them and listen carefully. Don't interrupt.",
        visualPrompt: "A child sitting attentively and listening to a grandmother telling a story.",
        mediaType: 'image'
      },
      {
        title: "Offer Your Seat",
        explanation: "If an elder is standing on a bus, give them your seat.",
        visualPrompt: "Inside a bus, a child standing up to offer their seat to an older person.",
        mediaType: 'image'
      },
      {
        title: "Help Them",
        explanation: "Offer to carry heavy bags or help them walk if they need it.",
        visualPrompt: "A child helping an older person carry a grocery bag.",
        mediaType: 'image'
      },
      {
        title: "Speak Softly",
        explanation: "Use respectful words and a gentle tone.",
        visualPrompt: "A child speaking gently, soft colors, flowers, kindness.",
        mediaType: 'image'
      }
    ],
    bn: [
      {
        title: "সালাম বা হ্যালো বলো",
        explanation: "বড়দের দেখলে সম্মান জানাতে সবসময় সালাম দাও বা কুশল বিনিময় করো।",
        visualPrompt: "A young child waving and smiling respectfully at an elderly person.",
        mediaType: 'image'
      },
      {
        title: "তারা যখন কথা বলে তখন শোনো",
        explanation: "মনোযোগ দিয়ে শোনো। মাঝখানে কথা বলবে না।",
        visualPrompt: "A child sitting attentively and listening to a grandmother telling a story.",
        mediaType: 'image'
      },
      {
        title: "আসন ছেড়ে দাও",
        explanation: "বাসে কোনো বয়স্ক ব্যক্তি দাঁড়িয়ে থাকলে তাদের বসতে দাও।",
        visualPrompt: "Inside a bus, a child standing up to offer their seat to an older person.",
        mediaType: 'image'
      },
      {
        title: "তাদের সাহায্য করো",
        explanation: "তাদের ভারী ব্যাগ বহন করতে বা হাঁটতে সাহায্য করার প্রস্তাব দাও।",
        visualPrompt: "A child helping an older person carry a grocery bag.",
        mediaType: 'image'
      },
      {
        title: "নম্রভাবে কথা বলো",
        explanation: "শ্রদ্ধাশীল শব্দ এবং শান্ত স্বরে কথা বলো।",
        visualPrompt: "A child speaking gently, soft colors, flowers, kindness.",
        mediaType: 'image'
      }
    ]
  },
  'wasting-water': {
    en: [
      {
        title: "Turn Off the Tap",
        explanation: "Don't let water run while brushing. Turn it on only to rinse.",
        visualPrompt: "A bathroom sink with the tap turned OFF.",
        mediaType: 'image'
      },
      {
        title: "Use a Bucket",
        explanation: "Use a bucket to wash things instead of a hose pipe.",
        visualPrompt: "A colorful bucket filled with water in a garden.",
        mediaType: 'image'
      },
      {
        title: "Fix Leaky Taps",
        explanation: "If a tap is dripping, close it tight or tell an adult.",
        visualPrompt: "A cartoon wrench fixing a dripping tap.",
        mediaType: 'image'
      },
      {
        title: "Take Shorter Showers",
        explanation: "Get clean quickly. Playing in the shower wastes water.",
        visualPrompt: "A shower head spraying water, timer clock next to it.",
        mediaType: 'image'
      },
      {
        title: "Water is Life",
        explanation: "Many people don't have clean water. Save it for everyone.",
        visualPrompt: "A beautiful blue water drop holding a globe/earth inside it.",
        mediaType: 'image'
      }
    ],
    bn: [
      {
        title: "কল বন্ধ রাখো",
        explanation: "ব্রাশ করার সময় পানি ছেড়ে রাখবে না। শুধু ধোয়ার সময় কল ছাড়ো।",
        visualPrompt: "A bathroom sink with the tap turned OFF.",
        mediaType: 'image'
      },
      {
        title: "বালতি ব্যবহার করো",
        explanation: "পাইপের বদলে বালতি ব্যবহার করে কাজ করো।",
        visualPrompt: "A colorful bucket filled with water in a garden.",
        mediaType: 'image'
      },
      {
        title: "কল মেরামত করো",
        explanation: "কল থেকে পানি পড়লে তা শক্ত করে বন্ধ করো বা বড়দের বলো।",
        visualPrompt: "A cartoon wrench fixing a dripping tap.",
        mediaType: 'image'
      },
      {
        title: "দ্রুত গোসল করো",
        explanation: "তাড়াতাড়ি গোসল সেরে নাও। পানি অপচয় করবে না।",
        visualPrompt: "A shower head spraying water, timer clock next to it.",
        mediaType: 'image'
      },
      {
        title: "পানিই জীবন",
        explanation: "অনেকের কাছে পরিষ্কার পানি নেই। সবার জন্য পানি বাঁচাও।",
        visualPrompt: "A beautiful blue water drop holding a globe/earth inside it.",
        mediaType: 'image'
      }
    ]
  },
  'standing-line': {
    en: [
      {
        title: "Find the End",
        explanation: "Stand at the back of the line. Never cut in front.",
        visualPrompt: "A line of cute animal characters standing in a queue.",
        mediaType: 'image'
      },
      {
        title: "Keep Distance",
        explanation: "Stand a little bit away from the person in front of you.",
        visualPrompt: "Characters in line with little arrows showing safe space between them.",
        mediaType: 'image'
      },
      {
        title: "Wait Patiently",
        explanation: "Waiting is fair. Chat quietly or think about something fun.",
        visualPrompt: "A child standing in line waiting patiently.",
        mediaType: 'image'
      },
      {
        title: "No Pushing",
        explanation: "Keep hands to yourself. Pushing is rude.",
        visualPrompt: "A 'No Pushing' sign, cute cartoon style.",
        mediaType: 'image'
      },
      {
        title: "Order Makes Us Happy",
        explanation: "When we stand in line, everyone gets served fairly.",
        visualPrompt: "Everyone at the front of the line getting their turn and looking super happy.",
        mediaType: 'image'
      }
    ],
    bn: [
      {
        title: "লাইনের শেষে দাঁড়াও",
        explanation: "লাইনের শেষে দাঁড়াও। কখনও মাঝখানে ঢুকবে না।",
        visualPrompt: "A line of cute animal characters standing in a queue.",
        mediaType: 'image'
      },
      {
        title: "দূরত্ব বজায় রাখো",
        explanation: "সামনের ব্যক্তি থেকে একটু দূরে দাঁড়াও।",
        visualPrompt: "Characters in line with little arrows showing safe space between them.",
        mediaType: 'image'
      },
      {
        title: "ধৈর্য ধরো",
        explanation: "শান্তভাবে অপেক্ষা করো।",
        visualPrompt: "A child standing in line waiting patiently.",
        mediaType: 'image'
      },
      {
        title: "ধাক্কাধাক্কি করবে না",
        explanation: "কাউকে স্পর্শ করবে না। ধাক্কাধাক্কি করা ঠিক নয়।",
        visualPrompt: "A 'No Pushing' sign, cute cartoon style.",
        mediaType: 'image'
      },
      {
        title: "শৃঙ্খলায় শান্তি",
        explanation: "লাইনে দাঁড়ালে সবাই সমান সেবা পায়।",
        visualPrompt: "Everyone at the front of the line getting their turn and looking super happy.",
        mediaType: 'image'
      }
    ]
  }
};
