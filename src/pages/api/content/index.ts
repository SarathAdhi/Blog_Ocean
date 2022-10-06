import type { NextApiRequest, NextApiResponse } from "next";
import { getContentById, getContents } from "@backend/apis/content";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (id) {
    try {
      const content = await getContentById(id as string);
      return res.status(200).json(content);
    } catch (error: any) {
      const msg = error?.message as string;

      if (msg.includes("Cast to ObjectId failed for value"))
        return res
          .status(404)
          .json({ error: "Content doesn't exist. Invalid url" });

      return res.status(404).json({ error });
    }
  }

  try {
    const contents = await getContents();
    return res.status(200).json(contents);
  } catch (error: any) {
    return res.status(404).json({ error });
  }
}
