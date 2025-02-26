import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { imageInfo } = await req.json();

  const { filename, contentType } = JSON.parse(imageInfo);
  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    return NextResponse.json({
      data: { url, fields },
      result: "success",
      message: "",
    });
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      result: "failure",
      message: error.message,
    });
  }
}
