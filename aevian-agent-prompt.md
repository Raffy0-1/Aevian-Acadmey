# Aevian — Agent Build Prompt (Frontend-First)

Paste this whole file into your IDE agent (Claude Code, Cursor, etc.) as the
system/task prompt. It assumes the `aevian/` project from `aevian-homepage.zip`
is already unzipped and is the working repo.

## How this prompt is structured — read this first

Work happens in three stages, **in order, with a hard stop between Stage 1
and Stage 2, and another hard stop between Stage 2 and Stage 3**:

- **Stage 1 — Vanilla backend.** Just enough backend to make pages real
  instead of static: a Prisma schema, seed data, and simple CRUD so every
  page can be checked end-to-end (submit the trial form → a row actually
  appears; log in as a teacher → you actually see their data). Not secured,
  not production-grade. Its only job is to unblock and verify the frontend.
- **Stage 2 — Complete frontend.** Every page and dashboard from the
  original spec, fully designed, fully responsive, wired to the vanilla
  backend from Stage 1. **This is the main body of work. Do not start
  Stage 3 until every item in the Stage 2 checklist is done and I've
  explicitly confirmed it.**
- **Stage 3 — Backend hardening.** Only after Stage 2 is signed off: real
  payments, RLS policies, production email, rate limiting, security and
  performance passes.

If you find yourself wanting to build real Stripe integration, RLS
policies, or production email deliverability while Stage 2 is still open —
stop, that's Stage 3 work, leave a `// TODO(stage-3):` comment and keep
moving on the frontend instead.

---

## 0. Context: what already exists — do not rebuild this

The repo already has a working design system and a complete Home page.
**Read these files before writing anything**, and reuse them — do not
invent new colors, fonts, spacing, or primitives.

```
app/layout.tsx              Root layout, fonts (Newsreader/Public Sans/IBM Plex Mono)
app/globals.css             All design tokens as CSS variables (light + dark)
app/page.tsx                 Home page (reference for composition style)
app/robots.ts / sitemap.ts   SEO routes (extend sitemap.ts as new routes are added)
tailwind.config.ts           Token → Tailwind color/font mapping
components/ui/               Button, Badge, Container, SectionHeading,
                              LearningConstellation, ConstellationRule
components/layout/           Navbar, Footer
components/home/             All home page sections
lib/utils.ts                  cn() helper
lib/data/                     Placeholder content — replace with vanilla-backend
                               queries once Stage 1 is done
README.md                     Full design rationale — read this first
```

