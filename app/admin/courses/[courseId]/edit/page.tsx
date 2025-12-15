import { adminGetSingleCourse } from "../../coursesActions/actions";
type Params = Promise<{ courseId: string }>;
export default async function EditRoute({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = await adminGetSingleCourse(courseId);
  if (!course) {
    return <span>no course found with this id</span>;
  }
  return (
    <div>
      <h1 className="text-3xl mb-8 font-bold">
        Edit Course:{" "}
        <span className="text-primary underline">{course.title}</span>
      </h1>
    </div>
  );
}
