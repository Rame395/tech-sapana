import { getGlobalSettings } from "@/app/actions/settings";
import SettingsForm from "./SettingsForm";

export const metadata = {
  title: "Admin - Settings",
};

export default async function SettingsAdminPage() {
  const settings = await getGlobalSettings();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Global Settings</h1>
        <p className="text-gray-400">Configure global site information and manage administrator security.</p>
      </div>
      
      <SettingsForm settings={settings} />
    </div>
  );
}
