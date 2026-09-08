import Link from "next/link";
import { getGlobalSettings } from "@/app/actions/settings";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Github } from "lucide-react";

export default async function Footer() {
  const settings = await getGlobalSettings();

  return (
    <footer className="bg-[#07090E] border-t border-border-subtle pt-16 pb-8">
      <div className="w-full max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-16">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[30px] h-[30px] bg-blue-600 rounded-[6px] flex items-center justify-center !text-white font-bold text-[0.95rem]">
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
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About TechSapana
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-white transition-colors"
                >
                  Training & Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog & Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-[0.8rem] font-extrabold text-white uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4 text-[0.9rem] text-[#94A3B8]">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-white transition-colors"
                >
                  Enroll in a Course
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Start a Project
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-white transition-colors"
                >
                  Browse Our Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Contact */}
          <div>
            <h4 className="text-[0.8rem] font-extrabold text-white uppercase tracking-widest mb-6">
              Global Contact
            </h4>
            <div className="flex flex-col gap-1 text-[0.9rem] text-[#94A3B8] mb-6">
              <p className="font-bold text-white mb-1">HQ Office</p>
              <p className="mb-4">{settings.address}</p>
              <p>Email: {settings.email}</p>
              <p>Phone: {settings.phone}</p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-blue-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.twitterUrl && (
                <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-blue-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-pink-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-red-500 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {settings.githubUrl && (
                <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[0.85rem] text-[#64748B]">
          <div>© {new Date().getFullYear()} TechSapana Pvt. Ltd. All rights reserved.</div>
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