**Design system summary** (full detail in README.md):
- Colors: `ink` (#12181F, dark bg), `chalk` (#F3F4F0, light bg), `meridian`
  (#1F3D46, primary), `gold` (#B8925A, accent — spend sparingly, never as a
  large fill), `slate` (#5B6570, muted text), plus `success/warning/danger/info`.
- Fonts: `font-display` (Newsreader, serif, headings only), `font-body`
  (Public Sans, default), `font-mono` (IBM Plex Mono, for codes/labels/data).
- No neon. No gradients as a crutch. Numbered steps only where content is a
  genuine sequence (see `components/home/how-it-works.tsx` for the pattern).
- Every new UI element should be a reusable component under `components/ui/`
  if it's generic, or under a feature folder (`components/dashboard/`,
  `components/courses/`, etc.) if it's feature-specific.

## Tech stack (locked — do not substitute)

Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui-style
primitives (built by hand in `components/ui/`, as already started) ·
Framer Motion · Lucide Icons · React Hook Form + Zod · Supabase (Postgres +
Auth + Storage) · Prisma ORM · Resend (email) · Cloudinary (media) ·
deployable to Vercel as-is.

---

## STAGE 1 — Vanilla backend (foundation only)

Goal: make every page checkable with real data and real round-trips,
without spending time on production concerns yet. Explicitly **skip**: RLS
policies, real Stripe, production email deliverability, rate limiting —
stub these with `// TODO(stage-3):` comments.

### 1.1 Prisma schema

Create `prisma/schema.prisma` targeting Supabase Postgres. Model list below
— use sensible types, indexes on foreign keys and frequently-filtered
columns (`status`, `userId`, `courseId`), `@default(cuid())` ids unless noted.

- **User** — email (unique), role enum (`STUDENT | PARENT | TEACHER |
  ADMIN`), name, avatarUrl, timezone, locale, createdAt.
- **ParentProfile** — 1:1 User, phone, country, relation to Student(s).
- **StudentProfile** — 1:1 User, dateOfBirth, gradeLevel, englishLevel,
  parentId (nullable), relation to Enrollment, Booking, Certificate,
  QuizAttempt, HomeworkSubmission.
- **TeacherProfile** — 1:1 User, bio, subjects, yearsExperience,
  hourlyRate, relation to Course(s), Booking(s), Availability.
- **Course** — title, slug (unique), description, category, ageRangeMin/Max,
  difficulty enum, durationWeeks, priceCents, currency, teacherId, published,
  relation to Module[].
- **Module** — courseId, title, order, relation to Lesson[].
- **Lesson** — moduleId, title, order, videoUrl, durationMinutes, relation
  to Homework, Quiz.
- **Enrollment** — studentId, courseId, status enum, startedAt, completedAt,
  progressPercent.
- **Homework** / **HomeworkSubmission** — as in original spec (title,
  instructions, dueAt / submittedAt, fileUrl or text, grade, feedback).
- **Quiz** / **QuizQuestion** / **QuizAttempt** — as in original spec.
- **Certificate** — studentId, courseId, issuedAt, curriculumSummary (JSON),
  pdfUrl.
- **Availability** — teacherId, dayOfWeek, startTime, endTime, timezone.
- **Booking** — studentId, teacherId, courseId (nullable), type enum
  (`TRIAL | REGULAR`), scheduledAt (UTC), durationMinutes, status enum,
  recordingUrl, teacherNotes.
- **Payment** / **Invoice** / **DiscountCode** — as in original spec (Stage
  1 just needs the tables to exist; Stage 3 wires a real provider).
- **Message**, **Notification**, **Review**, **BlogPost**, **Media**,
  **SupportTicket**, **Lead** — as in original spec.

### 1.2 Seed data

`prisma/seed.ts` with enough realistic fake data to make every page
meaningful: 5+ courses across categories/difficulties, 4+ teachers with
availability, sample students/parents, a few bookings in different states,
reviews, 2–3 blog posts, a couple of support tickets and CRM leads.

### 1.3 Minimal auth

Supabase Auth, email/password. Signup creates `User` + the correct profile
row. A simple `getCurrentUser()` helper and basic role-based redirect in
each dashboard's layout (if wrong role, redirect — but skip RLS for now,
just app-level checks). This is enough to log in as each role and see that
role's dashboard; it is not yet secure against a determined client, and
that's fine for Stage 1.

### 1.4 Simple CRUD

Server actions or route handlers for the operations the frontend needs to
actually exercise: create booking, submit homework, post a review, update
profile, create/edit course (admin), etc. Zod-validate inputs. No rate
limiting, no RLS — just working data flow.

**Stage 1 is done when:** you can sign up as each role, see seeded data in
every dashboard, submit the trial booking form and see a real `Booking` row
appear, and `npm run build` / `npx tsc --noEmit` both pass.

Stop here and report back before starting Stage 2.

---

## STAGE 2 — Complete frontend (the main body of work)

Do not proceed to Stage 3 until **every** item below is built, wired to the
Stage 1 vanilla backend, responsive, and using only the existing design
tokens/components. Work through these in order; after each group, run the
build/typecheck and give a short status update.

### 2.1 Auth pages
Login, Signup, Forgot Password, Reset Password, Email Verification. Build a
shared `AuthCard` layout component. Full validation UI (inline Zod errors),
loading states, error states.

### 2.2 Remaining public site
Courses (search + filter by category/age/difficulty/duration, reuse the
`FeaturedCourses` card pattern), Course Detail (curriculum accordion,
teacher bio, reviews, sticky enroll/trial CTA), About, Teachers (directory +
profile pages), Student Success Stories, Reviews, full FAQ page (reuse
`Faq`), Blog (index + post page), Resources, Contact, Careers, Affiliate
Program, Refer a Friend, Scholarship Program, Privacy/Terms/Cookie Policy.

