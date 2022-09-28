import LoadingPage from "@elements/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios, { AxiosResponse } from "@lib/axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";
import { Heading } from "@chakra-ui/react";
import { MarkdownText } from "@modules/content/MarkdownText";
import { UserSection } from "@modules/content/UserSection";
import { NextPage } from "next";
import { ErrorPage } from "@elements/ErrorPage";

const ViewContentPage: NextPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = router.query;

  const contentId = id && id[0];

  const fetchContent = useCallback(async () => {
    const data: Content & AxiosResponse = await axios.get(
      `/content?id=${contentId}`
    );

    setContent(data);
    setIsLoading(false);
  }, [contentId]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (!id || isLoading) return <LoadingPage />;

  if (!content)
    return <ErrorPage title="Requested Content not found" error="404" />;

  const { title, description, owner } = content;

  return (
    <PageLayout
      title={title}
      RightSideBar={
        <UserSection
          className="col-span-4 xl:col-span-3 hidden lg:block py-5 px-3 sticky top-0 w-full h-screen border-l-[1.5px] border-gray-400/30"
          {...owner}
        />
      }
      className="flex flex-col gap-5 box-border"
    >
      <UserSection
        className="block lg:hidden p-5 w-full rounded-lg bg-white border border-gray-400"
        {...owner}
      />

      <div className="flex flex-col gap-10">
        <Heading
          as="h2"
          size={{ base: "lg", sm: "xl", lg: "2xl" }}
          textDecoration={"underline"}
        >
          {title}
        </Heading>

        <MarkdownText description={description} />
      </div>
    </PageLayout>
  );
};

export default ViewContentPage;
