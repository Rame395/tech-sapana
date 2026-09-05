import { getServices } from "@/app/actions/service";
import ServiceForm from "./ServiceForm";
import { Layers } from "lucide-react";

export const metadata = {
  title: "Admin - Services | TechSapana",
};

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
          <Layers className="text-blue-500" />
          Services Management
        </h1>
        <p className="text-gray-400">
          Add, edit, or remove dynamic services. These will be displayed on the Services page alongside the default modules.
        </p>
      </div>

      <ServiceForm services={services} />
    </div>
  );
}
