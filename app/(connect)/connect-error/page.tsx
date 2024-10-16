import { getAccount } from "@/utils/data/connect/get-account";

export default async function ConnectError({ searchParams }: { searchParams: { accountId: string } }) {
  const accountInfo = await getAccount(searchParams?.accountId);

  const account = accountInfo.account;
  const createdDate = new Date(account.created * 1000).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 flex items-center justify-center p-4">
    </div>
  )
}