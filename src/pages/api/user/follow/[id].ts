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
      const updateFollowers = { $push: { followers: userInfo._id } };
      const updateFollowing = { $push: { following: id } };

      await updateUserProfile(id as string, updateFollowers);
      await updateUserProfile(userInfo._id as string, updateFollowing);
    }
    // For unfollowing the user
    else {
      const updateFollowers = { $pull: { followers: userInfo._id } };
      const updateFollowing = { $pull: { following: id } };

      await updateUserProfile(id as string, updateFollowers);
      await updateUserProfile(userInfo._id as string, updateFollowing);
    }

    const userProfile = await getUserById(id as string);

    return res.status(200).json(userProfile);
  }

  return res.status(404).json({ error: "No user found" });
}
