"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { fetcherFn } from "../functions";
import { revalidateTag } from "next/cache";

type donationConfigType = {
  church_id: string;
  user_id: string;
  configJson: any;
};

export async function donationConfig({
  church_id,
  user_id,
  configJson,
}: donationConfigType) {
  const { userId } = auth();
  try {
    const clerkResult = await clerkClient().users.getUser(userId!);
    if (!clerkResult?.id) {
      return null;
    }

    const result = await fetcherFn(
      "church/set/donation-configuration",
      {
        church_id,
        user_id,
        configJson,
      },
      {
        method: "POST",
      }
    );

    console.log('result', result)

    revalidateTag("get-donation-config");
    return {
      success: result?.success!,
      message: result?.message!,
      result,
    };
  } catch (error) {
    console.error("Error in createChurch:", error);
    return {
      success: false,
      message: "An error occurred while creating the church",
    };
  }
}
