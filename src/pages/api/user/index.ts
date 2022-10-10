import type { NextApiRequest, NextApiResponse } from "next";
import {
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
  updateUserProfile,
} from "@apis/user";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);
  const userDetails = user as User;

  // if (!isAuth) return res.status(401).json({ error: "Please Login to continue" });

  const method = req.method;

  switch (method) {
    case "GET":
      const { id, username: name } = req.query;

      if (id) {
        const user = await getUserById(id as string);
        return res.status(200).json(user);
      } else if (name) {
        const user = await getUserByUsername(name as string);
        return res.status(200).json(user);
      }

      const users: User[] = await getUsers();
      return res.status(200).json(users);

    case "PUT":
      const { username } = req.body;
      const isUsernameExist = await getUserByUsername(username);

      const email = isUsernameExist?.email;
      const isUserProfile = email === userDetails.email;

      if (!isUsernameExist || isUserProfile) {
        const userData: User = await getUserByEmail(userDetails.email);

        await updateUserProfile(userData._id, req.body);

        return res
          .status(200)
          .json({ message: "Profile updated successfully.", error: "" });
      }

      return res.status(409).json({ error: "Username already exists." });
  }
}
