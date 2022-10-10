import type { NextApiRequest, NextApiResponse } from "next";
import { getContentsByUserId } from "@backend/apis/content";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { isAuth } = await validateToken(req.headers.authorization!);

  // if (!isAuth) return res.status(401).json({ error: "Please Login to continue" });

  const { user } = req.query;

  const contents = await getContentsByUserId(user as string);
  return res.status(200).json(contents);
}
