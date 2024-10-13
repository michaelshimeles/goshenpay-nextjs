"server only";
import { auth, clerkClient } from "@clerk/nextjs/server";
export const getChurch = async (church_id: string) => {
  const { userId } = auth();

  const result = await clerkClient.users.getUser(userId!);

  if (!result?.id) {
    return null;
  }

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/church/get-church`,
      {
        method: "POST",
        body: JSON.stringify({ user_id: userId, church_id }),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: [`get-church-${church_id}`],
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
