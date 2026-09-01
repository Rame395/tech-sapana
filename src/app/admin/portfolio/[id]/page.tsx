import { getProject } from "@/app/actions/portfolio";
import ProjectForm from "../ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProject({ params }: { params: { id: string } }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
