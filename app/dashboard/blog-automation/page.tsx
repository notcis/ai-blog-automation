"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import { generateContentAi } from "@/actions/googleAi";
import { BotIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

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
    } finally {
      setLoading({ name: "titles", status: false });
    }
  };

  const generateContent = async () => {
    if (!title) {
      toast.error("กรุณาใส่ชื่อเรื่องก่อน");
      return;
    }
    setLoading({ name: "content", status: true });
    try {
      const { content } = await generateContentAi(
        ` Generate an SEO-optimized blog post for the topic: "${title}".
          The post should be written in a clear, easy-to-understand
          language suitable for broad audience. Ensure the content
          is human-friendly and engaging while incorporating relevant
          SEO keywords. Please return the response in JSON format like this:  { "content": "Your blog post content goes here..." } in Thai language.
          Content must be written in semantic HTML format including multiple headings, bullet points, paragraphs, etc but exclude <DOCTYPE> <html> <head> <header> <meta> section and use <code> blocks as needed only.
          Include summary section at the end of the content but do not include keywords: section at the end.
        `
      );
      setContent(content || "");
    } catch (error) {
      console.log("Error generating content:", error);
    } finally {
      setLoading({ name: "content", status: false });
    }
  };

  const generateImage = async () => {
    setImage("https://placehold.co/600x600/png");
  };

  const handleSubmit = async () => {
    console.log({ category, title, content, image });
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
              >
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
            <Button onClick={handleSubmit} className="flex-1">
              บันทึกโพสต์
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
