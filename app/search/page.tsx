"use client";

import { searchBlogsDb } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogType } from "@/lib/types";
import { LoaderIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function SearchPage() {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <Label htmlFor="search" className="block text-lg font-semibold">
        ค้นหาโพสต์
      </Label>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchComponent />
      </Suspense>
    </div>
  );
}

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [text, setText] = useState(searchParams.get("query") || "");
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rowQuery = searchParams.get("query") || "";
    const query = decodeURIComponent(rowQuery.trim());
    searchBlogsDb(query).then((data) => setBlogs(data as BlogType[]));
  }, [searchParams]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`?query=${encodeURIComponent(text)}`);
    setLoading(true);
    const data = await searchBlogsDb(text);
    setBlogs(data as BlogType[]);
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-4 items-stretch">
        <Input
          type="text"
          placeholder="ค้นหาโพสต์..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          className="flex-1"
        />
        <Button
          className=" flex items-center justify-center"
          type="submit"
          variant="outline"
          disabled={loading}
        >
          {loading ? (
            <LoaderIcon className="animate-spin w-4 h-4" />
          ) : (
            <SearchIcon className="w-4 h-4" />
          )}
          <span className="ml-2">ค้นหา</span>
        </Button>
      </form>
      <div className="mt-5">
        {loading ? (
          <div>Loading...</div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>ไม่มีผลลัพธ์ที่พบ ลองค้นหาด้วยคำอื่น</div>
        )}
      </div>
    </div>
  );
};
