import StatForm from "../StatForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stat = await prisma.stat.findUnique({
    where: { id }
  });

  if (!stat) {
    notFound();
  }

  // Need to handle symbol which might be null from DB
  const initialData = {
    id: stat.id,
    value: stat.value,
    symbol: stat.symbol || "",
    title: stat.title,
    desc: stat.desc,
    order: stat.order,
    published: stat.published
  };

  return (
    <div>
      <StatForm initialData={initialData} />
    </div>
  );
}
