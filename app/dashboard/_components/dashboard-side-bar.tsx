"use client"

import clsx from 'clsx'
import {
  Banknote,
  Globe,
  Settings,
  MonitorCog
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    href: "/dashboard",
    label: "Home",
    icon: <Globe className="h-3 w-3" />,
    activePath: (pathname: string) => pathname === "/dashboard"
  },
  {
    href: `/dashboard/finance`,
    label: "Finance",
    icon: <Banknote className="h-3 w-3" />,
    activePath: (pathname: string) => pathname === `/dashboard/finance`
  },
  {
    href: `/dashboard/pricing`,
    label: "Configure",
    icon: <MonitorCog className="h-3 w-3" />,
    activePath: (pathname: string) => pathname.includes(`/dashboard/pricing`)
  },
  {
    href: `/dashboard/settings`,
    label: "Settings",
    icon: <Settings className="h-3 w-3" />,
    activePath: (pathname: string) => pathname === `/dashboard/settings`
  },
];

export default function DashboardSideBar() {
  const pathname = usePathname();

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
                  prefetch={true}
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
          </nav>
        </div>
      </div>
    </div>
  )
}
