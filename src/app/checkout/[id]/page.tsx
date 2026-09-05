import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckoutClient from "./CheckoutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout - TechSapana",
  description: "Complete your enrollment securely.",
};

export default async function CheckoutPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // Fetch the course being purchased
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    notFound();
  }

  // Fetch the payment QR code from global settings
  const settings = await prisma.globalSettings.findUnique({
    where: { id: "default" },
    select: { paymentQrImage: true }
  });

  return (
    <CheckoutClient 
      courseId={course.id}
      courseTitle={course.title}
      coursePrice={course.price}
      qrImageUrl={settings?.paymentQrImage || null}
    />
  );
}
