import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, decodeToken, getUserByEmail } from "@apis/user";
import { NewUser } from "types/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;

  const userDetails: NewUser = await decodeToken(token as string);

  const user = await getUserByEmail(userDetails.email as string);

  if (user) {
    return res.status(200).json({ message: "Login successfully.", user: user });
  }

  await createUser(userDetails);

  return res
    .status(200)
    .json({ message: "User created successfully.", user: userDetails });
}
