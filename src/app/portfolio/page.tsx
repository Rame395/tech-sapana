import { getProjects } from "@/app/actions/portfolio";
import PortfolioFilterClient from "@/components/PortfolioFilterClient";

export default async function Portfolio() {
  const allProjects = await getProjects();
  const publishedProjects = allProjects.filter(p => p.published);

  return (
    <>
      <main className="min-h-screen bg-bg-primary">
        <section className="pt-[7.5rem] md:pt-[9rem] pb-12 relative flex flex-col items-center text-center">
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: "linear-gradient(to right, var(--color-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grid-line) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(circle at center top, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center top, black 30%, transparent 80%)",
          }}></div>

          <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center justify-center bg-[#EBF4FF] dark:bg-[#0B132B] border border-[#BFDBFE] dark:border-[#1E3A8A] text-[#1D4ED8] dark:text-[#3B82F6] text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
              PROVEN EXECUTION
            </div>
            
            <h1 className="text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-[800] tracking-tight leading-[1.15] text-gray-900 dark:text-white mb-4">
              Built. Launched. <span className="text-[#0052CC] dark:text-[#0052CC]">Used in Production.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
              Explore our client case studies across e-commerce retail,
              hospitality management systems, medical platforms, and enterprise
              SaaS. Click any video walkthrough to preview live system UI.
            </p>
          </div>
        </section>

        <PortfolioFilterClient projects={publishedProjects} />
      </main>
    </>
  );
}
