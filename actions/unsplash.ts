"use server";

export const generateImageUnsplash = async (prompt: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${prompt}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.urls.regular;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};
