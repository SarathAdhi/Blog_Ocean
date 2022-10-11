import TextArea from "@components/TextArea";
import { SlideOver } from "@elements/SlideOver";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import axios from "@lib/axios";
import React, { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";
import { CommentBox } from "./components/CommentBox";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  contentId: Content["_id"];
  commentId: Content["comment"];
};

const handleSubmit = async (commentId: Content["comment"], comment: string) => {
  await axios.post(`/content/comment/${commentId}`, {
    comment,
  });
};

export const CommentSection: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  commentId,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Content["comment"] | null>(null);

  const fetchComments = useCallback(async () => {
    const data: Content["comment"] = await axios.get(
      `/content/comment/${commentId}`
    );

    setComments(data);
  }, [commentId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!comments) return null;

  const { comments: _comments } = comments;

  return (
    <SlideOver title="Comments" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative w-full h-full flex flex-col justify-between">
        <div className="w-full px-3 flex flex-col gap-2 pb-5 overflow-auto divide-y-2">
          {_comments?.map((comment) => (
            <CommentBox
              key={comment._id}
              commentId={comments._id}
              fetchComments={fetchComments}
              {...comment}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <TextArea
            rows={4}
            value={comment}
            placeholder="Add a comment. Click ctrl + Enter to submit."
            onChange={({ target }) => setComment(target.value)}
            onKeyUp={(e) => {
              if (e.ctrlKey && e.key === "Enter")
                handleSubmit(commentId, comment).then(() => {
                  fetchComments();
                  setComment("");
                });
            }}
          />

          <button
            onClick={() =>
              handleSubmit(commentId, comment).then(() => {
                fetchComments();
                setComment("");
              })
            }
          >
            <PaperAirplaneIcon className="w-6 h-6 rotate-90" />
          </button>
        </div>
      </div>
    </SlideOver>
  );
};
