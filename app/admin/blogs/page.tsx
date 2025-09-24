import { getAllBlogsDb } from "@/actions/blog.action";
import FloatingBlogEditButtons from "@/components/admin/flotingblog-editbuttons";
import BlogCard from "@/components/blog/blog-card";
import BlogPagination from "@/components/blog/blog-pagination";
import { BlogType } from "@/lib/types";
import Link from "next/link";

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const page = (await searchParams).page || 1;
  const limit = 10;

  const { data, pagination } = await getAllBlogsDb(page, limit);
  return (
    <div className="md:mt-0">
      <div className="p-5">
        <h1 className="text-2xl font-bold">โพสต์ทั้งหมด</h1>
        <p className=" text-sm text-gray-500">จำนวนโพสต์: {pagination.total}</p>
        <br />
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((blog) => (
            <div key={blog.id} className="relative">
              <div>
                <BlogCard blog={blog as BlogType} />
              </div>
              <FloatingBlogEditButtons blogId={blog.id} />
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
