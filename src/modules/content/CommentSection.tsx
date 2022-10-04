import LinkedItem from "@components/LinkedItem";
import { Label, P } from "@components/Text";
import TextArea from "@components/TextArea";
import { SlideOver } from "@elements/SlideOver";
import axios from "@lib/axios";
import Image from "next/image";
import React, { useState } from "react";
import { Content, Reaction } from "types/Content";
import { User } from "types/User";
import dynamic from "next/dynamic";
import { EmojiHappyIcon } from "@heroicons/react/solid";
import { userStore } from "@utils/store";
import { XIcon } from "@heroicons/react/outline";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setContent: (content: Content) => void;
  contentId: Content["_id"];
  comments: Content["comments"];
};

const handleSubmit = async (
  contentId: Content["_id"],
  comment: string,
  setContent: (content: Content) => void
) => {
  const data: Content = await axios.post(`/content/comment/${contentId}`, {
    comment,
  });
  setContent(data);
};

type CommentBoxProps = {
  owner: User;
  commentId: Content["comments"][0]["_id"];
  contentId: Content["_id"];
  reactions: Reaction[];
  comment: string;
  createdAt: string;
  setContent: (content: Content) => void;
};

const Comment = ({
  commentId,
  contentId,
  owner,
  comment,
  reactions,
  createdAt,
  setContent,
}: CommentBoxProps) => {
  const date = `${new Date(createdAt)}`.split(" ").slice(0, 4).join(" ");

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
    <div className="grid gap-2 pt-4 first:!pt-0">
      <LinkedItem
        href={`/profile/${username}`}
        className="flex items-start gap-2"
      >
        <div className="relative w-10 h-10">
          <Image src={image} layout="fill" className="rounded-full" />
        </div>

        <div>
          <P>{username}</P>
          <Label className="truncate">{bio}</Label>
        </div>
      </LinkedItem>

      <div className="grid gap-2">
        <P className="!text-base whitespace-pre-wrap">{comment}</P>

        <div className="flex items-center justify-between">
          <div className="group flex items-center gap-1">
            <button
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
              }}
            >
              {isUserReacted ? (
                <span className="text-lg">{isUserReacted.emoji}</span>
              ) : (
                <EmojiHappyIcon className="bg-black rounded-full w-5 h-5 text-[#f8d450]" />
              )}
            </button>

            {isUserReacted && (
              <button
                onClick={removeEmoji}
                className="hidden group-hover:block text-white"
              >
                <XIcon className="w-5 h-5 text-red-600" />
              </button>
            )}
          </div>

          <Label className="text-end">{date}</Label>
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

export const CommentSection: React.FC<Props> = ({
  setContent,
  isOpen,
  setIsOpen,
  contentId,
  comments,
}) => {
  const [comment, setComment] = useState("");

  return (
    <SlideOver title="Comments" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative h-full flex flex-col justify-between">
        <div className="px-3 flex flex-col gap-2 pb-5 overflow-auto divide-y-2">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              contentId={contentId}
              commentId={comment._id}
              setContent={setContent}
              {...comment}
            />
          ))}
        </div>

        <TextArea
          rows={4}
          value={comment}
          placeholder="Add a comment. Click ctrl + Enter to submit."
          onChange={({ target }) => setComment(target.value)}
          onKeyUp={(e) => {
            if (e.ctrlKey && e.key === "Enter")
              handleSubmit(contentId, comment, setContent).finally(() =>
                setComment("")
              );
          }}
        />
      </div>
    </SlideOver>
  );
};
