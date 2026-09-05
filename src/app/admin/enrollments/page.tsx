import { getEnrollments } from "@/app/actions/enrollment";
import EnrollmentsAdminClient from "./EnrollmentsAdminClient";

export const metadata = {
  title: "Admin - Enrollments",
};

export default async function EnrollmentsAdminPage() {
  const enrollments = await getEnrollments();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Enrollment Management</h1>
        <p className="text-gray-400">View and verify student course enrollments and payment screenshots.</p>
      </div>
      
      {/* 
        Pass serializable data to the Client Component 
      */}
      <EnrollmentsAdminClient 
        initialEnrollments={enrollments.map(e => ({
          ...e,
          createdAt: e.createdAt, // This is a Date object, Next.js handles Date passing from Server to Client component boundaries in recent versions, but if not we'd serialize to string.
        }))} 
      />
    </div>
  );
}
