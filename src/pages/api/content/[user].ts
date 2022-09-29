import type { NextApiRequest, NextApiResponse } from "next";
import { getUserById, getUsers } from "@apis/user";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";
import {
  getContentById,
  getContents,
  getContentsByUserId,
} from "@backend/apis/content";

type Data = {
  users: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { isAuth } = await validateToken(req.headers.authorization!);
  // console.log(isAuth);

  // if (!isAuth) return res.status(401).json({ error: "Invalid token." });

  const { user } = req.query;

  const contents = await getContentsByUserId(user as string);
  return res.status(200).json(contents);
}
