import LoadingPage from "@elements/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios, { AxiosResponse } from "@lib/axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";
import { Divider, Heading, Stack } from "@chakra-ui/react";
import { MarkdownText } from "@modules/content/MarkdownText";
import { UserSection } from "@modules/content/UserSection";
import { NextPage } from "next";
import { ErrorPage } from "@elements/ErrorPage";
import { ChatIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { userStore } from "@utils/store";
import clsx from "clsx";
import { CommentSection } from "@modules/content/CommentSection";

const handleUserLike = async (
  id: Content["_id"],
  setContent: (content: Content) => void
) => {
  const data: Content = await axios.get(`/content/like/${id}`);
  setContent(data);
};

const ViewContentPage: NextPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCommentSectionOpen, setIsCommentSectionOpen] =
    useState<boolean>(false);

  const { user } = userStore();

  const { id } = router.query;

  const fetchContent = useCallback(
    async (contentId: Content["_id"]) => {
      const data: Content & AxiosResponse = await axios.get(
        `/content?id=${contentId}`
      );

      setContent(data);
      setIsLoading(false);
    },
    [id]
  );

  useEffect(() => {
    if (id) fetchContent(id[0]);
  }, [fetchContent]);

  if (!id || isLoading) return <LoadingPage />;

  if (!content)
    return <ErrorPage title="Requested Content not found" error="404" />;

  const { title, description, likes, comments } = content;

  console.log(content);

  const isLiked = likes.some((like) => like._id === user._id);

  return (
    <PageLayout
      title={title}
      className="flex flex-col items-center gap-5 box-border"
      RightSideBar={
        <UserSection
          className="col-span-4 xl:col-span-3 hidden lg:flex py-5 px-3 sticky top-0 w-full h-screen border-l-[1.5px] border-gray-400/30"
          {...content}
          fetchContent={() => fetchContent(id[0])}
        />
      }
    >
      <UserSection
        className="flex lg:hidden p-5 w-full rounded-lg bg-white border border-gray-400"
        {...content}
        fetchContent={() => fetchContent(id[0])}
      />

      <div className="w-full flex flex-col gap-10">
        <Heading
          as="h2"
          size={{ base: "lg", sm: "xl", lg: "2xl" }}
          textDecoration={"underline"}
        >
          {title}
        </Heading>

        <MarkdownText description={description} />
      </div>

      <div className="py-2 px-3 flex items-center justify-around gap-5 bg-white rounded-xl border-[1px] fixed bottom-16 md:bottom-2">
        <button
          className={clsx(
            "flex items-center gap-1",
            isLiked ? "text-gray-600" : "text-gray-300"
          )}
          onClick={() => handleUserLike(id[0], setContent)}
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
      </div>

      <CommentSection
        contentId={id[0]}
        comments={comments}
        setContent={setContent}
        isOpen={isCommentSectionOpen}
        setIsOpen={setIsCommentSectionOpen}
      />
    </PageLayout>
  );
};

export default ViewContentPage;
