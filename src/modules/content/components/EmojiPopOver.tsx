import React, { useState } from "react";
import { ThumbUpIcon } from "@heroicons/react/outline";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { EMOJIS } from "@utils/contants";
import { Content, Reaction } from "types/Content";
import axios from "@lib/axios";

type Props = {
  isUserReacted: Reaction | undefined;
  commentId: Content["comment"]["_id"];
  commentCollectionId: Content["_id"];
  fetchComments: () => void;
};

export const EmojiPopOver: React.FC<Props> = ({
  isUserReacted,
  commentId,
  commentCollectionId,
  fetchComments,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const onEmojiClick = async (emoji: string) => {
    setShowEmojiPicker(false);

    await axios.post(`/content/comment/reactions/${commentId}`, {
      commentCollectionId,
      emoji,
    });

    fetchComments();
  };

  const removeEmoji = async () => {
    setShowEmojiPicker(false);

    await axios.post(`/content/comment/reactions/${commentId}`, {
      commentCollectionId,
      emoji: isUserReacted?.emoji,
    });

    fetchComments();
  };

  return (
    <Popover
      isOpen={showEmojiPicker}
      onClose={() => setShowEmojiPicker(false)}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          {isUserReacted ? (
            <span className="text-xl">{isUserReacted.emoji}</span>
          ) : (
            <ThumbUpIcon className="rounded-full w-6 h-6 text-gray-400" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="!w-auto  !shadow-md !shadow-black/70">
        <PopoverArrow />

        <PopoverBody p={1}>
          <div className="flex">
            {isUserReacted && (
              <Button
                p={0}
                fontSize={"2xl"}
                bgColor={"transparent"}
                onClick={removeEmoji}
              >
                {"🚫"}
              </Button>
            )}

            {EMOJIS.map(({ key, emoji }) => (
              <Button
                key={key}
                p={0}
                fontSize={"2xl"}
                bgColor={"transparent"}
                onClick={() => onEmojiClick(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
