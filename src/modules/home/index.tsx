import { Spinner } from "@chakra-ui/react";
import React from "react";
import { Content } from "types/Content";
import { ContentCard } from "./components/ContentCard";

type Props = {
  contents: Content[];
  isLoading: boolean;
};

export const HomeComponent: React.FC<Props> = ({ contents, isLoading }) => {
  if (isLoading)
    return (
      <div className="!w-full h-full max-h-40 flex items-center justify-center">
        <Spinner width={30} height={30} thickness="2px" speed="0.65s" />
      </div>
    );

  return (
    <div className="grid gap-4">
      {contents.map((content) => (
        <ContentCard key={content._id} {...content} />
      ))}
    </div>
  );
};
