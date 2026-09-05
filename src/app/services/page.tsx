import { getPublishedServices } from "@/app/actions/service";
import ServicesClient from "./ServicesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | TechSapana Engineering",
  description: "Enterprise tech services provided by TechSapana.",
};

export default async function ServicesPage() {
  const dynamicServices = await getPublishedServices();
  
  return <ServicesClient dynamicServices={dynamicServices} />;
}
