"use server";

import { fetcherFn } from "../functions";

export const deleteChurch = async (church_id: string, user_id: string) => {

  console.log('church_id', church_id)
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
      // Revalidate the 'churches' cache tag
      // revalidateTag("churches");
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
