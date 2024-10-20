"use server";

import { auth } from "@clerk/nextjs/server";

export async function registerLink() {
  const { userId } = auth();
  try {
    const response = await fetch(
      `${process.env.API_URL}/connect/oauth/link?userId=${userId}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
}
