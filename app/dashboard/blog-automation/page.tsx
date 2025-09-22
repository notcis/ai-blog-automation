"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import { generateContentAi } from "@/actions/googleAi";
import { BotIcon, Loader2Icon, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { createBlogDb, getBlogById, updateBlogDb } from "@/actions/blog.action";
import { generateImageUnsplash } from "@/actions/unsplash";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogAutomationPage() {
  const [category, setCategory] = useState<string>("");
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<{ name: string; status: boolean }>({
    name: "",
    status: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      getBlogById(id).then((blog) => {
        if (blog) {
          setCategory(blog.category || "");
          setTitle(blog.title || "");
          setContent(blog.content || "");
          if (blog.imageUrl) {
            setImage(blog.imageUrl);
          }
        }
      });
    }
  }, [id]);

  const generateCategories = async () => {
    setLoading({ name: "categories", status: true });

    try {
      const { categories } = await generateContentAi(
        `Suggest 10 of the most popular and relevant categories for the blogging application. 
        Please return the response in JSON format like this:  { "categories": ["เทคโนโลยี", "สุขภาพ", "การเดินทาง"] } in Thai language.`
      );
      setSuggestedCategories(categories || []);
    } catch (error) {
      console.log("Error generating categories:", error);
      toast.error("ไม่สามารถสร้างหมวดหมู่ได้");
    } finally {
      setLoading({ name: "categories", status: false });
    }
  };

  const generateTitles = async () => {
    if (!category) {
      toast.error("กรุณาเลือกหมวดหมู่ก่อน");
      return;
    }

    setLoading({ name: "titles", status: true });
    try {
      const { titles } = await generateContentAi(
        ` Suggest 3 SEO-optimized blog post titles for the category ${category}.
          The titles should be catchy, relevant and designed to attract traffic.
          Please return the response in JSON format like this:  { "titles": ["The Future of AI", "10 Tips for Healthy Living"] } in Thai language.`
      );
      setSuggestedTitles(titles || []);
    } catch (error) {
      console.log("Error generating titles:", error);
      toast.error("ไม่สามารถสร้างชื่อเรื่องได้");
    } finally {
      setLoading({ name: "titles", status: false });
    }
  };

  const generateContent = async () => {
    if (!title || !category) {
      toast.error("กรุณาใส่ชื่อเรื่องและหมวดหมู่ก่อน");
      return;
    }
    setLoading({ name: "content", status: true });
    try {
      const { content } = await generateContentAi(
        ` Write an SEO-optimized blog post on the topic: "${title}".
          The content must:
          - Use semantic HTML for structuring, including headings (<h2>,
            <h3>), paragraphs (<p>), bullet points (<ul>, <li>), and <code> blocks
            only where relevant.
          - Exclude <DOCTYPE>, <html>, <body>, <head>, <header>, <nav>,
            <footer>, <article>, <section>, <main>, and <h1> tags.
          - Include a summary section at the end but no "keywords" section.
            Return the response in JSON format like this: { "content": "Your
            blog post content here." }.
            Do not add any navigation menus, copyright footers, or unnecessary
            elements. The content should be in Thai language.
        `
      );
      setContent(content || "");
    } catch (error) {
      console.log("Error generating content:", error);
      toast.error("ไม่สามารถสร้างเนื้อหาได้");
    } finally {
      setLoading({ name: "content", status: false });
    }
  };

  const generateImage = async () => {
    if (!title || !category || !content) {
      toast.error("กรุณาใส่ชื่อเรื่องและหมวดหมู่และเนื้อหาก่อน");
      return;
    }
    setLoading({ name: "image", status: true });
    try {
      const imageUrl = await generateImageUnsplash(title);
      setImage(imageUrl);
    } catch (error) {
      console.log("Error generating image:", error);
      toast.error("ไม่สามารถสร้างภาพได้");
    } finally {
      setLoading({ name: "image", status: false });
    }
  };

  const handleSubmit = async () => {
    if (!category || !title || !content || !image) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading({ name: "saving", status: true });

    if (id) {
      const res = await updateBlogDb(id, {
        title,
        category,
        content,
        imageUrl: image,
      });
      if (!res.success) {
        toast.error(res.message || "Error updating blog");
        setLoading({ name: "saving", status: false });
        return;
      }
      toast.success(res.message || "Blog updated successfully");
      setLoading({ name: "saving", status: false });
      setCategory("");
      setTitle("");
      setContent("");
      setImage("");
      setSuggestedCategories([]);
      setSuggestedTitles([]);
      router.push("/dashboard");
    } else {
      const res = await createBlogDb({
        title,
        category,
        content,
        imageUrl: image,
      });
      if (!res.success) {
        toast.error(res.message || "Error creating blog");
        setLoading({ name: "saving", status: false });
        return;
      }
      toast.success(res.message || "Blog created successfully");
      setLoading({ name: "saving", status: false });
      setCategory("");
      setTitle("");
      setContent("");
      setImage("");
      setSuggestedCategories([]);
      setSuggestedTitles([]);
    }
  };
  return (
    <div>
      <Card className="w-full max-w-6xl mx-auto my-5">
        <CardHeader>
          <CardTitle>สร้างโพสต์</CardTitle>
        </CardHeader>
        <CardContent className=" space-y-6">
          <div className=" space-y-2">
            <Label htmlFor="category">หมวดหมู่</Label>
            <div className=" flex gap-2">
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder=""
                className=" flex-1"
              />
              <Button
                onClick={generateCategories}
                variant="outline"
                className="flex-1"
                disabled={loading.status && loading.name === "categories"}
              >
                {loading.status && loading.name === "categories" ? (
                  <Loader2Icon className="animate-spin h-5 w-5" />
                ) : (
                  <BotIcon className="h-5 w-5" />
                )}
                รับคำแนะนำหมวดหมู่จาก AI
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={cat === category ? "default" : "outline"}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">ชื่อเรื่อง</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className=" flex-1"
              />
              <Button
                onClick={generateTitles}
                variant="outline"
                className="flex-1"
                disabled={loading.status && loading.name === "titles"}
              >
                {loading.status && loading.name === "titles" ? (
                  <Loader2Icon className="animate-spin h-5 w-5" />
                ) : (
                  <BotIcon className="h-5 w-5" />
                )}
                รับคำแนะนำชื่อเรื่องจาก AI
              </Button>
            </div>
            {suggestedTitles.length > 0 && (
              <div className=" mt-2">
                <Label>Suggested Titles:</Label>
                <div className=" grid gap-2 mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {suggestedTitles.map((t) => (
                    <div
                      key={t}
                      className={`justify-start p-2 cursor-pointer ${
                        t === title
                          ? "border rounded-md bg-black text-white dark:bg-white dark:text-black"
                          : ""
                      }`}
                      onClick={() => setTitle(t)}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className=" space-y-2">
            <Label htmlFor="content">เนื้อหา</Label>
            <div className=" flex gap-2">
              <Button
                onClick={generateContent}
                variant="outline"
                className="w-full"
                disabled={loading.status && loading.name === "content"}
              >
                {loading.status && loading.name === "content" ? (
                  <Loader2Icon className="animate-spin h-5 w-5" />
                ) : (
                  <BotIcon className="h-5 w-5" />
                )}
                รับคำแนะนำเนื้อหาจาก AI
              </Button>
            </div>
            <div className="pt-5">
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
              />
            </div>
          </div>
          <div className=" space-y-2">
            <Label htmlFor="image">ภาพฟีเจอร์</Label>
            <div className="flex gap-2 items-center">
              <Button
                className="flex-1"
                onClick={generateImage}
                variant="outline"
                disabled={loading.status && loading.name === "image"}
              >
                {loading.status && loading.name === "image" ? (
                  <Loader2Icon className="animate-spin h-5 w-5" />
                ) : (
                  <BotIcon className="h-5 w-5" />
                )}
                รับคำแนะนำภาพฟีเจอร์จาก AI
              </Button>
              {image && (
                <div className="flex-1">
                  <Image
                    src={image}
                    alt="Feature Image"
                    width={600}
                    height={600}
                    className="mt-2 max-w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Button
              disabled={loading.name === "saving" && loading.status}
              onClick={handleSubmit}
              className="flex-1"
            >
              {loading.name === "saving" && loading.status ? (
                <Loader2Icon className="animate-spin h-5 w-5" />
              ) : (
                <SendIcon className="h-5 w-5" />
              )}
              บันทึกโพสต์
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
