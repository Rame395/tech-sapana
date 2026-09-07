import HomeClient from "./HomeClient";
import HomeBlogSection from "@/components/HomeBlogSection";
import { getHeroSection } from "@/app/actions/hero";
import { getStats } from "@/app/actions/stats";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate every minute

export default async function Page() {
  const heroData = await getHeroSection();
  const stats = await getStats();
  
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return <HomeClient blogSection={<HomeBlogSection />} heroData={heroData} stats={stats} courses={courses} />;
}
