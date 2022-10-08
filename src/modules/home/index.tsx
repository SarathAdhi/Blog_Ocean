import { LoadingSkeleton } from "@elements/LoadingSkeleton";
import React from "react";
import { Content } from "types/Content";
import { ContentCard } from "./components/ContentCard";

type Props = {
  contents: Content[];
  isLoading: boolean;
};

export const HomeComponent: React.FC<Props> = ({ contents, isLoading }) => {
  return (
    <LoadingSkeleton isLoaded={!isLoading} className="w-full grid gap-1">
      {contents.map((content) => (
        <ContentCard key={content._id} {...content} />
      ))}
    </LoadingSkeleton>
  );
};
