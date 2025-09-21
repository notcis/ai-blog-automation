"use server";

import { BlogType } from "@/lib/types";
import { authCheckAction } from "./auth.action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Generate excerpt from content
const generateExcerpt = async (content: string) => {
  const maxLength = 160;
  return content.length > maxLength
    ? content.slice(0, maxLength) + "..."
    : content;
};

// Create slug from title
const createSlug = (text: string) => {
  if (!text) return "";
  // normalize to decompose accents if any
  const normalized = text.normalize("NFKD");
  // remove characters that are NOT letters, numbers, spaces or hyphens (Unicode-aware)
  const cleaned = normalized.replace(/[^\p{L}\p{N}\s-]+/gu, "");
  // collapse spaces to single hyphen, trim extra hyphens
  const slug = cleaned.trim().replace(/\s+/g, "-").replace(/-+/g, "-");
  return slug.toLowerCase();
};

// Create a new blog post
export const createBlogDb = async (data: BlogType) => {
  try {
    const { user } = await authCheckAction();
    if (!user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const slug = createSlug(data.title);

    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return {
        success: false,
        message: "Blog with this title already exists",
      };
    }
    const excerpt = await generateExcerpt(data.content);
    const blog = await prisma.blog.create({
      data: {
        userId: user.id,
        title: data.title,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl,
        excerpt,
        slug,
      },
    });

    return {
      success: true,
      message: "Blog created successfully",
      data: blog,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating blog",
    };
  }
};

// Get blog by ID
export const getBlogById = async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id },
  });
  return blog;
};

// Update existing blog post
export const updateBlogDb = async (id: string, data: BlogType) => {
  try {
    const { user } = await authCheckAction();
    if (!user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const excerpt = data.content ? await generateExcerpt(data.content) : null;
    const slug = createSlug(data.title);

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        category: data.category,
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        excerpt,
        slug,
      },
    });

    revalidatePath(`/dashboard`);

    return {
      success: true,
      message: "Blog updated successfully",
      data: blog,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error updating blog",
    };
  }
};
