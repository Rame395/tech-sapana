import { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailClient from "./CourseDetailClient";
import { getCourseDetails, getGlobalSettingsForCheckout } from "@/app/actions/course-detail";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getCourseDetails(resolvedParams.slug);
  if (!course) return { title: "Course Not Found | TechSapana" };

  return {
    title: `${course.title} | TechSapana Courses`,
    description: course.shortDescription,
    openGraph: {
      title: `${course.title} | TechSapana Courses`,
      description: course.shortDescription,
      images: course.image ? [{ url: course.image }] : [],
    }
  };
}

export default async function CourseDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const course = await getCourseDetails(resolvedParams.slug);
  
  if (!course) {
    notFound();
  }

  const { paymentQrImage } = await getGlobalSettingsForCheckout();

  return <CourseDetailClient course={course} paymentQrImage={paymentQrImage} />;
}
