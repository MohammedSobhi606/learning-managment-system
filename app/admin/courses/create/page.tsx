"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Categories,
  CourseLevels,
  courseSchema,
  CourseSchemaType,
  CourseStatus,
} from "@/lib/ZodSchema";
import { ArrowLeft, Loader, Plus, PlusCircle, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tiptap from "@/components/rich-text-editor/Editor";
import Uploader from "@/components/file-uploader/Uploader";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { CreateCourse } from "../coursesActions/actions";
import { useRouter } from "next/navigation";
export default function createCourse() {
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Draft",
      category: "Medicine",
      duration: 0,
      fileKey: "",
      level: "Beginner",
      price: 1,
      slug: "",
      smaleDescription: "",
    },
  });
  const router = useRouter();
  const [isCreatingPending, startCreating] = useTransition();
  function onSubmit(values: CourseSchemaType) {
    startCreating(async () => {
      const { data: respons, error } = await tryCatch(CreateCourse(values));
      if (error) {
        toast.error(error.message);
        return;
      }
      if (respons.status === "success") {
        toast.success(respons.message);
        form.reset();
        router.push("/admin/courses");
      } else if (respons.status === "error") {
        toast.error(respons.message);
      }
    });
  }

  return (
    <main className="px-4 lg:px-6 flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
      <div className="flex items-center space-x-2">
        <Link
          className={buttonVariants({
            size: "icon",
            variant: "outline",
          })}
          href={"/admin/courses"}
        >
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Provide Basic Info About The Course</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="courseForm"
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Course Title</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Course Title "
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* slug */}
              <div className="flex gap-4  items-end">
                <Controller
                  name="slug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="w-full "
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Slug "
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Button
                  variant={"outline"}
                  type="button"
                  className="w-fit "
                  onClick={(e) => {
                    const title = form.getValues("title");
                    if (!title || title.length < 4) {
                      return;
                    }
                    const slug = slugify(title);
                    form.setValue("slug", slug, { shouldValidate: true });
                  }}
                >
                  Generate <SparkleIcon size={12} />
                </Button>
              </div>
              <Controller
                name="smaleDescription"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      small description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="smale description "
                      className="min-h-32"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Tiptap field={field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="fileKey"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Thumbnail image
                    </FieldLabel>
                    {/* <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder=" Thumbnail "
                    /> */}
                    <Uploader onChange={field.onChange} value={field.value} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                      {/* select  */}
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="courseForm"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="auto">
                            Select a Category
                          </SelectItem>
                          <SelectSeparator />
                          {Categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="level"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Level</FieldLabel>
                      {/* select  */}
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="courseForm"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="auto">Select a Level</SelectItem>
                          <SelectSeparator />
                          {CourseLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="duration"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Duration</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder=" Duration "
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder=" Price "
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                    {/* select  */}
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="courseForm"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="auto">Select a Status</SelectItem>
                        <SelectSeparator />
                        {CourseStatus.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              disabled={isCreatingPending}
              type="submit"
              form={"courseForm"}
            >
              {isCreatingPending ? (
                <>
                  Loading... <Loader className="animate-spin" />
                </>
              ) : (
                <>
                  Create Course
                  <PlusCircle />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
