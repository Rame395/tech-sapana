import HomeClient from "./HomeClient";
import HomeBlogSection from "@/components/HomeBlogSection";

export default function Page() {
  return <HomeClient blogSection={<HomeBlogSection />} />;
}
