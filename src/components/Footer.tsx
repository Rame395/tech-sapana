import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#07090E] border-t border-border-subtle pt-16 pb-8">
      <div className="w-full max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-16">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[30px] h-[30px] bg-brand-blue rounded-[6px] flex items-center justify-center !text-white font-bold text-[0.95rem]">
                TS
              </div>
              <span className="text-[1.35rem] font-extrabold text-white tracking-[-0.03em]">
                TechSapana
              </span>
            </div>
            <p className="text-[0.885rem] text-[#94A3B8] leading-[1.6] max-w-[320px]">
              Turning Dreams Into Digital Reality. Engineering modern websites,
              custom business software, and AI solutions for growing companies
              worldwide.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[0.8rem] font-extrabold text-white uppercase tracking-widest mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4 text-[0.9rem] text-[#94A3B8]">
              <li>
                <Link
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  About TechSapana
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="hover:text-white transition-colors"
                >
                  Training &amp; Courses
                </Link>
              </li>
              <li>
                <Link
                  href="#industries"
                  className="hover:text-white transition-colors"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="hover:text-white transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#blog"
                  className="hover:text-white transition-colors"
                >
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div>
            <h4 className="text-[0.8rem] font-extrabold text-white uppercase tracking-widest mb-6">
              Courses
            </h4>
            <ul className="flex flex-col gap-4 text-[0.9rem] text-[#94A3B8]">
              <li>
                <Link
                  href="#courses"
                  className="hover:text-white transition-colors"
                >
                  AI for Business
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="hover:text-white transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="hover:text-white transition-colors"
                >
                  All Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Contact */}
          <div>
            <h4 className="text-[0.8rem] font-extrabold text-white uppercase tracking-widest mb-6">
              Global Contact
            </h4>
            <div className="flex flex-col gap-1 text-[0.9rem] text-[#94A3B8]">
              <p className="font-bold text-white mb-1">Kathmandu, Nepal</p>
              <p className="mb-4">
                Serving Nepal, USA, Australia &amp; Global Clients
              </p>
              <p>Email: contact@techsapana.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-subtle text-[0.85rem] text-[#64748B]">
          <div>© 2026 TechSapana Pvt. Ltd. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
