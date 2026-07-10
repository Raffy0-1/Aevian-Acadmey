/**
 * prisma/seed.ts — Realistic seed data for Aevian.
 *
 * Run with: npx prisma db seed
 * (requires "prisma.seed" in package.json pointing to "tsx prisma/seed.ts")
 *
 * This populates every table with enough data to make all pages meaningful:
 * teachers, students, parents, admin, courses, modules, lessons, enrollments,
 * bookings, reviews, homework, quizzes, certificates, blog posts, support
 * tickets, leads, availability, payments, invoices, discount codes,
 * messages, and notifications.
 */

import { Role, Difficulty, EnrollmentStatus, BookingType, BookingStatus, PaymentStatus, InvoiceStatus, TicketStatus, LeadStatus, EnglishLevel } from "@prisma/client";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding Aevian database…");

  // Clean existing data (reverse dependency order)
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.homeworkSubmission.deleteMany();
  await prisma.homework.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.review.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.course.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.media.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.discountCode.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.parentProfile.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.user.deleteMany();

  // ─── Admin ──────────────────────────────────────────────────────

  const admin = await prisma.user.create({
    data: {
      email: "admin@aevian.com",
      role: Role.ADMIN,
      name: "Aevian Admin",
      timezone: "UTC",
    },
  });

  // ─── Teachers ───────────────────────────────────────────────────

  const teacherData = [
    {
      email: "nadia.farooq@aevian.com",
      name: "Nadia Farooq",
      timezone: "Asia/Karachi",
      bio: "Mathematics educator with 12 years of experience in IB and Cambridge curricula. Passionate about making algebra and calculus intuitive for young learners.",
      subjects: ["Mathematics", "Statistics"],
      yearsExperience: 12,
      hourlyRate: 4500,
    },
    {
      email: "james.whitfield@aevian.com",
      name: "James Whitfield",
      timezone: "Europe/London",
      bio: "CELTA-certified English teacher specializing in spoken fluency and exam preparation. Former BBC language program contributor.",
      subjects: ["English", "IELTS Preparation", "Creative Writing"],
      yearsExperience: 9,
      hourlyRate: 5000,
    },
    {
      email: "aravind.rao@aevian.com",
      name: "Aravind Rao",
      timezone: "Asia/Kolkata",
      bio: "Software engineer turned educator. Built curriculum for coding bootcamps across Southeast Asia. Teaches Python, web development, and computational thinking.",
      subjects: ["Computer Science", "Python", "Web Development"],
      yearsExperience: 7,
      hourlyRate: 5500,
    },
    {
      email: "elena.marchetti@aevian.com",
      name: "Elena Marchetti",
      timezone: "Europe/Rome",
      bio: "PhD in Physics from ETH Zürich. Specializes in IB and AP Physics with a focus on building deep conceptual understanding rather than formula memorization.",
      subjects: ["Physics", "Science", "IB Physics"],
      yearsExperience: 15,
      hourlyRate: 6000,
    },
  ];

  const teachers = [];
  for (const t of teacherData) {
    const user = await prisma.user.create({
      data: {
        email: t.email,
        role: Role.TEACHER,
        name: t.name,
        timezone: t.timezone,
        teacherProfile: {
          create: {
            bio: t.bio,
            subjects: t.subjects,
            yearsExperience: t.yearsExperience,
            hourlyRate: t.hourlyRate,
          },
        },
      },
      include: { teacherProfile: true },
    });
    teachers.push(user);
  }

  // ─── Parents ────────────────────────────────────────────────────

  const parentData = [
    { email: "sarah.chen@example.com", name: "Sarah Chen", timezone: "America/New_York", phone: "+1-212-555-0147", country: "United States" },
    { email: "omar.hassan@example.com", name: "Omar Hassan", timezone: "Asia/Dubai", phone: "+971-50-555-0198", country: "UAE" },
    { email: "maria.silva@example.com", name: "Maria Silva", timezone: "America/Sao_Paulo", phone: "+55-11-5555-0123", country: "Brazil" },
  ];

  const parents = [];
  for (const p of parentData) {
    const user = await prisma.user.create({
      data: {
        email: p.email,
        role: Role.PARENT,
        name: p.name,
        timezone: p.timezone,
        parentProfile: {
          create: {
            phone: p.phone,
            country: p.country,
          },
        },
      },
      include: { parentProfile: true },
    });
    parents.push(user);
  }

  // ─── Students ───────────────────────────────────────────────────

  const studentData = [
    { email: "lily.chen@example.com", name: "Lily Chen", timezone: "America/New_York", dateOfBirth: new Date("2012-03-15"), gradeLevel: "7th Grade", englishLevel: EnglishLevel.ADVANCED, parentIndex: 0 },
    { email: "adam.chen@example.com", name: "Adam Chen", timezone: "America/New_York", dateOfBirth: new Date("2010-08-22"), gradeLevel: "9th Grade", englishLevel: EnglishLevel.NATIVE, parentIndex: 0 },
    { email: "yasmin.hassan@example.com", name: "Yasmin Hassan", timezone: "Asia/Dubai", dateOfBirth: new Date("2011-05-10"), gradeLevel: "8th Grade", englishLevel: EnglishLevel.UPPER_INTERMEDIATE, parentIndex: 1 },
    { email: "lucas.silva@example.com", name: "Lucas Silva", timezone: "America/Sao_Paulo", dateOfBirth: new Date("2013-11-03"), gradeLevel: "6th Grade", englishLevel: EnglishLevel.INTERMEDIATE, parentIndex: 2 },
    { email: "sofia.garcia@example.com", name: "Sofia Garcia", timezone: "Europe/Madrid", dateOfBirth: new Date("2009-01-20"), gradeLevel: "10th Grade", englishLevel: EnglishLevel.ADVANCED, parentIndex: null },
    { email: "kenji.tanaka@example.com", name: "Kenji Tanaka", timezone: "Asia/Tokyo", dateOfBirth: new Date("2012-07-08"), gradeLevel: "7th Grade", englishLevel: EnglishLevel.ELEMENTARY, parentIndex: null },
  ];

  const students = [];
  for (const s of studentData) {
    const parentProfileId = s.parentIndex !== null ? parents[s.parentIndex].parentProfile!.id : undefined;
    const user = await prisma.user.create({
      data: {
        email: s.email,
        role: Role.STUDENT,
        name: s.name,
        timezone: s.timezone,
        studentProfile: {
          create: {
            dateOfBirth: s.dateOfBirth,
            gradeLevel: s.gradeLevel,
            englishLevel: s.englishLevel,
            parentId: parentProfileId,
          },
        },
      },
      include: { studentProfile: true },
    });
    students.push(user);
  }

  // ─── Courses ────────────────────────────────────────────────────

  const courseData = [
    {
      title: "Algebra Foundations",
      slug: "algebra-foundations",
      description: "Build a rock-solid understanding of algebraic thinking. From variables and expressions to equations and inequalities, students develop the mathematical fluency needed for advanced study.",
      category: "Mathematics",
      ageRangeMin: 11, ageRangeMax: 14,
      difficulty: Difficulty.BEGINNER,
      durationWeeks: 12,
      priceCents: 29900,
      teacherIndex: 0,
      modules: [
        { title: "Variables & Expressions", lessons: ["What is a Variable?", "Writing Expressions", "Evaluating Expressions", "Like Terms"] },
        { title: "Equations", lessons: ["One-Step Equations", "Two-Step Equations", "Multi-Step Equations", "Word Problems"] },
        { title: "Inequalities", lessons: ["Understanding Inequalities", "Solving Inequalities", "Graphing on a Number Line", "Compound Inequalities"] },
      ],
    },
    {
      title: "Spoken English Fluency",
      slug: "spoken-english-fluency",
      description: "Develop natural, confident spoken English through structured conversation practice, pronunciation drills, and real-world scenarios. Designed for students who can read English but struggle with speaking.",
      category: "Languages",
      ageRangeMin: 13, ageRangeMax: 17,
      difficulty: Difficulty.INTERMEDIATE,
      durationWeeks: 8,
      priceCents: 24900,
      teacherIndex: 1,
      modules: [
        { title: "Foundations of Fluency", lessons: ["Pronunciation Essentials", "Connected Speech", "Rhythm and Intonation", "Common Sound Pairs"] },
        { title: "Conversational Confidence", lessons: ["Small Talk Mastery", "Expressing Opinions", "Storytelling Structures", "Debate Skills"] },
      ],
    },
    {
      title: "Python for Young Coders",
      slug: "python-for-young-coders",
      description: "A project-based introduction to programming with Python. Students build real programs — from games to data visualizations — while learning computational thinking, debugging, and clean code practices.",
      category: "Computer Science",
      ageRangeMin: 10, ageRangeMax: 13,
      difficulty: Difficulty.BEGINNER,
      durationWeeks: 10,
      priceCents: 34900,
      teacherIndex: 2,
      modules: [
        { title: "Getting Started", lessons: ["Your First Program", "Variables and Types", "Input and Output", "Simple Calculations"] },
        { title: "Control Flow", lessons: ["If Statements", "Loops", "Functions", "Error Handling"] },
        { title: "Projects", lessons: ["Number Guessing Game", "Quiz App", "Data Visualization"] },
      ],
    },
    {
      title: "IB Physics: Mechanics",
      slug: "ib-physics-mechanics",
      description: "A rigorous, concept-first approach to IB Physics mechanics. Covers kinematics, dynamics, energy, and momentum with extensive problem-solving practice aligned to IB exam standards.",
      category: "Science",
      ageRangeMin: 15, ageRangeMax: 18,
      difficulty: Difficulty.ADVANCED,
      durationWeeks: 14,
      priceCents: 39900,
      teacherIndex: 3,
      modules: [
        { title: "Kinematics", lessons: ["Displacement, Velocity, Acceleration", "Graphs of Motion", "Projectile Motion", "Relative Motion"] },
        { title: "Dynamics", lessons: ["Newton's Laws", "Free Body Diagrams", "Friction and Drag", "Circular Motion"] },
        { title: "Energy & Momentum", lessons: ["Work and Energy", "Conservation of Energy", "Linear Momentum", "Collisions"] },
      ],
    },
    {
      title: "Creative Writing Workshop",
      slug: "creative-writing-workshop",
      description: "Explore the craft of creative writing across genres — short fiction, poetry, personal essay. Students develop their unique voice through weekly writing exercises, peer workshops, and one-on-one feedback.",
      category: "Languages",
      ageRangeMin: 12, ageRangeMax: 16,
      difficulty: Difficulty.INTERMEDIATE,
      durationWeeks: 8,
      priceCents: 22900,
      teacherIndex: 1,
      modules: [
        { title: "Finding Your Voice", lessons: ["Observation Exercises", "Point of View", "Show Don't Tell", "Dialogue"] },
        { title: "Genres & Forms", lessons: ["Short Fiction", "Poetry Basics", "Personal Essay", "Flash Fiction"] },
      ],
    },
    {
      title: "Web Development Basics",
      slug: "web-development-basics",
      description: "Build real websites from scratch using HTML, CSS, and JavaScript. Students progress from static pages to interactive web apps, learning responsive design and modern development workflows.",
      category: "Computer Science",
      ageRangeMin: 13, ageRangeMax: 17,
      difficulty: Difficulty.BEGINNER,
      durationWeeks: 10,
      priceCents: 34900,
      teacherIndex: 2,
      modules: [
        { title: "HTML & CSS", lessons: ["HTML Structure", "Styling with CSS", "Flexbox Layout", "Responsive Design"] },
        { title: "JavaScript", lessons: ["Variables and Functions", "DOM Manipulation", "Events", "Fetch API"] },
        { title: "Final Project", lessons: ["Project Planning", "Building Your Site", "Deployment"] },
      ],
    },
  ];

  const courses = [];
  for (const c of courseData) {
    const teacherProfile = teachers[c.teacherIndex].teacherProfile!;
    const course = await prisma.course.create({
      data: {
        title: c.title,
        slug: c.slug,
        description: c.description,
        category: c.category,
        ageRangeMin: c.ageRangeMin,
        ageRangeMax: c.ageRangeMax,
        difficulty: c.difficulty,
        durationWeeks: c.durationWeeks,
        priceCents: c.priceCents,
        published: true,
        teacherId: teacherProfile.id,
        modules: {
          create: c.modules.map((m, mi) => ({
            title: m.title,
            order: mi + 1,
            lessons: {
              create: m.lessons.map((l, li) => ({
                title: l,
                order: li + 1,
                durationMinutes: 30 + Math.floor(Math.random() * 30),
              })),
            },
          })),
        },
      },
      include: { modules: { include: { lessons: true } } },
    });
    courses.push(course);
  }

  // ─── Availability ───────────────────────────────────────────────

  for (const teacher of teachers) {
    const tp = teacher.teacherProfile!;
    // Each teacher available Mon–Fri at two time slots
    for (let day = 1; day <= 5; day++) {
      await prisma.availability.createMany({
        data: [
          { teacherId: tp.id, dayOfWeek: day, startTime: "09:00", endTime: "12:00", timezone: teacher.timezone },
          { teacherId: tp.id, dayOfWeek: day, startTime: "14:00", endTime: "17:00", timezone: teacher.timezone },
        ],
      });
    }
  }

  // ─── Enrollments ────────────────────────────────────────────────

  const enrollmentMap = [
    { studentIndex: 0, courseIndex: 0, status: EnrollmentStatus.ACTIVE, progress: 45 },
    { studentIndex: 0, courseIndex: 2, status: EnrollmentStatus.ACTIVE, progress: 20 },
    { studentIndex: 1, courseIndex: 3, status: EnrollmentStatus.ACTIVE, progress: 60 },
    { studentIndex: 2, courseIndex: 1, status: EnrollmentStatus.ACTIVE, progress: 75 },
    { studentIndex: 2, courseIndex: 4, status: EnrollmentStatus.COMPLETED, progress: 100 },
    { studentIndex: 3, courseIndex: 2, status: EnrollmentStatus.ACTIVE, progress: 30 },
    { studentIndex: 4, courseIndex: 3, status: EnrollmentStatus.ACTIVE, progress: 85 },
    { studentIndex: 4, courseIndex: 5, status: EnrollmentStatus.PAUSED, progress: 40 },
    { studentIndex: 5, courseIndex: 1, status: EnrollmentStatus.ACTIVE, progress: 10 },
  ];

  for (const e of enrollmentMap) {
    await prisma.enrollment.create({
      data: {
        studentId: students[e.studentIndex].studentProfile!.id,
        courseId: courses[e.courseIndex].id,
        status: e.status,
        progressPercent: e.progress,
        completedAt: e.status === EnrollmentStatus.COMPLETED ? new Date() : undefined,
      },
    });
  }

  // ─── Bookings ───────────────────────────────────────────────────

  const now = new Date();
  const bookingData = [
    { studentIndex: 0, teacherIndex: 0, courseIndex: 0, type: BookingType.REGULAR, status: BookingStatus.COMPLETED, daysOffset: -7 },
    { studentIndex: 0, teacherIndex: 0, courseIndex: 0, type: BookingType.REGULAR, status: BookingStatus.CONFIRMED, daysOffset: 2 },
    { studentIndex: 1, teacherIndex: 3, courseIndex: 3, type: BookingType.REGULAR, status: BookingStatus.CONFIRMED, daysOffset: 1 },
    { studentIndex: 2, teacherIndex: 1, courseIndex: 1, type: BookingType.TRIAL, status: BookingStatus.COMPLETED, daysOffset: -14 },
    { studentIndex: 2, teacherIndex: 1, courseIndex: 1, type: BookingType.REGULAR, status: BookingStatus.CONFIRMED, daysOffset: 3 },
    { studentIndex: 3, teacherIndex: 2, courseIndex: 2, type: BookingType.TRIAL, status: BookingStatus.PENDING, daysOffset: 5 },
    { studentIndex: 4, teacherIndex: 3, courseIndex: 3, type: BookingType.REGULAR, status: BookingStatus.CANCELLED, daysOffset: -3 },
    { studentIndex: 5, teacherIndex: 1, courseIndex: 1, type: BookingType.TRIAL, status: BookingStatus.CONFIRMED, daysOffset: 4 },
  ];

  for (const b of bookingData) {
    const scheduledAt = new Date(now);
    scheduledAt.setDate(scheduledAt.getDate() + b.daysOffset);
    scheduledAt.setHours(10, 0, 0, 0);

    await prisma.booking.create({
      data: {
        studentId: students[b.studentIndex].studentProfile!.id,
        teacherId: teachers[b.teacherIndex].teacherProfile!.id,
        courseId: courses[b.courseIndex].id,
        type: b.type,
        status: b.status,
        scheduledAt,
        durationMinutes: b.type === BookingType.TRIAL ? 30 : 50,
        teacherNotes: b.status === BookingStatus.COMPLETED ? "Good session. Student showed strong engagement." : undefined,
      },
    });
  }

  // ─── Reviews ────────────────────────────────────────────────────

  const reviewData = [
    { studentIndex: 2, courseIndex: 4, rating: 5, comment: "The creative writing workshop transformed how I think about storytelling. Ms. Whitfield's feedback is incredibly detailed and encouraging." },
    { studentIndex: 0, courseIndex: 0, rating: 5, comment: "Nadia makes algebra feel like solving puzzles rather than memorizing rules. My daughter actually looks forward to math class now." },
    { studentIndex: 2, courseIndex: 1, rating: 4, comment: "Great course for building spoken confidence. The conversation practice sessions are the highlight." },
    { studentIndex: 4, courseIndex: 3, rating: 5, comment: "Dr. Marchetti's explanations of complex physics concepts are brilliant. The problem-solving approach really prepares you for IB exams." },
    { studentIndex: 3, courseIndex: 2, rating: 4, comment: "Fun and engaging Python course. My son built a quiz app that he now uses to test his friends!" },
  ];

  for (const r of reviewData) {
    await prisma.review.create({
      data: {
        studentId: students[r.studentIndex].studentProfile!.id,
        courseId: courses[r.courseIndex].id,
        rating: r.rating,
        comment: r.comment,
      },
    });
  }

  // ─── Homework & Submissions ─────────────────────────────────────

  // Create homework for the first lesson of each course's first module
  for (const course of courses) {
    const firstLesson = course.modules[0]?.lessons[0];
    if (!firstLesson) continue;

    const hw = await prisma.homework.create({
      data: {
        lessonId: firstLesson.id,
        title: `${course.title} — Introductory Assignment`,
        instructions: `Complete the following exercises related to "${firstLesson.title}". Show your working and submit as a PDF or typed response.`,
        dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // A couple of submissions
    if (courses.indexOf(course) === 0) {
      await prisma.homeworkSubmission.create({
        data: {
          homeworkId: hw.id,
          studentId: students[0].studentProfile!.id,
          text: "Completed all exercises. Please see attached working.",
          grade: "A",
          feedback: "Excellent work! Very clear presentation of your solutions.",
        },
      });
    }
  }

  // ─── Quizzes ────────────────────────────────────────────────────

  // Create a quiz for the first course's first lesson
  const firstCourseFirstLesson = courses[0].modules[0]?.lessons[0];
  if (firstCourseFirstLesson) {
    const quiz = await prisma.quiz.create({
      data: {
        lessonId: firstCourseFirstLesson.id,
        title: "Variables & Expressions Quiz",
        questions: {
          create: [
            {
              question: "What is a variable in algebra?",
              options: ["A fixed number", "A symbol representing an unknown value", "A type of equation", "A mathematical operation"],
              correctAnswer: 1,
              order: 1,
            },
            {
              question: "Simplify: 3x + 2x",
              options: ["6x", "5x", "5x²", "32x"],
              correctAnswer: 1,
              order: 2,
            },
            {
              question: "Evaluate 2y + 5 when y = 3",
              options: ["8", "10", "11", "15"],
              correctAnswer: 2,
              order: 3,
            },
          ],
        },
      },
    });

    // A quiz attempt
    await prisma.quizAttempt.create({
      data: {
        quizId: quiz.id,
        studentId: students[0].studentProfile!.id,
        score: 3,
        maxScore: 3,
        answers: { "q1": 1, "q2": 1, "q3": 2 },
        completedAt: new Date(),
      },
    });
  }

  // ─── Certificates ──────────────────────────────────────────────

  await prisma.certificate.create({
    data: {
      studentId: students[2].studentProfile!.id,
      courseId: courses[4].id,
      curriculumSummary: {
        course: "Creative Writing Workshop",
        modules: ["Finding Your Voice", "Genres & Forms"],
        completedAt: new Date().toISOString(),
      },
    },
  });

  // ─── Blog Posts ─────────────────────────────────────────────────

  const blogData = [
    {
      title: "Why Spoken Fluency Matters More Than Grammar Scores",
      slug: "spoken-fluency-vs-grammar",
      excerpt: "Most language assessments reward written accuracy over conversational confidence. Here's why that's backwards — and what parents can do about it.",
      content: `Most language assessments reward written accuracy over conversational confidence. Here's why that's backwards — and what parents can do about it.\n\nWhen we think about learning a language, we often default to grammar drills and vocabulary lists. But research consistently shows that spoken fluency — the ability to communicate naturally and confidently in real-time — is a far better predictor of real-world language success.\n\nAt Aevian, our English courses prioritize conversation from day one. Students don't just learn to write correct sentences; they learn to think in English, respond naturally, and express complex ideas without hesitation.\n\n## The fluency gap\n\nMany students who score well on written tests freeze in real conversations. This "fluency gap" happens because traditional teaching methods separate language learning from language use. Our approach bridges this gap through structured conversation practice, role-playing, and peer interaction.\n\n## What parents can do\n\n1. **Encourage speaking over perfection** — mistakes are how fluency develops.\n2. **Create English moments at home** — even 10 minutes of English conversation daily makes a difference.\n3. **Choose courses that prioritize speaking** — look for small class sizes and live interaction.`,
      coverImage: null,
      tags: ["education", "english", "fluency", "parenting"],
    },
    {
      title: "The Case for Teaching Coding Before Calculus",
      slug: "coding-before-calculus",
      excerpt: "Computational thinking develops the same logical reasoning as advanced math — but with immediate, tangible feedback that keeps young learners engaged.",
      content: `Computational thinking develops the same logical reasoning as advanced math — but with immediate, tangible feedback that keeps young learners engaged.\n\nThere's a growing consensus among educators that programming should be introduced earlier in the curriculum — not as a vocational skill, but as a way of thinking. When a 10-year-old writes a Python program that draws a pattern or solves a puzzle, they're practicing the same abstract reasoning that calculus requires, but with the added satisfaction of seeing their logic come to life.\n\n## Why code clicks\n\nCode gives immediate feedback. Unlike a math worksheet where you check your answer against a key, code either works or it doesn't. This tight feedback loop builds debugging skills — a form of persistence and analytical thinking that transfers to every subject.\n\n## Starting young\n\nOur Python for Young Coders course starts with simple programs and builds toward real projects. By week 10, students have built games, quizzes, and data visualizations — all while internalizing computational thinking patterns they'll use for life.`,
      coverImage: null,
      tags: ["coding", "education", "python", "stem"],
    },
    {
      title: "How to Choose the Right Online Tutor for Your Child",
      slug: "choosing-online-tutor",
      excerpt: "With hundreds of online tutoring platforms available, here are the five things that actually matter when selecting a tutor for your child.",
      content: `With hundreds of online tutoring platforms available, here are the five things that actually matter when selecting a tutor for your child.\n\n## 1. Subject expertise, not just teaching certification\n\nA great math tutor doesn't just know math — they know how students misunderstand math. Look for tutors with deep subject expertise AND experience working with your child's age group.\n\n## 2. Small class sizes\n\nOne-on-one is ideal, but small groups (4–6 students) can be even better for certain subjects like languages, where peer interaction drives learning. Avoid platforms that pack 20+ students into a "live class."\n\n## 3. Structured curriculum, not ad-hoc lessons\n\nDrop-in tutoring helps with homework, but doesn't build lasting understanding. Look for programs with a clear curriculum arc — where each lesson builds on the last.\n\n## 4. Regular feedback loops\n\nParents should receive regular, specific feedback — not just grades. What is the child struggling with? What's improving? What should they practice at home?\n\n## 5. A trial before committing\n\nAny platform worth its salt offers a free trial class. Use it to observe teaching style, technology quality, and — most importantly — whether your child is engaged.`,
      coverImage: null,
      tags: ["parenting", "education", "online-learning", "tips"],
    },
  ];

  for (const b of blogData) {
    await prisma.blogPost.create({
      data: {
        authorId: admin.id,
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        coverImage: b.coverImage,
        published: true,
        publishedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        tags: b.tags,
      },
    });
  }

  // ─── Support Tickets ────────────────────────────────────────────

  await prisma.supportTicket.create({
    data: {
      userId: parents[0].id,
      subject: "Reschedule request for next week's class",
      description: "We have a family event on Tuesday and would like to move Lily's algebra class to Thursday if possible.",
      status: TicketStatus.OPEN,
      priority: "medium",
    },
  });

  await prisma.supportTicket.create({
    data: {
      userId: students[4].id,
      subject: "Cannot access lesson recording",
      description: "The recording for IB Physics Lesson 3 (Projectile Motion) gives a 404 error when I try to play it.",
      status: TicketStatus.IN_PROGRESS,
      priority: "high",
    },
  });

  // ─── Leads ──────────────────────────────────────────────────────

  const leadData = [
    { name: "Ahmed Al-Rashidi", email: "ahmed.r@example.com", phone: "+966-50-555-0189", source: "website", status: LeadStatus.NEW, notes: "Interested in math tutoring for 2 children, ages 10 and 13." },
    { name: "Julia Andersen", email: "julia.a@example.com", source: "referral", status: LeadStatus.CONTACTED, notes: "Referred by Sarah Chen. Looking for IB preparation courses." },
    { name: "Wei Zhang", email: "wei.z@example.com", phone: "+86-138-0000-1234", source: "ad", status: LeadStatus.QUALIFIED, notes: "Responded to Facebook ad. Has a 14-year-old interested in Python." },
    { name: "Fatima Noor", email: "fatima.n@example.com", source: "website", status: LeadStatus.CONVERTED, notes: "Signed up for trial. Enrolled in Spoken English Fluency." },
  ];

  for (const l of leadData) {
    await prisma.lead.create({ data: l });
  }

  // ─── Discount Codes ─────────────────────────────────────────────

  await prisma.discountCode.createMany({
    data: [
      { code: "WELCOME10", description: "10% off first enrollment", discountPercent: 10, maxUses: 500, currentUses: 127 },
      { code: "SIBLING20", description: "20% off for siblings", discountPercent: 20, maxUses: 200, currentUses: 43 },
      { code: "SUMMER25", description: "Summer special — $25 off", discountAmount: 2500, maxUses: 100, currentUses: 89, validUntil: new Date("2026-09-01") },
    ],
  });

  // ─── Payments & Invoices ────────────────────────────────────────

  const invoice1 = await prisma.invoice.create({
    data: {
      userId: parents[0].id,
      amountCents: 29900,
      status: InvoiceStatus.PAID,
      paidAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dueAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.payment.create({
    data: {
      userId: parents[0].id,
      amountCents: 29900,
      status: PaymentStatus.SUCCEEDED,
      provider: "stripe",
      providerTxnId: "pi_mock_001",
      description: "Enrollment: Algebra Foundations",
      invoiceId: invoice1.id,
    },
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      userId: parents[1].id,
      amountCents: 24900,
      status: InvoiceStatus.SENT,
      dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.payment.create({
    data: {
      userId: parents[1].id,
      amountCents: 24900,
      status: PaymentStatus.PENDING,
      description: "Enrollment: Spoken English Fluency",
      invoiceId: invoice2.id,
    },
  });

  // ─── Messages ───────────────────────────────────────────────────

  await prisma.message.create({
    data: {
      senderId: teachers[0].id,
      receiverId: parents[0].id,
      subject: "Lily's progress update",
      body: "Hi Sarah, just wanted to let you know that Lily is doing exceptionally well in algebra. She's ahead of the class on equation-solving and shows great analytical thinking. We'll be moving into inequalities next week.",
    },
  });

  await prisma.message.create({
    data: {
      senderId: parents[1].id,
      receiverId: teachers[1].id,
      subject: "Homework question",
      body: "Hi James, Yasmin is finding the debate preparation exercise challenging. Could you suggest some resources for structuring arguments? Thank you.",
      read: true,
    },
  });

  // ─── Notifications ─────────────────────────────────────────────

  await prisma.notification.createMany({
    data: [
      { userId: parents[0].id, type: "homework_graded", title: "Homework Graded", body: "Lily's Algebra assignment has been graded: A" },
      { userId: students[0].id, type: "class_reminder", title: "Class Tomorrow", body: "You have Algebra Foundations tomorrow at 10:00 AM" },
      { userId: teachers[0].id, type: "new_booking", title: "New Booking", body: "A new regular session has been booked for Tuesday 10:00 AM" },
      { userId: admin.id, type: "new_lead", title: "New Lead", body: "Ahmed Al-Rashidi submitted an inquiry through the website" },
    ],
  });

  // ─── Media ──────────────────────────────────────────────────────

  await prisma.media.createMany({
    data: [
      { filename: "algebra-hero.jpg", url: "https://res.cloudinary.com/aevian/image/upload/algebra-hero.jpg", mimeType: "image/jpeg", sizeBytes: 245000, altText: "Students working on algebra problems" },
      { filename: "python-class.jpg", url: "https://res.cloudinary.com/aevian/image/upload/python-class.jpg", mimeType: "image/jpeg", sizeBytes: 312000, altText: "Young coder at laptop" },
    ],
  });

  console.log("✅ Seed complete!");
  console.log(`   ${teachers.length} teachers, ${students.length} students, ${parents.length} parents, 1 admin`);
  console.log(`   ${courses.length} courses with modules and lessons`);
  console.log(`   Enrollments, bookings, reviews, homework, quizzes, certificates`);
  console.log(`   Blog posts, support tickets, leads, discount codes`);
  console.log(`   Payments, invoices, messages, notifications, media`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
