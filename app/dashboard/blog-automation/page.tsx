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
    setSuggestedCategories(["Tech", "Health", "Travel"]);
  };

  const generateTitles = async () => {
    setSuggestedTitles([
      "The Future of Tech",
      "Healthy Living Tips",
      "Top Travel Destinations",
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
            <div className=" flex flex-wrap gap-2">
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
        </CardContent>
      </Card>
    </div>
  );
}
