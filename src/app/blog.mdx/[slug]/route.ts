import { getBlogPostBySlug } from "@/features/blog/data/posts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return new Response(null, { status: 404 });
  }

  return new Response(`# ${post.title}\n\n${post.content}\n`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
