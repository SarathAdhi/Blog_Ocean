import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@backend/middleware/validate-token";
import { createComment, createContent } from "@backend/apis/content";
import { User } from "types/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);

  if (!isAuth)
    return res.status(401).json({ error: "Please Login to continue" });

  const userDetails = user as User;

  try {
    const { title } = req.body;
    const comment = await createComment(title);

    const content = {
      ...req.body,
      owner: userDetails._id,
      comment: comment._id,
    };

    const data = await createContent(content);

    return res
      .status(200)
      .json({ data, message: "Content published successfully." });
  } catch ({ message }) {
    return res.status(200).json({ error: message });
  }
}
