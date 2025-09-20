"use server";

import { prisma } from "@/lib/prisma";
import { UserType } from "@/lib/types";
import { comparePassword, hashPassword } from "@/lib/utils";
import validate from "deep-email-validator";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export const authCheckAction = async () => {
  const cookiestore = await cookies();
  const token = cookiestore.get("auth")?.value;
  if (!token) return { success: false, message: "Not authenticated" };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserType;
    return { success: true, user: decoded };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return { success: false, message: "Invalid token" };
  }
};

// Function to generate JWT token
const generateToken = (payload: UserType) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

// Function to set HTTP-only cookie
const setAuthCookie = async (token: string) => {
  const cookiestore = await cookies();
  cookiestore.set({
    name: "auth",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

export const loginOrRegisterAction = async (
  email: string,
  password: string
) => {
  // Validate email format
  const { valid, reason } = await validate({ email, validateSMTP: false });

  // Basic validation
  if (!valid) {
    return {
      success: false,
      message: "Invalid email address provided: " + reason,
    };
  }

  // Password validation
  if (password.length < 6 || !password) {
    return {
      success: false,
      message: "Password must be at least 6 characters long",
    };
  }

  // Check if user exists
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // If user exists, verify password
  if (user) {
    const match = await comparePassword(password, user.password);

    // If password does not match
    if (!match) {
      return {
        success: false,
        message: "Incorrect password",
      };
    }
  } else {
    // If user does not exist, create a new user
    user = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password), // In a real application, ensure to hash the password before storing
        name: email.split("@")[0], // Generate a simple name
        username: nanoid(6), // Generate a unique username
      },
    });
  }

  // Generate JWT token and set it in HTTP-only cookie
  const { id, name, username, role } = user;
  const token = generateToken({ id, email, name: name || "", username, role });

  // Set the auth cookie
  await setAuthCookie(token);

  return {
    success: true,
    message: "Authentication successful",
    user: { email, name, username, role },
  };
};
