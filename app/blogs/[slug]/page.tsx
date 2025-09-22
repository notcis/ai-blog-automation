import { getBlogBySlugFromDb } from "@/actions/blog.action";
import { stripeHtmlAndTruncate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const rawSlug = (await params).slug;
  const decodedSlug = decodeURIComponent(rawSlug.replace(/\+/g, " "));

  const blog = await getBlogBySlugFromDb(decodedSlug);
  const imageUrl = blog?.imageUrl || "/logo.svg";
  const shortDescription = stripeHtmlAndTruncate(blog?.content || "", 160);

  const imageWidth = 1200;
  const imageHeight = 630;

  return {
    title: `${blog?.title} - ${blog?.category}` || "Blog",
    description: shortDescription,
    openGraph: {
      title: `${blog?.title} - ${blog?.category}` || "Blog",
      description: shortDescription,
      url: `${process.env.DOMAIN}/blogs/${blog?.slug}`,
      type: "article",
      site_name: process.env.DOMAIN,
      images: [
        {
          url: imageUrl,
          alt: blog?.title || "Blog Image",
          type: "image/jpeg",
          width: imageWidth,
          height: imageHeight,
        },
      ],
    },
    canonical: `${process.env.DOMAIN}/blogs/${decodedSlug}`,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const rawSlug = (await params).slug;
  // แปลง percent-encoding เป็นตัวอักษรจริง (รองรับ + เป็น space ด้วย)
  const decodedSlug = decodeURIComponent(rawSlug.replace(/\+/g, " "));

  const blog = await getBlogBySlugFromDb(decodedSlug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return <div>{blog.title}</div>;
}
