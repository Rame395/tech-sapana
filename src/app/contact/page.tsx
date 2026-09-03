import { getGlobalSettings } from "@/app/actions/settings";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const globalSettings = await getGlobalSettings();
  
  return <ContactClient globalSettings={globalSettings} />;
}
