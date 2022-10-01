import { Spinner } from "@chakra-ui/react";
import React from "react";
import { Content } from "types/Content";
import { ContentCard } from "./components/ContentCard";

type Props = {
  contents: Content[];
  isLoading: boolean;
};

export const HomeComponent: React.FC<Props> = ({ contents, isLoading }) => {
  return (
    <div className="grid gap-4">
      {contents.map((content) => (
        <ContentCard key={content._id} {...content} />
      ))}
    </div>
  );
};
