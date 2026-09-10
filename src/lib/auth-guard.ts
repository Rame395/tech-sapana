/**
 * Server-side auth guard for Server Actions.
 * Call this at the top of any admin-only server action.
 */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}
