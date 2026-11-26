import type { Metadata } from "next";

import { BlogList } from "@/features/blog/components/blog-list";
import { BLOG_POSTS } from "@/features/blog/data/posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="reveal-stagger reveal-page-sub flex flex-col gap-4 pb-16">
      <h1 className="section-title">blog.</h1>
      <BlogList posts={BLOG_POSTS} />
    </div>
  );
}
