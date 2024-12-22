"use server";


export async function paymentFixed(amount: string, church_id: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/payment/donate/fixed`,
      {
        method: "POST",
        body: JSON.stringify({
          amount,
          church_id,
        }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
}
