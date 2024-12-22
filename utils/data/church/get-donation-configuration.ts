"server only";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export const getDonationConfig = async (church_id: string) => {
  const { userId } = auth();

  const result = await clerkClient().users.getUser(userId!)

  if (!result?.id) {
    redirect("/sign-in");
  }

  try {
    const result = await fetch(
      `${process.env.API_URL}/church/get/donation-configuration`,
      {
        method: "POST",
        body: JSON.stringify({ user_id: userId, church_id }),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["get-donation-config"],
        },
      }
    );

    const response = await result.json();

    if (response?.success) {
      return response;
    }

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
