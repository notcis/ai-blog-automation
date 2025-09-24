"use client";

import { useAuthContext } from "@/context/auth";
import { BlogType, LikeType } from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { ThumbsUpIcon } from "lucide-react";
import { toast } from "sonner";
import { toggleBlogLikeDb } from "@/actions/blog.action";

export default function BlogLike({ blog }: { blog: BlogType }) {
  const { user, loggedIn } = useAuthContext(); // context
  const [likes, setLikes] = useState<LikeType[]>(
    (blog.Like as LikeType[]) || []
  ); // likes state
  const [loading, setLoading] = useState(false);

  const liked = user.id && likes.some((like) => like.userId === user.id);

  const handleLike = async () => {
    if (!loggedIn) {
      toast.error("กรุณาเข้าสู่ระบบเพื่อกดไลค์");
      return;
    }
    setLoading(true);
    if (!blog.id) {
      toast.error("Blog ID is missing");
      setLoading(false);
      return;
    }
    const res = await toggleBlogLikeDb(blog.id);
    if (!res.success) {
      toast.error(res.message || "An error occurred");
      setLoading(false);
      return;
    }
    setLikes((prevLikes) =>
      res.liked
        ? [...prevLikes, { userId: user.id! }]
        : prevLikes.filter((like) => like.userId !== user!.id)
    );
    if (res.liked) {
      toast.success("คุณได้กดไลค์บทความนี้แล้ว");
    } else {
      toast.error("คุณได้ยกเลิกการกดไลค์บทความนี้แล้ว");
    }
    setLoading(false);
  };
  return (
    <div onClick={handleLike}>
      {liked ? (
        <Button className="cursor-pointer">
          <ThumbsUpIcon className={`${loading && "animate-spin"}`} />
          {liked ? "Liked" : "Like"}
        </Button>
      ) : (
        <Button className="cursor-pointer" variant="secondary">
          <ThumbsUpIcon className={`${loading && "animate-spin"}`} />
          {liked ? "Liked" : "Like"}
        </Button>
      )}
    </div>
  );
}
