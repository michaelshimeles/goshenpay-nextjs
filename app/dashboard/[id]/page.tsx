import { getChurch } from "@/utils/data/church/get-church";

export default async function Dashboard() {
  const church = await getChurch();

  return (
    <div className="p-4">
      {church ? (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-900 rounded-lg shadow p-6 mt-3">
          <h2 className="text-xl font-semibold mb-2">{church.result[0].org_name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Address: {church.result[0].org_address}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Phone: {church.result[0].org_phone}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Email: {church.result[0].org_email}</p>
          {church.result[0].org_site && (
            <p className="text-gray-600 dark:text-gray-300">
              Website: <a href={church.result[0].org_site} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{church.result[0].org_site}</a>
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Loading church data...</p>
      )}
    </div>
  );
}