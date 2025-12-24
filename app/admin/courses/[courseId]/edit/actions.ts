"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ApiRes } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/ZodSchema";
import { headers } from "next/headers";

export async function editCourseAction(
  data: CourseSchemaType,
  courseId: string
): Promise<ApiRes> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return {
      message: "no user please login",
      status: "error",
    };
  }
  try {
    const valid = courseSchema.safeParse(data);
    if (valid.error) {
      return {
        status: "error",
        message: "invalid data",
      };
    }
    await prisma.course.update({
      where: {
        id: courseId,
        userId: session.user.id,
      },
      data: {
        ...valid.data,
      },
    });
    return {
      status: "success",
      message: "Course Updated Successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "invalid data",
    };
  }
}
