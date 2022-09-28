import type { NextApiRequest, NextApiResponse } from "next";
import {
  getUserByEmail,
  getUserById,
  updateUserProfile,
  userFilter,
} from "@apis/user";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);
  console.log(isAuth);

  if (!isAuth) return res.status(401).json({ error: "Invalid token." });

  const { id } = req.query;

  const userDetails = user as User;

  const userInfo = await getUserByEmail(userDetails.email as string);

  if (userInfo?._id) {
    const filter = { followers: userInfo._id };
    const isUserFollowing = await userFilter(filter);

    // For following the user
    if (isUserFollowing.length === 0) {
      const update = { $push: { followers: userInfo._id } };

      await updateUserProfile(id as string, update);
    }
    // For unfollowing the user
    else {
      const update = { $pull: { followers: userInfo._id } };

      await updateUserProfile(id as string, update);
    }

    const userProfile = await getUserById(id as string);

    return res.status(200).json(userProfile);
  }

  return res.status(404).json({ error: "No user found" });
}
