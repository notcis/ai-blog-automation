import { getLikedBlogsDb } from "@/actions/blog.action";
import BlogCard from "@/components/blog/blog-card";
import BlogPagination from "@/components/blog/blog-pagination";
import { BlogType } from "@/lib/types";
import Link from "next/link";

export default async function LikedBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const page = (await searchParams).page || 1;
  const limit = 10;

  const { data, pagination } = await getLikedBlogsDb(page, limit);
  return (
    <div className="md:mt-0">
      <div className="p-5">
        <h1 className="text-2xl font-bold">โพสต์ที่ถูกใจ</h1>
        <p className=" text-sm text-gray-500">จำนวนโพสต์: {pagination.total}</p>
        <br />
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((blog) => (
            <div
              key={blog.id}
              className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href={`/blogs/${encodeURIComponent(blog.slug)}`}>
                <BlogCard blog={blog as BlogType} />
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <BlogPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
          />
        </div>
      </div>
    </div>
  );
}
