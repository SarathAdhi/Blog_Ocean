import { H4 } from "@components/Text";
import LoadingPage from "@elements/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Content } from "types/Content";
import { Heading } from "@chakra-ui/react";
import MarkdownText from "@modules/content/MarkdownText";
import UserSection from "@modules/content/UserSection";

const ViewContent = () => {
  const router = useRouter();
  const { id } = router.query;

  const [content, setContent] = useState<Content | null>(null);

  const contentId = id && id[0];

  const fetchContent = async () => {
    const data: Content = await axios.get(`/content?id=${contentId}`);
    setContent(data);
  };

  useEffect(() => {
    fetchContent();
  }, [id]);

  if (!id) return <></>;

  if (!content) return <LoadingPage />;

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

export default ViewContent;
