import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { adminGetCourses } from "./coursesActions/actions";
import AdminCourseCard from "./_components/AdminCourseCard";

export default async function CoursesPage() {
  const courses = await adminGetCourses();

  return (
    <main className="px-4 lg:px-6 flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold ">Your courses</h1>

        <Link className={buttonVariants({})} href={"/admin/courses/create"}>
          <PlusCircle />
          Create course
        </Link>
      </div>
      {/* courses */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 ">
        {courses.map((course) => (
          <AdminCourseCard data={course} key={course.id} />
        ))}
      </div>
    </main>
  );
}
