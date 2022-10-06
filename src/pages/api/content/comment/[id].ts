import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";
import { getContentById, updateContent } from "@backend/apis/content";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);

  if (!isAuth) return res.status(401).json({ error: "Invalid token." });

  const { id } = req.query;
  const { comment } = req.body;

  const userInfo = user as User;

  if (userInfo?._id) {
    const commentObject = {
      owner: userInfo._id,
      comment,
    };
    const addComment = { $push: { comments: commentObject } };

    await updateContent(id as string, addComment);

    const content = await getContentById(id as string);

    return res.status(200).json(content);
  }

  return res.status(404).json({ error: "No user found" });
}
