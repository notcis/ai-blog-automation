"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { togglePublishBlogDb } from "@/actions/blog.action";
import { toast } from "sonner";

export default function FloatingBlogEditButtons({
  blogId,
  published,
}: {
  blogId: string;
  published: boolean;
}) {
  const handlePublish = async (blogId: string) => {
    const res = await togglePublishBlogDb(blogId);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
  };
  return (
    <div className="absolute mt-2 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-3">
      <Button variant="destructive">
        <Link href={`/dashboard/blog-automation?id=${blogId}`}>Edit</Link>
      </Button>
      <Button
        variant={published ? "default" : "destructive"}
        onClick={() => blogId && handlePublish(blogId)}
      >
        {published ? "Published" : "Not Published"}
      </Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
