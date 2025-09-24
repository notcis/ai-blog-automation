"use server";

import { UserType } from "@/lib/types";
import { authCheckAction } from "./auth.action";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";

export const updateProfileDb = async (data: UserType) => {
  const { user } = await authCheckAction();
  if (!user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (!data.name || data.name.trim() === "") {
    return {
      success: false,
      message: "Name is required",
    };
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        website: data.website,
        about: data.about,
      },
    });

    const { password, id, ...rest } = updatedUser;
    return {
      success: true,
      message: "Profile updated successfully",
      user: rest,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error updating profile",
    };
  }
};

export const updatePasswordDb = async (password: string) => {
  const { user } = await authCheckAction();
  if (!user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (!password || password.trim() === "") {
    return {
      success: false,
      message: "Password is required",
    };
  }

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error updating password",
    };
  }
};

export const updateUsernameDb = async (username: string) => {
  const { user } = await authCheckAction();
  if (!user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  if (!username || username.trim() === "") {
    return {
      success: false,
      message: "Username is required",
    };
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Username already taken",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        username,
      },
    });

    const { password, id, ...rest } = updatedUser;
    return {
      success: true,
      message: "Username updated successfully",
      user: rest,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error checking username",
    };
  }
};