### 2.3 Book Free Trial wizard
Multi-step form (React Hook Form + Zod, one schema per step): Parent Info →
Student Info (age, country, timezone — auto-detected via
`Intl.DateTimeFormat().resolvedOptions().timeZone`, editable) → English
Level → Preferred Schedule (pulled from seeded `Availability`) → Goals →
Review → Submit. Confirmation screen with calendar-add links. This should
fully work against the Stage 1 backend (real row created) — payment, if
any, can be a fake "mock checkout" step for now.

### 2.4 Parent Dashboard
Child progress, attendance, homework status, assignments, invoices
(placeholder PDF is fine), certificates, teacher feedback feed, upcoming
classes + reschedule/cancel UI, class history, payment methods (UI only),
notifications, messages, profile settings. All reading/writing through
Stage 1's simple CRUD.

### 2.5 Student Dashboard
My courses, lesson player (video + resources + mark-complete), homework
submission, quizzes, grades, certificates, downloads, calendar, "Join Live
Class" link, bookmarks, per-course progress bar, achievements, profile.

### 2.6 Teacher Dashboard
Today's classes, weekly schedule, student roster + attendance marking,
homework/assignment creation and grading, lesson notes upload, lesson
plans, class recordings (link field is fine for now), per-student reports,
messages, availability editor, income history (from seeded `Payment` data),
profile.

### 2.7 Admin Dashboard
Analytics (revenue, student growth, teacher performance, lead conversion —
`recharts`, already available, driven by seed data), student/teacher/
course/parent management (CRUD tables, search, pagination), Lead
management/CRM board, payments/invoices/coupons/discounts (UI + Stage 1
data), Blog CMS, media library UI, email campaign trigger UI (can be inert
until Stage 3), notifications broadcast UI, reports CSV export, audit log
viewer, support ticket queue, role management, settings.

### 2.8 Cross-cutting frontend polish
Loading skeletons (`loading.tsx`) for every data-fetching route. Empty
states for every list/table. Error boundaries. Full keyboard-nav and
screen-reader pass on all new interactive components (dialogs, comboboxes,
tables) — reuse the `focus-visible:ring-gold` pattern from `button.tsx`.
Mobile pass on every dashboard (these are the pages most likely to be
tested on desktop-only and forgotten).

**Stage 2 checklist — all must be true before moving on:**
- [ ] Every page/dashboard listed above exists and is reachable via real
      navigation (no orphan routes)
- [ ] Every page uses only existing design tokens/components — no new
      colors, fonts, or one-off styles
- [ ] Every form validates and actually persists through the Stage 1 backend
- [ ] Every dashboard is fully responsive (test at 375px, 768px, 1280px)
- [ ] `npx tsc --noEmit` and `npm run build` pass with zero errors
- [ ] No `lorem ipsum` or "TODO copy" left in shipped UI text

**Stop here and report the full checklist status. Wait for explicit
confirmation before starting Stage 3.**

---

## STAGE 3 — Backend hardening (only after Stage 2 sign-off)

- Row Level Security policies for every table — a student must never be
  able to query another student's data via the client.
- Real payment provider (Stripe or Supabase-compatible equivalent): the
  three tiers already shown in `PricingPreview`, webhook handler updating
  `Payment`/`Invoice`, discount code redemption, refund requests routed to
  a `SupportTicket` for admin review rather than auto-refunded.
- Resend production templates (React Email or plain HTML, on-brand) for:
  Welcome, Verification, Trial Confirmation, Payment Receipt, Homework
  Reminder, Password Reset, Certificate Ready, Marketing Newsletter.
- Notification system: a single `notify(userId, type, payload)` function
  doing email + in-app row, structured so push can be added later.
- Rate limiting on auth and public form endpoints.
- Structured data (JSON-LD) for Course and BlogPost pages; expand
  `sitemap.ts` to pull real slugs from the database.
- Final security review: confirm no Stage 1 shortcuts (app-level-only
  checks, unvalidated inputs) remain unaddressed.
- Performance pass: image optimization, caching, code splitting review.

---

Start with **Stage 1.1 (Prisma schema)**. Ask me only if something is
genuinely ambiguous for your specific Supabase project setup — otherwise
make a reasonable choice, note it in your summary, and proceed. Respect the
stage gates: do not begin Stage 2 until Stage 1 is confirmed, and do not
begin Stage 3 until Stage 2's full checklist is confirmed.
