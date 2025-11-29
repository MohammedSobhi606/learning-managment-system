import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
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
      <div>
        <h1 className="capitalize">Here you will see all of the courses</h1>
      </div>
    </main>
  );
}
