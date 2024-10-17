import HeroSection from "@/components/homepage/hero-section";
import PageWrapper from "@/components/wrapper/page-wrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <HeroSection />
      </div>
    </PageWrapper>
  );
}
