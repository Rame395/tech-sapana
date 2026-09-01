import { getFaq } from "@/app/actions/faq";
import FaqForm from "../FaqForm";
import { notFound } from "next/navigation";

export default async function EditFaq({ params }: { params: { id: string } }) {
  const { id } = await params;
  const faq = await getFaq(id);

  if (!faq) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Edit FAQ</h1>
      <FaqForm faq={faq} />
    </div>
  );
}
