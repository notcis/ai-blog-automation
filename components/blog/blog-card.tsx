import { BlogType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { ClockIcon, UserIcon } from "lucide-react";

export default function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="w-full h-40 relative overflow-hidden rounded-md">
          {blog?.imageUrl && (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <CardTitle className=" text-lg line-clamp-1 mt-2">
          {blog?.title || "ไม่มีชื่อเรื่อง"}
        </CardTitle>
        <p className=" text-sm text-muted-foreground line-clamp-1">
          {blog?.category || "ไม่มีหมวดหมู่"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-4 line-clamp-3">
          {blog?.content ? (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          ) : (
            "ไม่มีเนื้อหา"
          )}
        </div>

        <div className=" space-y-2">
          <InfoItem
            icon={UserIcon}
            text={blog?.user?.name || "ไม่ระบุชื่อผู้ใช้"}
          />
          <InfoItem
            icon={ClockIcon}
            text={
              blog?.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "ไม่ระบุวันที่"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InfoItem = ({ icon: Icon, text }: { icon: any; text: string }) => {
  return (
    <div className="flex items-center text-sm">
      <Icon className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
      <span className="line-clamp-1">{text}</span>
    </div>
  );
};
