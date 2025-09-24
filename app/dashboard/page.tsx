import { getUserBlogsDb } from "@/actions/blog.action";
import BlogCard from "@/components/blog/blog-card";
import BlogPagination from "@/components/blog/blog-pagination";
import { Button } from "@/components/ui/button";
import { BlogType } from "@/lib/types";
import { FileTextIcon, ThumbsUpIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const page = (await searchParams).page || 1;
  const limit = 3;

  const { data, pagination } = await getUserBlogsDb(page, limit);
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/blogs">
          <Button className="w-full h-32 text-xl" variant="outline">
            <FileTextIcon className="mr-2 h-8 w-8" />
            Blog Management
          </Button>
        </Link>
        <Link href="/dashboard/profile-update">
          <Button className="w-full h-32 text-xl" variant="outline">
            <UsersIcon className="mr-2 h-8 w-8" />
            Profile Management
          </Button>
        </Link>
        <Link href="/dashboard/liked-blogs">
          <Button className="w-full h-32 text-xl" variant="outline">
            <ThumbsUpIcon className="mr-2 h-8 w-8" />
            Liked Blogs
          </Button>
        </Link>
      </div>
    </div>
  );
}
