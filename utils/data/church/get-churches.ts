"server only";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
export const getChurches = async () => {
  const { userId } = auth();

  const result = await clerkClient.users.getUser(userId!);

  if (!result?.id) {
    return null;
  }

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-churches`,
      {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ['get-churches']
        }
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
