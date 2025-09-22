import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hash password
export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Compare password
export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

// Generate excerpt from content
export const generateExcerpt = async (content: string) => {
  const maxLength = 160;
  return content.length > maxLength
    ? content.slice(0, maxLength) + "..."
    : content;
};

// Create slug from title
export const createSlug = (text: string) => {
  if (!text) return "";
  const normalized = text.normalize("NFKD");
  const cleaned = normalized.replace(/[^\p{L}\p{N}\s-]+/gu, "");
  const slug = cleaned.trim().replace(/\s+/g, "-").replace(/-+/g, "-");
  return slug.toLowerCase();
};

// Strip HTML tags and truncate text
export const stripeHtmlAndTruncate = (text: string, maxLength: number) => {
  const strippedText = text.replace(/(<([^>]+)>)/gi, "");
  const cleanedText = strippedText.replace(/\s+/g, " ").trim();
  return cleanedText.length > maxLength
    ? cleanedText.substring(0, maxLength) + "..."
    : cleanedText;
};
