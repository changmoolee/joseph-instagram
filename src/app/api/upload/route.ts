import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const textBody = await new Response(req.body).text();

  const parsedBody = JSON.parse(textBody);

  const { imageInfo } = parsedBody;

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

    return Response.json({
      data: { url, fields },
      result: "success",
      message: "",
    });
  } catch (error: any) {
    return Response.json({
      data: null,
      result: "fail",
      message: error.message,
    });
  }
}