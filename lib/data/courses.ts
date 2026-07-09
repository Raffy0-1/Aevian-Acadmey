export type Course = {
  slug: string;
  title: string;
  category: string;
  ageGroup: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  teacher: string;
  rating: number;
  studentsEnrolled: number;
};

export const featuredCourses: Course[] = [
  {
    slug: "algebra-foundations",
    title: "Algebra Foundations",
    category: "Mathematics",
    ageGroup: "Ages 11–14",
    duration: "12 weeks",
    difficulty: "Beginner",
    teacher: "Nadia Farooq",
    rating: 4.9,
    studentsEnrolled: 1240,
  },
  {
    slug: "spoken-english-fluency",
    title: "Spoken English Fluency",
    category: "Languages",
    ageGroup: "Ages 13–17",
    duration: "8 weeks",
    difficulty: "Intermediate",
    teacher: "James Whitfield",
    rating: 4.8,
    studentsEnrolled: 2110,
  },
  {
    slug: "python-for-young-coders",
    title: "Python for Young Coders",
    category: "Computer Science",
    ageGroup: "Ages 10–13",
    duration: "10 weeks",
    difficulty: "Beginner",
    teacher: "Aravind Rao",
    rating: 4.9,
    studentsEnrolled: 1875,
  },
  {
    slug: "ib-physics-mechanics",
    title: "IB Physics: Mechanics",
    category: "Science",
    ageGroup: "Ages 15–18",
    duration: "14 weeks",
    difficulty: "Advanced",
    teacher: "Elena Marchetti",
    rating: 4.9,
    studentsEnrolled: 640,
  },
];
