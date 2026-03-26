import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/data/blogPosts";
import { urduBlogPosts } from "@/data/urduBlogPosts";

export default function UrduBlogIndex() {
  const posts = urduBlogPosts.map((urduPost) => ({
    ...urduPost,
    media: blogPosts.find((post) => post.slug === urduPost.slug),
  })).filter((post) => post.media);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link key={post.slug} to={`/ur/blog/${post.slug}`}>
            <Card className={`${post.media?.gradient} border h-full overflow-hidden hover-lift`}>
              <img src={post.media?.image} alt={post.title} loading="lazy" className="w-full h-48 object-cover" />
              <CardContent className="p-5 space-y-3">
                <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">{post.category}</span>
                <h2 className="font-black text-lg leading-tight">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.media?.date}</span>
                  <span>{post.media?.readTime}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}