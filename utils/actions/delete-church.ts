"use server";

import { revalidateTag } from "next/cache";
import { fetcherFn } from "../functions";

export const deleteChurch = async (church_id: string, user_id: string) => {
  console.log("church_id", church_id);
  console.log("user_id", user_id);

  try {
    const result = await fetcherFn(
      "delete-church",
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
