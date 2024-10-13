"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { fetcherFn } from "../functions";
import { createChurchSchema } from "../types";

type CreateChurchData = z.infer<typeof createChurchSchema>;

type CreateChurchResponse = {
  success: boolean;
  message: string;
  churchId?: string;
};

export async function createChurch(
  data: CreateChurchData
): Promise<CreateChurchResponse> {
  try {
    const result = await fetcherFn<CreateChurchResponse>(
      "create-church",
      data,
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
}
