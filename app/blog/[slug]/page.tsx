import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const fallbackPosts = [
  {
    slug: "spoken-fluency-vs-grammar",
    title: "Why Spoken Fluency Matters More Than Grammar Scores",
    excerpt: "Most language assessments reward written accuracy over conversational confidence. Here's why that's backwards — and what parents can do about it.",
    content: "Most language assessments reward written accuracy over conversational confidence. Here's why that's backwards — and what parents can do about it.\n\nWhen we think about learning a language, we often default to grammar drills and vocabulary lists. But research consistently shows that spoken fluency — the ability to communicate naturally and confidently in real-time — is a far better predictor of real-world language success.\n\nAt Aevian, our English courses prioritize conversation from day one. Students don't just learn to write correct sentences; they learn to think in English, respond naturally, and express complex ideas without hesitation.",
    tags: ["education", "english", "fluency"],
    publishedAt: new Date("2026-07-01"),
    author: { name: "James Whitfield" },
  },
  {
    slug: "coding-before-calculus",
    title: "The Case for Teaching Coding Before Calculus",
    excerpt: "Computational thinking develops the same logical reasoning as advanced math — but with immediate, tangible feedback that keeps young learners engaged.",
    content: "Computational thinking develops the same logical reasoning as advanced math — but with immediate, tangible feedback that keeps young learners engaged.\n\nThere's a growing consensus among educators that programming should be introduced earlier in the curriculum — not as a vocational skill, but as a way of thinking. When a 10-year-old writes a Python program that draws a pattern or solves a puzzle, they're practicing the same abstract reasoning that calculus requires, but with the added satisfaction of seeing their logic come to life.",
    tags: ["coding", "education", "python", "stem"],
    publishedAt: new Date("2026-06-25"),
    author: { name: "Aravind Rao" },
  },
];

async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (post) return post;
  } catch (e) {
    console.warn("Could not query blog post from database.", e);
  }

  // Fallback search
  const matched = fallbackPosts.find((p) => p.slug === slug);
  if (matched) return matched;
  return null;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-3xl space-y-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-meridian hover:underline"
          >
            <ArrowLeft size={14} /> Back to essays index
          </Link>

          <article className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag: string) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
                {post.title}
              </h1>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground border-y border-border py-4">
              <div className="flex items-center gap-1.5">
                <User size={16} />
                <span>By {post.author?.name || "Aevian Faculty"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>
                  {new Date(post.publishedAt || (post as any).createdAt).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}
                </span>
              </div>
            </div>

            {/* Post Content */}
            <div className="prose prose-slate max-w-none text-base leading-relaxed text-foreground space-y-6">
              {post.content.split("\n\n").map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
