import { BlogType } from "@/lib/types";
import readingTime from "reading-time";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";

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
