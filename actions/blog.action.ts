"use server";

import { BlogType } from "@/lib/types";
import { authCheckAction } from "./auth.action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSlug, generateExcerpt } from "@/lib/utils";

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

export const getUserBlogsDb = async (page: number, limit: number) => {
  const { user } = await authCheckAction();
  if (!user?.id) {
    return {
      data: [],
      pagination: { total: 0, page: 1, totalPages: 0 },
    };
  }

  const [blogs, totalBlogs] = await Promise.all([
    prisma.blog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: { name: true },
        },
      },
    }),
    prisma.blog.count({
      where: { userId: user.id },
    }),
  ]);

  return {
    data: blogs,
    pagination: {
      total: totalBlogs,
      page,
      totalPages: Math.ceil(totalBlogs / limit),
    },
  };
};

export const getAllBlogsDb = async (page: number, limit: number) => {
  const [blogs, totalBlogs] = await Promise.all([
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: { name: true },
        },
      },
    }),
    prisma.blog.count({
      where: { published: true },
    }),
  ]);
  return {
    data: blogs,
    pagination: {
      total: totalBlogs,
      page,
      totalPages: Math.ceil(totalBlogs / limit),
    },
  };
};

export const getBlogBySlugFromDb = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      user: {
        select: { name: true },
      },
      Like: true,
    },
  });
  return blog;
};

export const searchBlogsDb = async (query: string) => {
  if (!query || query.trim() === "") {
    return [];
  }
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return blogs;
};

export const toggleBlogLikeDb = async (blogId: string) => {
  const { user } = await authCheckAction();
  if (!user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  // Check if blog exists
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) {
    return {
      success: false,
      message: "Blog not found",
    };
  }

  // Check if user already liked the blog
  const alreadyLiked = await prisma.like.findUnique({
    where: { user_blog_unique: { userId: user.id, blogId: blog.id } },
  });

  try {
    // If already liked, remove the like, else add a like
    if (alreadyLiked) {
      const updatedBlog = await prisma.like.delete({
        where: { user_blog_unique: { userId: user.id, blogId: blog.id } },
      });
      return {
        success: true,
        message: "Like removed",
        liked: false,
        likes: [updatedBlog],
      };
    }
    // Not liked yet, add a like
    else {
      const updatedBlog = await prisma.like.create({
        data: { userId: user.id, blogId: blog.id },
      });
      return {
        success: true,
        message: "Blog liked",
        liked: true,
        likes: [updatedBlog],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error toggling like",
    };
  }
};

export const adminGetAllBlogsDb = async (page: number, limit: number) => {
  const [blogs, totalBlogs] = await Promise.all([
    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: { name: true },
        },
      },
    }),
    prisma.blog.count(),
  ]);
  return {
    data: blogs,
    pagination: {
      total: totalBlogs,
      page,
      totalPages: Math.ceil(totalBlogs / limit),
    },
  };
};
