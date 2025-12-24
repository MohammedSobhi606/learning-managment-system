"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ApiRes } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/ZodSchema";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export async function CreateCourse(values: CourseSchemaType): Promise<ApiRes> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return {
        message: "no user please login",
        status: "error",
      };
    }

    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: "invalid data",
      };
    }
    const data = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
    });

    return {
      message: "course created successfully",
      status: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "something went wrong try again",
      status: "error",
    };
  }
}

export async function adminGetCourses() {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      smaleDescription: true,
      title: true,
      level: true,
      fileKey: true,
      price: true,
      slug: true,
      category: true,
      duration: true,
      description: true,
      status: true,
    },
  });
  return courses;
}
// infer types from the returned type data
export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0];
// [0] to remove the array
// type AdminCourseType = {
//     title: string;
//     fileKey: string;
//     price: number;
//     level: CourseLevels;
//     category: string;
//     smaleDescription: string;
//     slug: string;
//     id: string;
// }

// get single course
export async function adminGetSingleCourse(id: string) {
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      smaleDescription: true,
      title: true,
      level: true,
      fileKey: true,
      price: true,
      slug: true,
      category: true,
      duration: true,
      description: true,
      status: true,
      chapters: {
        select: {
          id: true,
          title: true,
          position: true,
          description: true,
          lessons: true,
        },
      },
    },
  });
  if (!course) {
    return notFound();
  }
  return course;
}
export type AdminSingleCourseType = Awaited<
  ReturnType<typeof adminGetSingleCourse>
>;
