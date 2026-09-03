import { getFaq } from "@/app/actions/faq";
import FaqForm from "../FaqForm";
import { notFound } from "next/navigation";

export default async function EditFaq(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const faq = await getFaq(params.id);

  if (!faq) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Edit FAQ</h1>
      <FaqForm faq={faq} />
    </div>
  );
}
