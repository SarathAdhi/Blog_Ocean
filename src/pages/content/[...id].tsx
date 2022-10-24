import LoadingPage from "@components/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios, { AxiosResponse } from "@lib/axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";
import { Heading } from "@chakra-ui/react";
import { MarkdownText } from "@modules/content/MarkdownText";
import { UserSection } from "@modules/content/UserSection";
import { NextPage } from "next";
import { ErrorPage } from "@components/ErrorPage";
import { CommentSection } from "@modules/content/CommentSection";
import { ContentActionButtons } from "@modules/content/components/ContentActionButtons";
import { formatSeoDescription } from "@utils/format";

const ViewContentPage: NextPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCommentSectionOpen, setIsCommentSectionOpen] =
    useState<boolean>(false);

  const { id } = router.query;

  const fetchContent = useCallback(async (contentId: Content["_id"]) => {
    const data: Content & AxiosResponse = await axios.get(
      `/content?id=${contentId}`
    );

    setContent(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id) fetchContent(id[0]);
  }, [fetchContent, id]);

  if (!id || isLoading) return <LoadingPage />;

  if (!content)
    return <ErrorPage title="Requested Content not found" error="404" />;

  const { title, description, likes, comment, owner } = content;

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
          fetchContent={() => fetchContent(id[0])}
          currentContent={content._id}
          showUserContent
        />
      }
    >
      <UserSection
        className="flex lg:hidden p-5 w-full rounded-lg bg-white border border-gray-400"
        {...content}
        fetchContent={() => fetchContent(id[0])}
      />

      <div className="w-full flex flex-col gap-10 pb-10">
        <Heading as="h2" size={{ base: "lg", sm: "xl", lg: "2xl" }}>
          {title}
        </Heading>

        <MarkdownText description={description} />
      </div>

      <ContentActionButtons
        id={id[0]}
        likes={likes}
        setContent={setContent}
        setIsCommentSectionOpen={setIsCommentSectionOpen}
      />

      <CommentSection
        contentId={id[0]}
        commentId={comment}
        isOpen={isCommentSectionOpen}
        setIsOpen={setIsCommentSectionOpen}
      />
    </PageLayout>
  );
};

export default ViewContentPage;
