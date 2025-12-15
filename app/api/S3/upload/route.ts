import { env } from "@/lib/env";
import { PutBucketAbacCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { S3 } from "@/lib/S3Client";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { error: "file name is required" }),
  contentType: z.string().min(1, { error: "content is required" }),
  size: z.number().min(1, { error: "size is required" }),
  isImage: z.boolean(),
});
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = fileUploadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const { contentType, fileName, size } = validation.data;
    const uniqueFileName = `${fileName}- ${uuidv4()}`;
    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: contentType,
      ContentLength: size,
    });
    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // expires in 6 mins
    });
    const response = {
      presignedUrl,
      key: uniqueFileName,
    };
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: "faild to generate presigned url",
      },
      { status: 400 }
    );
  }
}
