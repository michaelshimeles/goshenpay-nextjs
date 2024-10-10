"use server"
import { z } from "zod";
import { churchSchema } from "../types";
import { revalidatePath } from "next/cache";

export async function createChurch(data: z.infer<typeof churchSchema>) {

  console.log("data", data);
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/create-church`,
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
