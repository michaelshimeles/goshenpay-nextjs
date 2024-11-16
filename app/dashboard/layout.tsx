import { ReactNode } from "react"
import DashboardSideBar from "./_components/dashboard-side-bar"
import DashboardTopNav from "./_components/dashbord-top-nav"
import OnboardingSteps from "./_components/onboarding-card";
import { getChurches } from "@/utils/data/church/get-churches";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const church = await getChurches();


  return (
    church?.result?.length > 0 ?
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <DashboardSideBar />
        <DashboardTopNav >
          <main className="flex flex-col gap-4 p-4 lg:gap-6">
            {children}
          </main>
        </DashboardTopNav>
      </div> : <OnboardingSteps />

  )
}
