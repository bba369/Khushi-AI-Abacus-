
import { PracticeCategory, Question } from './types';

export const COLUMNS_CONFIG = [
  { id: 'ten-thousands', multiplier: 10000, label: '10K' },
  { id: 'thousands', multiplier: 1000, label: '1000s' },
  { id: 'hundreds', multiplier: 100, label: '100s' },
  { id: 'tens', multiplier: 10, label: '10s' },
  { id: 'units', multiplier: 1, label: '1s' }
];

export const ABACUS_HISTORY = {
  origin: "The abacus (एबाकस) is one of the oldest calculating tools, dating back to 2700 BC in Mesopotamia. It evolved through the Chinese 'Suanpan' and was refined in Japan into the 'Soroban' we use today.",
  significance: "Before calculators, the abacus was the backbone of commerce and science. Today, it remains a powerful tool for developing mental arithmetic and visualization skills.",
  nepaliContext: "In Nepal, abacus training (एबाकस तालिम) has become a vital part of cognitive development for students, championed by initiatives like the KHUSHI Foundation to bridge traditional wisdom with modern innovation."
};

export const ABACUS_BENEFITS = [
  { title: "🧠 Brain Development", desc: "Stimulates both left and right hemispheres of the brain through visualization." },
  { title: "⚡ Speed & Accuracy", desc: "Develops the ability to perform complex calculations faster than a calculator." },
  { title: "🎯 Concentration", desc: "Enhances focus and discipline as students track beads with precision." },
  { title: "🖼️ Visualization", desc: "Builds a 'Mental Abacus' allowing for high-speed mental arithmetic without physical tools." }
];

export const KHUSHI_KNOWLEDGE = `
KHUSHI Foundation: A non-profit organization dedicated to social impact, education, and community empowerment in Nepal.
Partners:
1. Khushi AI Guru: An advanced AI learning companion specialized in Abacus and mental arithmetic.
2. ERIC Nepali (Edtech Research and Innovation Centre): A hub for researching and implementing innovative digital education solutions in Nepal.
3. KHUSHI Entrepreneurs: A platform that fosters local entrepreneurship.
4. Khushi Mart: A retail initiative supporting the foundation's ecosystem.
Powered by: KHUSHI Foundation.
History: The Foundation integrates the ancient Soroban abacus into Nepali schools to enhance children's brain development.
`;

export const QUESTION_BANK: Record<PracticeCategory, Question[]> = {
  [PracticeCategory.DirectSingle]: [
    { q: "2 + 2", ans: 4 },
    { q: "7 - 2", ans: 5 },
    { q: "4 + 5", ans: 9 },
    { q: "9 - 3", ans: 6 },
    { q: "2 + 1 + 5", ans: 8 },
    { q: "3 + 6 - 5", ans: 4 }
  ],
  [PracticeCategory.DirectDouble]: [
    { q: "12 + 22 + 55", ans: 89 },
    { q: "45 - 15 + 69", ans: 99 },
    { q: "34 + 10", ans: 44 },
    { q: "67 - 12", ans: 55 },
    { q: "78 - 23", ans: 55 }
  ],
  [PracticeCategory.DirectTriple]: [
    { q: "123 + 356", ans: 479 },
    { q: "789 - 123", ans: 666 },
    { q: "234 + 215", ans: 449 },
    { q: "567 + 432 - 155", ans: 844 }
  ],
  [PracticeCategory.SmallFriends]: [
    { q: "3 + 2", ans: 5, explanation: "Small Friend of 2 is 3. Set 5, Remove 3." },
    { q: "7 - 3", ans: 4, explanation: "Small Friend of 3 is 2. Remove 5, Set 2." },
    { q: "2 + 3", ans: 5, explanation: "Small Friend of 3 is 2. Set 5, Remove 2." },
    { q: "4 + 1", ans: 5, explanation: "Small Friend of 1 is 4. Set 5, Remove 4." }
  ],
  [PracticeCategory.BigFriends]: [
    { q: "13 + 7", ans: 20, explanation: "Big Friend of 7 is 3. Set 10 in Tens, Remove 3 in Units." },
    { q: "9 + 5", ans: 14, explanation: "Big Friend of 5 is 5. Set 10, Remove 5." },
    { q: "8 + 6", ans: 14, explanation: "Big Friend of 6 is 4. Set 10, Remove 4." }
  ],
  [PracticeCategory.Family]: [
    { q: "1234 + 5678", ans: 6912 },
    { q: "5000 - 1234", ans: 3766 },
    { q: "10000 - 9999", ans: 1 }
  ]
};
