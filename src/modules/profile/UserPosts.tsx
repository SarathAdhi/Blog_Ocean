import { Spinner } from "@chakra-ui/react";
import { H1, P } from "@components/Text";
import { ErrorPage } from "@elements/ErrorPage";
import axios from "@lib/axios";
import { ContentCard } from "@modules/home/components/ContentCard";
import React, { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";
import { User } from "types/User";

type Props = {
  userId: User["_id"];
};

const OopsMessage = () => (
  <div className="flex flex-col items-center justify-center gap-2">
    <H1 className="text-gray-500">Oops! No content found</H1>
    <P className="text-gray-500">This user has not posted any content yet.</P>
  </div>
);

export const UserPosts: React.FC<Props> = ({ userId }) => {
  const [content, setContent] = useState<Content[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchContent = useCallback(async () => {
    const data: Content[] = await axios.get(`/content/${userId}`);
    setContent(data);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (isLoading)
    return (
      <Spinner
        className="mx-auto"
        width={30}
        height={30}
        thickness="2px"
        speed="0.65s"
      />
    );

  if (!content) return <ErrorPage title="Something went wrong" error="404" />;

  return (
    <>
      {content.length !== 0 ? (
        content.map((content) => <ContentCard key={content._id} {...content} />)
      ) : (
        <OopsMessage />
      )}
    </>
  );
};
