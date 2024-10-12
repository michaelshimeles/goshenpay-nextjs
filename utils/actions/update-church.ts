"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { updateChurchSchema } from "../types";
import { fetcherFn } from "../functions";

type CreateChurchResponse = {
  success: boolean;
  message: string;
  churchId?: string;
};

export async function updateChurch(data: z.infer<typeof updateChurchSchema>) {
  try {
    const result = await fetcherFn<CreateChurchResponse>(
      "update-church",
      data,
      {
        method: "POST",
      }
    );

    if (result.success) {
      // Revalidate the 'churches' cache tag
      revalidateTag("get-churches");
      revalidateTag(`get-church-${data?.church_id}`);
      console.log("update", `get-church-${data?.church_id}`);
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
