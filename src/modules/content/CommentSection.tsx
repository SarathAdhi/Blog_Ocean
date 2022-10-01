import LinkedItem from "@components/LinkedItem";
import { Label, P } from "@components/Text";
import TextArea from "@components/TextArea";
import { SlideOver } from "@elements/SlideOver";
import axios from "@lib/axios";
import Image from "next/image";
import React, { useState } from "react";
import { Content } from "types/Content";
import { User } from "types/User";

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
  comment: string;
  createdAt: string;
} & User;

const Comment = ({
  username,
  image,
  bio,
  comment,
  createdAt,
}: CommentBoxProps) => {
  const date = `${new Date(createdAt)}`.split(" ").slice(0, 4).join(" ");

  return (
    <div className="grid gap-2 pt-5 first:!pt-0">
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
        <Label className="text-end">{date}</Label>
      </div>
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
      <div className="h-full flex flex-col justify-between">
        <div className="px-3 flex flex-col gap-2 pb-5 overflow-auto divide-y-2">
          {comments.map((comment) => (
            <Comment key={comment._id} {...comment} {...comment.owner} />
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
