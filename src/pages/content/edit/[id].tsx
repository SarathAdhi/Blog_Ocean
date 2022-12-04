import { ErrorPage } from "@components/ErrorPage";
import LoadingPage from "@components/loading/LoadingPage";
import withAuth from "@hoc/withAuth";
import PageLayout from "@layouts/PageLayout";
import axios, { AxiosResponse } from "@lib/axios";
import { CreateContentForm } from "@modules/content/CreateContentForm";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import { Content } from "types/Content";

const EditContent = () => {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const id = router.query.id as string;

  const fetchContent = useCallback(
    async (id: Content["_id"]) => {
      const data: Content & AxiosResponse = await axios.get(
        `/content?id=${id}&isPrivate=true`
      );

      setContent(data);
    },
    [id]
  );

  useEffect(() => {
    if (id)
      fetchContent(id)
        .catch(({ error }) => setError(error))
        .finally(() => setIsLoading(false));
  }, [fetchContent]);

  if (!id || isLoading) return <LoadingPage />;

  if (!!error) return <ErrorPage title={error} error="404" />;

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

export default withAuth(EditContent);
