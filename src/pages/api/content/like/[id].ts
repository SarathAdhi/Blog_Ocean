import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail, getUserById } from "@apis/user";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";
import {
  contentFilter,
  getContentById,
  updateContent,
} from "@backend/apis/content";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);

  if (!isAuth) return res.status(401).json({ error: "Invalid token." });

  const { id } = req.query;

  const userDetails = user as User;

  const userInfo = await getUserByEmail(userDetails.email as string);

  if (userInfo?._id) {
    const filter = { likes: userInfo._id };
    const isUserLikedTheContent = await contentFilter(filter);

    // For liking the content
    if (isUserLikedTheContent.length === 0) {
      const updateLikes = { $push: { likes: userInfo._id } };

      await updateContent(id as string, updateLikes);
    }
    // For undo like in the content
    else {
      const updateLikes = { $pull: { likes: userInfo._id } };

      await updateContent(id as string, updateLikes);
    }

    const content = await getContentById(id as string);

    return res.status(200).json(content);
  }

  return res.status(404).json({ error: "No user found" });
}
