import LoadingPage from "@components/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios, { AxiosResponse } from "@lib/axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";
import { UserSection } from "@modules/content/UserSection";
import { NextPage } from "next";
import { ErrorPage } from "@components/ErrorPage";
import { formatSeoDescription } from "@utils/format";
import { Heading } from "@chakra-ui/react";
import { MarkdownText } from "@modules/content/MarkdownText";
import { CommentSection } from "@modules/content/CommentSection";
import { ContentActionButtons } from "@modules/content/components/ContentActionButtons";

const ViewContentPage: NextPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCommentSectionOpen, setIsCommentSectionOpen] =
    useState<boolean>(false);

  const { id } = router.query;

  const contentId = id && (id[0] as string);

  const fetchContent = useCallback(async (_contentId: Content["_id"]) => {
    const data: Content & AxiosResponse = await axios.get(
      `/content?id=${_contentId}`
    );

    setContent(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (contentId) fetchContent(contentId);
  }, [fetchContent, contentId]);

  if (!contentId || isLoading) return <LoadingPage />;

  if (!content)
    return <ErrorPage title="Requested Content not found" error="404" />;

  const { title, description, owner, likes, comment } = content;

  const seo = {
    title: `${title} | By ${owner.name}`,
    description: formatSeoDescription(description),
    author: owner.name,
    publishTime: content.createdAt,
  };

  return (
    <PageLayout
      {...seo}
      className="flex flex-col items-center gap-5 box-border"
      RightSideBar={
        <UserSection
          className="col-span-4 xl:col-span-3 hidden lg:flex py-5 px-3 sticky top-0 w-full h-screen border-l-[1.5px] border-gray-400/30"
          {...content}
          fetchContent={() => fetchContent(contentId)}
          currentContent={content._id}
          showUserContent
        />
      }
    >
      <UserSection
        className="flex lg:hidden p-5 w-full rounded-lg bg-white"
        {...content}
        fetchContent={() => fetchContent(contentId)}
      />

      <div className="w-full flex flex-col gap-10">
        <Heading as="h2" size={{ base: "lg", sm: "xl", lg: "2xl" }}>
          {title}
        </Heading>

        <MarkdownText description={description} />
      </div>

      <CommentSection
        contentId={id[0]}
        commentId={comment}
        isOpen={isCommentSectionOpen}
        setIsOpen={setIsCommentSectionOpen}
      />

      <ContentActionButtons
        id={id[0]}
        likes={likes}
        setContent={setContent}
        setIsCommentSectionOpen={setIsCommentSectionOpen}
      />
    </PageLayout>
  );
};

export default ViewContentPage;
