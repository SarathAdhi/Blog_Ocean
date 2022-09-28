import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail } from "@apis/user";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);
  console.log(isAuth);

  if (!isAuth) return res.status(401).json({ error: "Invalid token." });

  const userDetails = user as User;

  const userInfo = await getUserByEmail(userDetails.email as string);

  if (userInfo?._id) {
    return res.status(200).json({ message: "", user: userInfo });
  }

  return res.status(404).json({ error: "No user found" });
}
