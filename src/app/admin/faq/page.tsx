import { getFaqs, deleteFaq } from "@/app/actions/faq";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function FaqAdmin() {
  const faqs = await getFaqs();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteFaq(id);
    revalidatePath("/admin/faq");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">FAQ Manager</h1>
        <Link href="/admin/faq/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-bold shadow-lg shadow-blue-600/30 transition-all">
          <Plus size={18} /> Add FAQ
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-300 text-sm border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-bold tracking-wider w-[10%]">ORDER</th>
              <th className="px-6 py-4 font-bold tracking-wider">QUESTION</th>
              <th className="px-6 py-4 font-bold tracking-wider">STATUS</th>
              <th className="px-6 py-4 font-bold tracking-wider text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-white">
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-medium">
                  No FAQs found. Create one to get started.
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-gray-400 font-bold text-lg">
                    {faq.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-lg">{faq.question}</div>
                    <div className="text-sm text-gray-400 font-medium mt-1 line-clamp-1">{faq.answer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                      faq.published ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/10 text-gray-300 border border-white/20"
                    }`}>
                      {faq.published ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/faq/${faq.id}`} className="text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/10 p-2 rounded-lg hover:bg-blue-400/20">
                        <Edit size={18} />
                      </Link>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={faq.id} />
                        <button type="submit" className="text-red-400 hover:text-red-300 transition-colors bg-red-400/10 p-2 rounded-lg hover:bg-red-400/20">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
