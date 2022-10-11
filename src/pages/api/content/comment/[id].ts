import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";
import { getCommentById, updateComments } from "@backend/apis/content";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);

  if (!isAuth)
    return res.status(401).json({ error: "Please Login to continue" });

  const { id } = req.query;
  const { comment } = req.body;

  const method = req.method;

  const userInfo = user as User;

  if (userInfo?._id) {
    if (method === "POST") {
      const commentObject = {
        owner: userInfo._id,
        comment,
      };

      const addComment = { $push: { comments: commentObject } };

      await updateComments({ _id: id }, addComment);

      const comments = await getCommentById(id as string);

      return res.status(200).json(comments);
    }
    //
    else if (method === "GET") {
      const comment = await getCommentById(id as string);

      return res.status(200).json(comment);
    }
  }

  return res.status(404).json({ error: "No user found" });
}
