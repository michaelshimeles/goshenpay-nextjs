"server only";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getChurches = async () => {
  const { userId } = auth();

  const result = await clerkClient().users.getUser(userId!)

  if (!result?.id) {
    redirect("/sign-in");
  }

  try {
    const result = await fetch(`${process.env.API_URL}/church/get-churches`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["get-churches"],
      },
    });

    const response = await result.json();

    if (response?.success) {
      return response;
    }

    return response;
  } catch (error) {
    return error;
  }
};
