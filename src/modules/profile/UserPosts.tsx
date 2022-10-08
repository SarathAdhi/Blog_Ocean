import { H1, P } from "@components/Text";
import { LoadingSkeleton } from "@elements/LoadingSkeleton";
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
  const [content, setContent] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchContent = useCallback(async () => {
    const data: Content[] = await axios.get(`/content/${userId}`);
    setContent(data);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <LoadingSkeleton isLoaded={!isLoading} className="grid">
      {content.length !== 0
        ? content.map((content) => (
            <ContentCard key={content._id} {...content} />
          ))
        : !isLoading && <OopsMessage />}
    </LoadingSkeleton>
  );
};
