export type PricingPackage = {
  name: string;
  priceGBP: number | string;
  priceUSD: number | string;
  pricePKR: number | string;
  features: string[];
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  targetStudents: string;
  duration: string;
  learningOutcomes: string[];
  badges: string[];
  curriculumTags: string[];
  pricing: PricingPackage[];
};

export type ProgramCategory = {
  id: string;
  title: string;
  description: string;
  courses: Course[];
};

export const programs: ProgramCategory[] = [
  {
    id: "academic-tutoring",
    title: "International School Curriculum Tutoring",
    description: "One-to-one personalized tutoring for school and college subjects across international curricula.",
    courses: [
      {
        slug: "school-subject-tutoring",
        title: "Personalized School Subject Tutoring",
        description: "Comprehensive one-to-one tutoring in Math, Physics, Chemistry, Biology, English, and Computer Science.",
        targetStudents: "Middle and High School Students",
        duration: "Flexible",
        learningOutcomes: ["Master core concepts", "Improve school grades", "Build strong foundational knowledge"],
        badges: ["Best for School Students"],
        curriculumTags: ["National Curriculum"],
        pricing: [
          { name: "8 Classes / Month", priceGBP: 125, priceUSD: 160, pricePKR: "12,000–18,000", features: ["1-on-1 tutoring", "Progress tracking", "8 hours of instruction"] },
          { name: "12 Classes / Month", priceGBP: 175, priceUSD: 220, pricePKR: "18,000–25,000", features: ["1-on-1 tutoring", "Progress tracking", "12 hours of instruction"] },
          { name: "20 Classes / Month", priceGBP: 275, priceUSD: 350, pricePKR: "Custom", features: ["1-on-1 tutoring", "Progress tracking", "20 hours of instruction"] },
        ],
      },
      {
        slug: "international-curriculum-tutoring",
        title: "International Curriculum Expertise",
        description: "Premium tutoring specifically tailored for rigorous international curricula.",
        targetStudents: "IB, Cambridge/IGCSE, A-Level, and American Curriculum Students",
        duration: "Flexible",
        learningOutcomes: ["Excel in international board exams", "Complete challenging assignments", "Deep understanding of curriculum rubrics"],
        badges: ["International Curriculum", "University Admission"],
        curriculumTags: ["IB", "Cambridge", "IGCSE", "A Levels", "UK Curriculum", "American Curriculum", "Australian Curriculum"],
        pricing: [
          { name: "8 Classes / Month", priceGBP: 175, priceUSD: 220, pricePKR: "Custom", features: ["Expert curriculum tutor", "Past paper practice", "8 hours of instruction"] },
          { name: "12 Classes / Month", priceGBP: 235, priceUSD: 300, pricePKR: "Custom", features: ["Expert curriculum tutor", "Past paper practice", "12 hours of instruction"] },
        ],
      }
    ]
  },
  {
    id: "school-assessment",
    title: "Global School Assessment Preparation",
    description: "Targeted preparation for competitive school assessments and entrance exams worldwide.",
    courses: [
      {
        slug: "competitive-school-assessment",
        title: "Competitive School Assessment Prep",
        description: "Intensive preparation for NAPLAN, UK SATs, Selective School Tests, CAT4, GL Assessment, and MAP Growth.",
        targetStudents: "Primary and Middle School Students applying to selective schools",
        duration: "8–10 weeks",
        learningOutcomes: ["Familiarity with exam formats", "Time management strategies", "Confidence in test-taking"],
        badges: ["Highly Competitive", "Premium Selection"],
        curriculumTags: ["UK SATs", "NAPLAN", "CAT4", "GL Assessment"],
        pricing: [
          { name: "Complete Course", priceGBP: 235, priceUSD: 300, pricePKR: "50,000–90,000", features: ["Practice papers", "Test strategy", "Progress tracking"] },
        ],
      }
    ]
  },
  {
    id: "test-preparation",
    title: "International Test Preparation",
    description: "Expert guidance for achieving high scores in international English proficiency and standardized tests.",
    courses: [
      {
        slug: "ielts-preparation",
        title: "IELTS Preparation Masterclass",
        description: "Comprehensive preparation covering speaking, writing, reading, and listening for the IELTS exam.",
        targetStudents: "University Applicants & Immigrants",
        duration: "8 weeks",
        learningOutcomes: ["Band 7.0+ strategies", "Mock test experience", "Targeted writing correction"],
        badges: ["Most Popular", "University Admission"],
        curriculumTags: ["IELTS"],
        pricing: [
          { name: "Complete Course", priceGBP: 235, priceUSD: 300, pricePKR: "35,000–60,000", features: ["Mock tests", "Writing correction", "Speaking practice"] },
        ]
      },
      {
        slug: "sat-preparation",
        title: "SAT Preparation Premium",
        description: "In-depth SAT preparation covering Math, Reading, and Writing to maximize your score.",
        targetStudents: "High School Students aiming for US Universities",
        duration: "8–12 weeks",
        learningOutcomes: ["Score improvement strategies", "Full-length mock tests", "Concept mastery"],
        badges: ["Premium", "University Admission"],
        curriculumTags: ["SAT"],
        pricing: [
          { name: "Complete Course", priceGBP: 395, priceUSD: 500, pricePKR: "60,000–100,000", features: ["Full-length mocks", "Targeted practice", "Score guarantee"] },
        ]
      }
    ]
  },
  {
    id: "language-skills",
    title: "English Language & Communication Skills",
    description: "Short, impactful courses to improve fluency, grammar, and professional communication.",
    courses: [
      {
        slug: "grammar-mastery",
        title: "15-Day Grammar Mastery",
        description: "Intensive short course to solidify English grammar fundamentals.",
        targetStudents: "Beginner to Intermediate Learners",
        duration: "15 Days (daily 45-60min)",
        learningOutcomes: ["Flawless sentence structure", "Confidence in writing", "Correction of common errors"],
        badges: ["Beginner Friendly", "Short Course"],
        curriculumTags: ["English Language"],
        pricing: [
          { name: "Complete Course", priceGBP: 59, priceUSD: 75, pricePKR: "8,000–15,000", features: ["Daily sessions", "Interactive exercises"] },
        ]
      }
    ]
  },
  {
    id: "quran-education",
    title: "Quran Learning Programs",
    description: "Dedicated 1-on-1 Quran classes for overseas Muslim families with verified teachers.",
    courses: [
      {
        slug: "quran-reading",
        title: "Quran Reading & Tajweed",
        description: "Learn to read the Quran correctly with proper Tajweed rules from qualified instructors.",
        targetStudents: "Children and Adults",
        duration: "Ongoing",
        learningOutcomes: ["Fluent Quran reading", "Correct pronunciation", "Understanding of basic Tajweed"],
        badges: ["Beginner Friendly", "Flexible Timings"],
        curriculumTags: ["Quran"],
        pricing: [
          { name: "3 Classes / Week", priceGBP: 79, priceUSD: 100, pricePKR: "5,000–10,000", features: ["1-on-1 attention", "Tajweed focus"] },
        ]
      }
    ]
  },
  {
    id: "islamic-foundations",
    title: "Islamic Foundations",
    description: "Structured Islamic studies courses designed for children and beginners.",
    courses: [
      {
        slug: "islamic-foundations-course",
        title: "1-Month Islamic Foundations",
        description: "Learn essential Islamic teachings: Kalimas, Articles of Faith, Wudu, Namaz, and daily manners.",
        targetStudents: "Children and Beginners",
        duration: "1 Month",
        learningOutcomes: ["Memorize 3 Kalimas", "Understand Wudu & Namaz", "Learn daily Islamic manners"],
        badges: ["Beginner Friendly", "Structured Program"],
        curriculumTags: ["Islamic Studies"],
        pricing: [
          { name: "3 Classes / Week", priceGBP: 79, priceUSD: 100, pricePKR: "8,000–12,000", features: ["Structured curriculum", "Engaging lessons", "45-min sessions"] },
          { name: "5 Classes / Week", priceGBP: 120, priceUSD: 150, pricePKR: "12,000–18,000", features: ["Accelerated learning", "Daily engagement", "45-min sessions"] },
        ]
      }
    ]
  }
];
