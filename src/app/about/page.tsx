import AboutClient from "./AboutClient";
import { getLeadershipProfile, getTeamMembers } from "@/app/actions/team";
import { getStats } from "@/app/actions/stats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | TechSapana",
  description: "Learn more about TechSapana, our mission, our leadership, and the builders behind the code.",
};

export default async function AboutPage() {
  const leadershipProfile = await getLeadershipProfile();
  const teamMembers = await getTeamMembers();
  const stats = await getStats();

  return (
    <AboutClient 
      leadershipProfile={leadershipProfile} 
      teamMembers={teamMembers} 
      stats={stats}
    />
  );
}
