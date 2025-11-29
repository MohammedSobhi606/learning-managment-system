import z from "zod";
export const CourseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const CourseStatus = ["Draft", "Puplished", "Archived"] as const;
export const Categories = ["Physics", "Medicine", "Nursing"] as const;
export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "title must be more than 3 char" })
    .max(100),
  description: z.string().min(6, { message: "desc must be more than 3 char" }),
  fileKey: z.string().min(4),
  //    because form return just strings
  price: z.number(),
  duration: z.number(),
  level: z.enum(CourseLevels),
  category: z.enum(Categories),
  smaleDescription: z.string().min(3),
  slug: z.string().min(3),
  status: z.enum(CourseStatus),
});

// infer types ## create types
export type CourseSchemaType = z.infer<typeof courseSchema>;
