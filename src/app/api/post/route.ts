import type { NextApiRequest, NextApiResponse } from "next";

export default async function getPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.send({
    content:
      "This is protected content. You can access this content because you are signed in.",
  });
  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
