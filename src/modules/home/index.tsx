import { LoadingSkeleton } from "@components/LoadingSkeleton";
import React from "react";
import { Content } from "types/Content";
import { ContentCard } from "@components/ContentCard";
import { H3, P } from "@components/elements/Text";
import LinkedItem from "@components/elements/LinkedItem";

type Props = {
  contents: Content[];
  isLoading: boolean;
  searchQuery?: string;
};

export const HomeComponent: React.FC<Props> = ({
  contents,
  isLoading,
  searchQuery = "",
}) => {
  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <LoadingSkeleton isLoaded={!isLoading} className="w-full grid gap-1">
      {filteredContents.map((content) => (
        <ContentCard key={content._id} {...content} />
      ))}

      {filteredContents.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center gap-2">
          <LinkedItem
            href="/"
            className="bg-red-500 text-white px-2 py-1 rounded font-semibold"
          >
            Clear search
          </LinkedItem>

          <H3 className="text-center">{"No search result found ;("}</H3>
        </div>
      )}
    </LoadingSkeleton>
  );
};
