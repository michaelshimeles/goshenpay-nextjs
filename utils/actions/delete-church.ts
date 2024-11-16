"use server";

import { revalidateTag } from "next/cache";
import { fetcherFn } from "../functions";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const deleteChurch = async (church_id: string, user_id: string) => {
  const { userId } = auth();

  try {
    const clerkResult = await clerkClient().users.getUser(userId!)

    if (!clerkResult?.id) {
      return null;
    }
    const result = await fetcherFn(
      "church/delete",
      {
        church_id,
        user_id,
      },
      {
        method: "POST",
        next: { tags: ["churches"] },
      }
    );

    if (result.success) {
      // Revalidate the 'get-churches' cache tag
      revalidateTag("get-churches");
    }

    return {
      success: result.success,
      message: result.message,
      churchId: result.churchId,
    };
  } catch (error) {
    console.error("Error in createChurch:", error);
    return {
      success: false,
      message: "An error occurred while creating the church",
    };
  }

  return;
};
