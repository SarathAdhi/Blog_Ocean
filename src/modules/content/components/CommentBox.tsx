import LinkedItem from "@components/LinkedItem";
import { Label, P } from "@components/Text";
import axios from "@lib/axios";
import { userStore } from "@utils/store";
import Image from "next/image";
import React, { useState } from "react";
import { Content, Reaction } from "types/Content";
import { User } from "types/User";
import { EmojiHappyIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type Props = {
  owner: User;
  commentId: Content["comments"][0]["_id"];
  contentId: Content["_id"];
  reactions: Reaction[];
  comment: string;
  createdAt: string;
  setContent: (content: Content) => void;
};

export const CommentBox: React.FC<Props> = ({
  commentId,
  contentId,
  owner,
  comment,
  reactions,
  createdAt,
  setContent,
}) => {
  const date = `${new Date(createdAt)}`.split(" ").slice(0, 4).join(" ");
  const time = `${new Date(createdAt)}`.split(" ").slice(4, 5).join(" ");

  const {
    user: { _id },
  } = userStore();

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const { username, image, bio } = owner;

  const isUserReacted = reactions.find((react) => react.user === _id);

  const onEmojiClick = async (event: any, emojiObject: any) => {
    const data: Content = await axios.post(
      `/content/comment/reactions/${commentId}`,
      {
        contentId,
        ...emojiObject,
      }
    );

    setContent(data);
    setShowEmojiPicker(false);
  };

  const removeEmoji = async () => {
    const data: Content = await axios.post(
      `/content/comment/reactions/${commentId}`,
      {
        contentId,
        emoji: isUserReacted?.emoji,
      }
    );

    setContent(data);
    setShowEmojiPicker(false);
  };

  return (
    <div className="w-full flex flex-col gap-2 pt-4 first:!pt-0">
      <LinkedItem
        href={`/profile/${username}`}
        className="flex items-start gap-2"
      >
        <div className="relative w-10 h-10">
          <Image src={image} layout="fill" className="rounded-full" />
        </div>

        <div className="w-9/12">
          <P className="!truncate">{username}</P>
          <Label className="!truncate">{bio}</Label>
        </div>
      </LinkedItem>

      <div className="grid gap-2">
        <P className="!text-base whitespace-pre-wrap">{comment}</P>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
              }}
            >
              {isUserReacted ? (
                <span className="text-xl">{isUserReacted.emoji}</span>
              ) : (
                <EmojiHappyIcon className="rounded-full w-6 h-6 text-gray-500" />
              )}
            </button>

            {isUserReacted && (
              <button onClick={removeEmoji} className="block text-white">
                <XIcon className="w-5 h-5 text-red-600" />
              </button>
            )}
          </div>

          <Label className="text-end flex items-center gap-x-2 flex-wrap justify-end">
            <span>{date}</span>
            <span>{time}</span>
          </Label>
        </div>
      </div>

      {showEmojiPicker && (
        <Picker
          searchPlaceholder="Search for emojies"
          pickerStyle={{
            width: "100%",
            bottom: "0px",
            backgroundColor: "white",
            zIndex: "100",
          }}
          onEmojiClick={onEmojiClick}
        />
      )}
    </div>
  );
};
