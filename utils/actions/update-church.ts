import { z } from "zod";
import { updateChurchSchema } from "../types";

export async function updateChurch(data: z.infer<typeof updateChurchSchema>) {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/update-church`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const response = await result.json();

    if (response?.success) {
      return response;
    }

    return response;
  } catch (error) {
    return error;
  }
}
