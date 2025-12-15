import { env } from "@/lib/env";
import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
export async function DELETE(request: Request) {
  try {
    const { key } = await request.json();
    if (!key) {
      return NextResponse.json(
        { error: "there is no key to delete" },
        {
          status: 404,
        }
      );
    }
    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_BUCKET_NAME,
      Key: key,
    });
    await S3.send(command);
    return NextResponse.json(
      { message: "deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "faild to delete",
      },
      { status: 400 }
    );
  }
}
