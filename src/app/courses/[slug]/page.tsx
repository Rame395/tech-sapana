import { notFound } from "next/navigation";
import CourseDetailClient from "./CourseDetailClient";
import { getCourseDetails, getGlobalSettingsForCheckout } from "@/app/actions/course-detail";

export default async function CourseDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const course = await getCourseDetails(resolvedParams.slug);
  
  if (!course) {
    notFound();
  }

  const { paymentQrImage } = await getGlobalSettingsForCheckout();

  return <CourseDetailClient course={course} paymentQrImage={paymentQrImage} />;
}
