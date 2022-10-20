import { Heading } from "@chakra-ui/react";
import LinkedItem from "@elements/LinkedItem";
import { Label, P } from "@elements/Text";
import { userStore } from "@utils/store";
import Image from "next/image";
import React from "react";
import { Content, Reaction } from "types/Content";
import { User } from "types/User";
import { EmojiPopOver } from "./EmojiPopOver";

// const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type Props = {
  owner: User;
  commentId: Content["comment"]["_id"];
  _id: Content["_id"];
  reactions: Reaction[];
  comment: string;
  createdAt: string;
  fetchComments: () => void;
};

export const CommentBox: React.FC<Props> = ({
  commentId,
  _id,
  owner,
  comment,
  reactions,
  createdAt,
  fetchComments,
}) => {
  const date = `${new Date(createdAt)}`.split(" ").slice(0, 4).join(" ");
  const time = `${new Date(createdAt)}`.split(" ").slice(4, 5).join(" ");

  const {
    user: { _id: userId },
  } = userStore();

  const { name, username, image, bio } = owner;

  const isUserReacted = reactions.find((react) => react.user === userId);

  return (
    <div className="w-full flex flex-col gap-2 pt-4 first:!pt-0">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10">
          <Image
            src={image}
            layout="fill"
            className="rounded-full"
            alt={username || name}
          />
        </div>

        <div className="w-9/12 flex flex-col items-start">
          {username ? (
            <LinkedItem href={`/profile/${username}`} className="!truncate">
              {username}
            </LinkedItem>
          ) : (
            <P className="!truncate">{name}</P>
          )}

          <Heading
            as="p"
            noOfLines={1}
            className="!text-xs sm:!text-sm !font-medium !text-gray-500 -mt-0.5"
          >
            {bio}
          </Heading>
        </div>
      </div>

      <div className="grid gap-2">
        <P className="!text-base whitespace-pre-wrap">{comment}</P>

        <div className="flex items-center justify-between">
          <EmojiPopOver
            isUserReacted={isUserReacted}
            commentId={commentId}
            commentCollectionId={_id}
            fetchComments={fetchComments}
          />

          <Label className="text-end flex items-center gap-x-2 flex-wrap justify-end">
            <span>{date}</span>
            <span>{time}</span>
          </Label>
        </div>
      </div>
    </div>
  );
};
