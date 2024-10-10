"use client"

import clsx from 'clsx'
import {
  Globe,
  HomeIcon,
  Settings
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useParams } from 'next/navigation'

const links = [
  {
    href: "/dashboard",
    label: "Home",
    icon: <HomeIcon className="h-3 w-3" />,
    activePath: (pathname: string) => pathname === "/dashboard"
  }
];

export default function DashboardSideBar() {
  const pathname = usePathname();
  const params = useParams();

  const dashboardId = params?.id as string | undefined;

  const dynamicLinks = dashboardId
    ? [
        {
          href: `/dashboard/${dashboardId}`,
          label: "Donation Site",
          icon: <Globe className="h-3 w-3" />,
          activePath: (pathname: string) => pathname === `/dashboard/${dashboardId}`
        },
        {
          href: `/dashboard/${dashboardId}/settings`,
          label: "Settings",
          icon: <Globe className="h-3 w-3" />,
          activePath: (pathname: string) => pathname === `/dashboard/${dashboardId}/settings`
        },
        // Add more dynamic links here as needed
      ]
    : [];

  const allLinks = [...links, ...dynamicLinks];

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="">GoshenPay</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            {links.map(({ href, label, icon, activePath }) => (
              <div key={href} className="flex flex-col gap-2">
                <Link
                  className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50", {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50": activePath(pathname)
                  })}
                  href={href}
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    {icon}
                  </div>
                  {label}
                </Link>
              </div>
            ))}

            {dashboardId && (
              <>
                <div className="mb-2 mt-1 border-t border-gray-200 dark:border-zinc-800" />
                {dynamicLinks.map(({ href, label, icon, activePath }) => (
                  <div key={href} className="flex flex-col gap-2">
                    <Link
                      className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50", {
                        "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50": activePath(pathname)
                      })}
                      href={href}
                    >
                      <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                        {icon}
                      </div>
                      {label}
                    </Link>
                  </div>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
