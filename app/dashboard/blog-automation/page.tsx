"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function BlogAutomationPage() {
  const [category, setCategory] = useState<string>("");
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const generateCategories = async () => {
    setSuggestedCategories(["Tech", "Health", "Travel", "Lifestyle"]);
  };

  const generateTitles = async () => {
    setSuggestedTitles([
      "The Future of Tech",
      "Healthy Living Tips",
      "Top Travel Destinations",
      "Exploring the Great Outdoors",
    ]);
  };

  const generateContent = async () => {
    setContent(
      "This is a sample blog content generated for the selected title."
    );
  };

  const generateImage = async () => {
    setImage("https://via.placeholder.com/600");
  };
  return (
    <div>
      <Card className="w-full max-w-6xl mx-auto my-5">
        <CardHeader>
          <CardTitle>Create a New Blog Post</CardTitle>
        </CardHeader>
        <CardContent className=" space-y-6">
          <div className=" space-y-2">
            <Label htmlFor="category">Category</Label>
            <div className=" flex gap-2">
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category name"
                className=" flex-1"
              />
              <Button
                onClick={generateCategories}
                variant="outline"
                className="flex-1"
              >
                Get Catagories Suggestions From AI
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
            <Label htmlFor="title">Title</Label>
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
              >
                Get Title Suggestions From AI
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
        </CardContent>
      </Card>
    </div>
  );
}
