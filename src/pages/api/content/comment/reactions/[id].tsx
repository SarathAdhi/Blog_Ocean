import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "types/User";
import { validateToken } from "@backend/middleware/validate-token";
import { contentFilter, getContentById } from "@backend/apis/content";
import ContentModel from "@backend/models/content.model";
import { Content } from "types/Content";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isAuth, user } = await validateToken(req.headers.authorization!);

  if (!isAuth)
    return res.status(401).json({ error: "Please Login to continue" });

  const { id } = req.query;
  const { emoji, contentId } = req.body;

  const userInfo = user as User;

  if (userInfo?._id) {
    const filter = {
      _id: contentId,
      "comments._id": id,
    };

    const _contentDetails = await contentFilter(filter);

    const contentDetails = _contentDetails[0] as Content;

    const comments = contentDetails?.comments;

    const getComment = comments?.find(
      (comment) => String(comment._id) === String(id)
    );

    const isUserReacted = getComment?.reactions.find(
      (reaction) => String(reaction.user) === String(userInfo._id)
    );

    const reactedEmoji = isUserReacted?.emoji;

    const reaction = {
      user: userInfo._id,
      emoji,
    };

    // For reacting to the content comment
    if (!isUserReacted) {
      const updateLikes = {
        $push: { "comments.$.reactions": reaction },
      };

      await ContentModel.updateOne(filter, updateLikes);
    }
    // For new emoji reaction
    else if (reactedEmoji !== emoji && isUserReacted) {
      const updateLikes = {
        $set: { "comments.$.reactions": reaction },
      };

      await ContentModel.updateOne(filter, updateLikes);
    }
    // For undo comment reaction
    else {
      const updateLikes = {
        $pull: { "comments.$.reactions": reaction },
      };

      await ContentModel.updateOne(filter, updateLikes);
    }

    const content = await getContentById(contentId as string);

    return res.status(200).json(content);
  }

  return res.status(404).json({ error: "No user found" });
}
