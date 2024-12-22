"use server";

export async function paymentSubscription(
  amount: string,
  church_id: string,
  interval: string
) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/payment/donate/subscription`,
      {
        method: "POST",
        body: JSON.stringify({
          amount,
          church_id,
          interval,
        }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
}
