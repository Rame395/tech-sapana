import HomeClient from "./HomeClient";
import HomeBlogSection from "@/components/HomeBlogSection";
import { getHeroSection } from "@/app/actions/hero";
import { getStats } from "@/app/actions/stats";

export default async function Page() {
  const heroData = await getHeroSection();
  const stats = await getStats();

  return <HomeClient blogSection={<HomeBlogSection />} heroData={heroData} stats={stats} />;
}
