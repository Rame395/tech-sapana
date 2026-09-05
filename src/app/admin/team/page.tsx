import { getLeadershipProfile, getTeamMembers } from "@/app/actions/team";
import LeadershipForm from "./LeadershipForm";
import TeamForm from "./TeamForm";
import { Users } from "lucide-react";

export const metadata = {
  title: "Admin - Team & Leadership | TechSapana",
};

export default async function AdminTeamPage() {
  const profile = await getLeadershipProfile();
  const members = await getTeamMembers();

  return (
    <div className="max-w-5xl space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
          <Users className="text-blue-500" />
          Team & Leadership
        </h1>
        <p className="text-gray-400">
          Manage your CEO Spotlight and the Builders section on the About page.
        </p>
      </div>

      <LeadershipForm profile={profile} />
      
      <div className="border-t border-white/10 my-8"></div>
      
      <TeamForm members={members} />
    </div>
  );
}
