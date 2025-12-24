import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminGetSingleCourse } from "../../coursesActions/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditCourseForm from "./_components/EditCourseForm";
import Sortable from "./_components/CourseStructure";
import CourseStructure from "./_components/CourseStructure";
type Params = Promise<{ courseId: string }>;
export default async function EditRoute({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = await adminGetSingleCourse(courseId);
  if (!course) {
    return <span>no course found with this id</span>;
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-8 font-bold">
        Edit Course:{" "}
        <span className="text-primary underline">{course.title}</span>
      </h1>
      {/* TABS */}
      <Tabs defaultValue={"basic-info"} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>Edit Basic Info Of The Course</CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm courseData={course} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>Edit Course Structure </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStructure courseData={course} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
