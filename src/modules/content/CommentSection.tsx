import TextArea from "@elements/TextArea";
import { SlideOver } from "@components/SlideOver";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import axios from "@lib/axios";
import React, { useCallback, useEffect, useState } from "react";
import { Content, Reaction } from "types/Content";
import { CommentBox } from "./components/CommentBox";
import Modal from "@components/Modal";
import { H5, P } from "@components/elements/Text";
import LinkedItem from "@components/elements/LinkedItem";
import Image from "next/image";
import { Box, Text } from "@chakra-ui/react";

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
  const [showReactions, setShowReactions] = useState<{
    reactions: Reaction[];
    isOpen: boolean;
  }>({ reactions: [], isOpen: false });

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
    <>
      <SlideOver title="Comments" isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="relative w-full h-full flex flex-col justify-between">
          <div className="w-full px-3 flex flex-col gap-2 pb-5 overflow-auto divide-y-2">
            {_comments?.map((comment) => (
              <CommentBox
                key={comment._id}
                commentId={comments._id}
                fetchComments={fetchComments}
                onClick={() => {
                  setShowReactions({
                    reactions: comment.reactions,
                    isOpen: !showReactions.isOpen,
                  });
                }}
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

      <Modal
        title="Reactions"
        isOpen={showReactions.isOpen}
        setIsOpen={(value) =>
          setShowReactions({ ...showReactions, isOpen: value })
        }
      >
        <div className="w-full grid gap-4 pb-5">
          {showReactions.reactions.map((reaction) => (
            <div
              key={reaction._id}
              className="flex items-center justify-between gap-2"
            >
              <LinkedItem
                href={`/profile/${reaction.user.username}`}
                className="w-[90%] flex items-center gap-2"
                title={`${reaction.user.username}'s Profile`}
              >
                <Box className="relative w-10 h-10">
                  <Image
                    src={reaction.user.image}
                    layout="fill"
                    className="rounded-full"
                    referrerPolicy={"no-referrer"}
                    alt={reaction.user.username}
                  />
                </Box>

                <Box>
                  <H5>{reaction.user.username}</H5>

                  <Text noOfLines={1} color={"gray.400"} className="-mt-1">
                    {reaction.user.bio}
                  </Text>
                </Box>
              </LinkedItem>

              <P className="!text-xl">{reaction.emoji}</P>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
