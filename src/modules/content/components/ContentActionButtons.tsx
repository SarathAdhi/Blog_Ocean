import React, { useEffect } from "react";
import { ChatIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { userStore } from "@utils/store";
import clsx from "clsx";
import {
  Box,
  Divider,
  ScaleFade,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Content } from "types/Content";
import axios from "@lib/axios";

type Props = {
  id: string;
  setContent: (content: Content) => void;
  likes: Content["likes"];
  setIsCommentSectionOpen: (isOpen: boolean) => void;
};

const handleUserLike = async (
  id: Content["_id"],
  setContent: (content: Content) => void
) => {
  const data: Content = await axios.get(`/content/like/${id}`);
  setContent(data);
};

export const ContentActionButtons: React.FC<Props> = ({
  id,
  setContent,
  likes,
  setIsCommentSectionOpen,
}) => {
  const { user } = userStore();
  const isLiked = likes.some((like) => like._id === user._id);

  const { isOpen, onToggle, onClose } = useDisclosure();

  useEffect(() => {
    let pre = 0;

    document.addEventListener("scroll", (e) => {
      const scrollY = Math.round(window.scrollY);

      if (scrollY > 80 && pre < scrollY) {
        onClose();
      } else {
        onToggle();
      }

      pre = scrollY;
    });
  }, []);

  return (
    <ScaleFade
      initialScale={1}
      in={isOpen}
      className="flex items-center justify-center"
    >
      <Box className="w-auto py-2 px-3 flex items-center justify-around gap-5 bg-white rounded-xl border-[1px] fixed bottom-16 md:bottom-2">
        <button
          className={clsx(
            "flex items-center gap-1",
            isLiked ? "text-gray-600" : "text-gray-300"
          )}
          onClick={() => handleUserLike(id, setContent)}
        >
          <ThumbUpIcon className="w-7 h-7" />

          <span className="font-medium">{likes.length}</span>
        </button>

        <Stack direction="row" h="20px">
          <Divider orientation="vertical" bgColor={"gray.500"} />
        </Stack>

        <button onClick={() => setIsCommentSectionOpen(true)}>
          <ChatIcon className="w-7 h-7 text-gray-600" />
        </button>
      </Box>
    </ScaleFade>
  );
};
