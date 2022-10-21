import { useCallbackRef } from "@chakra-ui/react";
import { ErrorPage } from "@components/ErrorPage";
import LoadingPage from "@components/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios, { AxiosResponse } from "@lib/axios";
import { CreateContentForm } from "@modules/content/CreateContentForm";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Content } from "types/Content";

const EditContent = () => {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const id = `${router.query.id}`;

  const fetchContent = useCallbackRef(
    async (id: Content["_id"]) => {
      const data: Content & AxiosResponse = await axios.get(
        `/content?id=${id}`
      );

      setContent(data);
      setIsLoading(false);
    },
    [id]
  );

  useEffect(() => {
    if (id) fetchContent(id);
  }, [fetchContent]);

  if (!id || isLoading) return <LoadingPage />;

  if (!content)
    return <ErrorPage title="Requested Content not found" error="404" />;

  const { title, description, _id } = content;

  return (
    <PageLayout title="">
      <CreateContentForm
        contentId={_id}
        title={title}
        description={description}
      />
    </PageLayout>
  );
};

export default EditContent;
