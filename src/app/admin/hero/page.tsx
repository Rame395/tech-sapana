import { getHeroSection } from "@/app/actions/hero";
import HeroForm from "./HeroForm";

export default async function HeroAdminPage() {
  const heroData = await getHeroSection();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Section Content</h1>
          <p className="text-text-muted text-sm mt-1">Manage the text, buttons, and visual slider on the homepage hero section.</p>
        </div>
      </div>
      
      {heroData && <HeroForm initialData={heroData} />}
    </div>
  );
}
