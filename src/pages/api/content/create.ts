import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@backend/middleware/validate-token";
import { createContent } from "@backend/apis/content";
import { User } from "types/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);

  if (!isAuth) return res.status(401).json({ error: "Invalid token." });

  const userDetails = user as User;

  const content = {
    ...req.body,
    owner: userDetails._id,
  };

  try {
    const data = await createContent(content);

    return res
      .status(200)
      .json({ data, message: "Content published successfully." });
  } catch ({ message }) {
    return res.status(200).json({ error: message });
  }
}
