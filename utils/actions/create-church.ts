"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { fetcherFn } from "../functions";
import { createChurchSchema } from "../types";
import { auth, clerkClient } from "@clerk/nextjs/server";

type CreateChurchData = z.infer<typeof createChurchSchema>;

type CreateChurchResponse = {
  success: boolean;
  message: string;
  churchId?: string;
} | null;

export async function createChurch(
  data: CreateChurchData
): Promise<CreateChurchResponse> {
  const { userId } = auth();
  try {
    const clerkResult = await clerkClient().users.getUser(userId!)

    console.log('clerkResult', clerkResult)
    if (!clerkResult?.id) {
      return null;
    }

    const result = await fetcherFn<CreateChurchResponse>(
      "church/create",
      data,
      {
        method: "POST",
        next: { tags: ["churches"] },
      }
    );

    console.log('result', result)

    if (result?.success) {
      // Revalidate the 'get-churches' cache tag
      revalidateTag("get-churches");
    }

    return {
      success: result?.success!,
      message: result?.message!,
      churchId: result?.churchId,
    };
  } catch (error) {
    console.error("Error in createChurch:", error);
    return {
      success: false,
      message: "An error occurred while creating the church",
    };
  }
}
