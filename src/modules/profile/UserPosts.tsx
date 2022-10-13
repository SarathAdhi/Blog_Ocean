import { H1, P } from "@elements/Text";
import { LoadingSkeleton } from "@components/LoadingSkeleton";
import { TrashIcon } from "@heroicons/react/outline";
import axios, { AxiosResponse } from "@lib/axios";
import { ContentCard } from "@components/ContentCard";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Content } from "types/Content";
import { User } from "types/User";
import { userStore } from "@utils/store";
import { Heading } from "@chakra-ui/react";
import { AlertChakra } from "@components/AlertChakra";

type Props = {
  userId: User["_id"];
};

const OopsMessage = ({ isUserProfile }: { isUserProfile: boolean }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <H1 className="text-gray-500">Oops! No content found</H1>
    <P className="text-gray-500">
      {isUserProfile ? "You have" : "This user has"} not posted any content yet.
    </P>
  </div>
);

const handleDelete = async (
  contentId: Content["_id"],
  fetchContent: () => void
) => {
  const data: AxiosResponse = await axios.delete(`/content/${contentId}`);
  toast.success(data.message, { duration: 2000 });

  fetchContent();
};

export const UserPosts: React.FC<Props> = ({ userId }) => {
  const { user } = userStore();

  const [content, setContent] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showAlertBox, setShowAlertBox] = useState(false);

  const fetchContent = useCallback(async () => {
    const data: Content[] = await axios.get(`/content/${userId}`);
    setContent(data);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const isUserProfile = user._id === userId;

  return (
    // Grid and overflow-hidden is required for responsive design
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading size={{ base: "lg", lg: "xl" }}>Contents</Heading>

        {content.length !== 0 && isUserProfile && (
          <button
            className="bg-red-600 p-1 rounded-full"
            onClick={() => {
              setShowAlertBox((pre) => !pre);
              setShowDeleteButton((pre) => !pre);
            }}
          >
            <TrashIcon className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {content.length !== 0 && (
        <AlertChakra
          title="NOTE"
          isOpen={showAlertBox}
          setIsOpen={setShowAlertBox}
        >
          Clicking on the delete button will delete your post permanently.
        </AlertChakra>
      )}

      <LoadingSkeleton isLoaded={!isLoading} className="grid">
        {content.length !== 0
          ? content.map((content) => (
              <div
                key={content._id}
                className="relative w-full flex items-start gap-5 overflow-hidden"
              >
                <ContentCard {...content} />

                {showDeleteButton && (
                  <button
                    className="bg-gray-300 w-8 h-8 mt-5 p-1 rounded-full grid place-content-center"
                    onClick={() => handleDelete(content._id, fetchContent)}
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                )}
              </div>
            ))
          : !isLoading && <OopsMessage isUserProfile={isUserProfile} />}
      </LoadingSkeleton>
    </div>
  );
};
