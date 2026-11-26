import Link from "next/link";

import { BLOG_POSTS } from "../data/posts";
import { BlogList } from "./blog-list";

export function RecentBlogs() {
  return (
    <section id="blogs" className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="section-title">blog.</h2>
        <Link href="/blog" className="quiet-link">
          View all
        </Link>
      </div>
      <BlogList posts={BLOG_POSTS.slice(0, 3)} />
    </section>
  );
}
