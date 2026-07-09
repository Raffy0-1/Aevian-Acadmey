import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

// Fallback static blog posts for local development or build time
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

async function getLatestBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    
    if (posts.length > 0) {
      return posts.map(p => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || "",
        tags: p.tags,
        publishedAt: p.publishedAt || p.createdAt,
      }));
    }
  } catch (e) {
    console.warn("Could not load latest blog posts from database:", e);
  }
  
  return fallbackPosts;
}

export async function LatestBlog() {
  const posts = await getLatestBlogPosts();

  return (
    <section className="py-20 sm:py-28 bg-card border-t border-border">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="From the study"
              title="Latest essays and resources"
            />
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-meridian hover:underline"
            >
              Visit the blog <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollRevealStagger>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gold/30 hover:bg-card/90"
              >
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h3 className="mt-4 text-xl group-hover:text-meridian line-clamp-2 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="inline-flex items-center gap-1 text-meridian group-hover:translate-x-1 transition-transform">
                    Read article <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </ScrollRevealStagger>
        </div>
      </Container>
    </section>
  );
}
