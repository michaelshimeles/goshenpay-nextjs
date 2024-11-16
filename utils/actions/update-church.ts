"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { updateChurchSchema } from "../types";
import { fetcherFn } from "../functions";
import { auth, clerkClient } from "@clerk/nextjs/server";

type CreateChurchResponse = {
  success: boolean;
  message: string;
  churchId?: string;
};

export async function updateChurch(data: z.infer<typeof updateChurchSchema>) {

  const { userId } = auth();

  try {
    const clerkResult = await clerkClient().users.getUser(userId!)

    if (!clerkResult?.id) {
      return null;
    }
    const result = await fetcherFn<CreateChurchResponse>(
      "church/update",
      data,
      {
        method: "POST",
      }
    );

    if (result.success) {
      // Revalidate the 'churches' cache tag
      revalidateTag("get-churches");
      revalidateTag(`get-church-${data?.church_id}`);
    }

    return {
      success: result.success,
      message: result.message,
      churchId: result.churchId,
    };
  } catch (error) {
    return error;
  }
}
