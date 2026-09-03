import HomeClient from "./HomeClient";
import HomeBlogSection from "@/components/HomeBlogSection";
import { getHeroSection } from "@/app/actions/hero";

export default async function Page() {
  const heroData = await getHeroSection();

  return <HomeClient blogSection={<HomeBlogSection />} heroData={heroData} />;
}
