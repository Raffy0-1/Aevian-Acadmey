import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const fallbackPosts = [
  {
    slug: "spoken-fluency-vs-grammar",
    title: "Why Spoken Fluency Matters More Than Grammar Scores",
    excerpt: "Most language assessments reward written accuracy over conversational confidence. Here's why that's backwards — and what parents can do about it.",
    tags: ["education", "english", "fluency"],
    publishedAt: new Date("2026-07-01"),
  },
  {
    slug: "coding-before-calculus",
    title: "The Case for Teaching Coding Before Calculus",
    excerpt: "Computational thinking develops the same logical reasoning as advanced math — but with immediate, tangible feedback that keeps young learners engaged.",
    tags: ["coding", "education", "python", "stem"],
    publishedAt: new Date("2026-06-25"),
  },
  {
    slug: "choosing-online-tutor",
    title: "How to Choose the Right Online Tutor for Your Child",
    excerpt: "With hundreds of online tutoring platforms available, here are the five things that actually matter when selecting a tutor for your child.",
    tags: ["parenting", "education", "tips"],
    publishedAt: new Date("2026-06-20"),
  },
];

async function getBlogPosts() {
  try {
    const list = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    if (list.length > 0) return list;
  } catch (e) {
    console.warn("Could not fetch blog posts, using fallbacks.", e);
  }
  return fallbackPosts;
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="The Study"
            title="Essays, insights, and educational craft"
            description="Our faculty and administrators write about child development, language acquisition, coding pedagogy, and building frameworks of knowledge."
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap gap-2">
                  {post.tags?.slice(0, 2).map((tag: string) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <h3 className="mt-4 text-xl group-hover:text-meridian line-clamp-2">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between text-xs font-mono text-muted-foreground border-t border-border pt-4">
                  <span>
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1 text-meridian group-hover:translate-x-1 transition-transform">
                    Read article <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
