import { notFound } from "next/navigation";
import CourseDetailClient from "./CourseDetailClient";
import { getCourseDetails, getGlobalSettingsForCheckout } from "@/app/actions/course-detail";

export default async function CourseDetails({ params }: { params: { slug: string } }) {
  const course = await getCourseDetails(params.slug);
  
  if (!course) {
    notFound();
  }

  const { paymentQrImage } = await getGlobalSettingsForCheckout();

  return <CourseDetailClient course={course} paymentQrImage={paymentQrImage} />;
}
