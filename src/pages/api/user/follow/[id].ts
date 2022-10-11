import type { NextApiRequest, NextApiResponse } from "next";
import { getUserById, updateUserProfile, userFilter } from "@apis/user";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);

  if (!isAuth)
    return res.status(401).json({ error: "Please Login to continue" });

  const { id } = req.query;

  const userInfo = user as User;

  if (userInfo?._id) {
    const filter = { followers: userInfo._id };
    const isUserFollowing = await userFilter(filter);

    console.log(isUserFollowing);

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
