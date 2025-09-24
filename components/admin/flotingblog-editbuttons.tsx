import Link from "next/link";
import { Button } from "../ui/button";

export default function FloatingBlogEditButtons({
  blogId,
}: {
  blogId: string;
}) {
  return (
    <div className="absolute mt-2 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-3">
      <Button variant="destructive">
        <Link href={`/dashboard/blog-automation?id=${blogId}`}>Edit</Link>
      </Button>
      <Button variant="destructive">Unpublish</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
