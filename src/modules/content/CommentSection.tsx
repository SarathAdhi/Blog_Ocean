import TextArea from "@components/TextArea";
import { SlideOver } from "@elements/SlideOver";
import axios from "@lib/axios";
import React, { useState } from "react";
import { Content } from "types/Content";
import { CommentBox } from "./components/CommentBox";

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
      <div className="relative w-full h-full flex flex-col justify-between">
        <div className="w-full px-3 flex flex-col gap-2 pb-5 overflow-auto divide-y-2">
          {comments.map((comment) => (
            <CommentBox
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
