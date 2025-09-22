import { BlogType } from "@/lib/types";
import readingTime from "reading-time";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
// import dayjs
import dayjs from "dayjs";

// import relativeTime plugin
import relativeTime from "dayjs/plugin/relativeTime";

// extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

export default function BlogView({ blog }: { blog: BlogType }) {
  const timeToRead = readingTime(blog?.content || "");

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className=" flex flex-col items-start pb-2">
        <div className=" w-full h-96 relative overflow-hidden rounded-md">
          {blog?.imageUrl && (
            <div className=" relative w-full h-full">
              <Image
                src={blog.imageUrl}
                alt={blog?.title || "Blog Image"}
                layout="fill"
                objectFit="cover"
              />
              <div className=" absolute inset-0 flex items-center justify-center bg-black opacity-20">
                <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
                  {blog?.title || "Blog Title"}
                </h1>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <div className=" flex flex-wrap justify-center gap-4 mx-4 my-4 sm:mx-10 text-sm">
        <Button disabled variant="outline" className=" rounded-full">
          {timeToRead.text}
        </Button>
        <Button disabled variant="outline" className=" rounded-full">
          {timeToRead.words} words
        </Button>
        <Button disabled variant="outline" className=" rounded-full">
          Published {blog?.createdAt ? dayjs(blog.createdAt).fromNow() : ""}
        </Button>
        {blog?.updatedAt &&
          blog?.createdAt?.toLocaleDateString() !==
            blog?.updatedAt?.toLocaleDateString() && (
            <Button disabled variant="outline" className=" rounded-full">
              Updated {blog?.updatedAt ? dayjs(blog.updatedAt).fromNow() : ""}
            </Button>
          )}
        <Button disabled variant="outline" className=" rounded-full">
          {blog?.user?.name ? blog.user.name : "Unknown Author"}
        </Button>
        <Button disabled variant="outline" className=" rounded-full">
          {blog?.category ? blog.category : "Uncategorized"}
        </Button>
      </div>
      <CardContent className="prose prose-strong:text-gray-500 prose-headings:text-gray-500 max-w-none mt-12">
        <div className="text-lg leading-relaxed text-gray-500 space-y-6">
          {blog?.content && (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
