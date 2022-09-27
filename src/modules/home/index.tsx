import { Spinner } from "@chakra-ui/react";
import React from "react";
import { Content } from "types/Content";
import { ContentCard } from "./components/ContentCard";

type Props = {
  contents: Content[];
  isLoading: boolean;
};

export const HomeComponent: React.FC<Props> = ({ contents, isLoading }) => {
  // if (isLoading)
  //   return (
  //     <div className="grid place-content-center">
  //       <Spinner
  //         width={10}
  //         height={10}
  //         thickness="4px"
  //         color={"purple.600"}
  //         speed="0.65s"
  //       />
  //     </div>
  //   );

  return (
    <div className="grid gap-4">
      {contents.map((content) => (
        <ContentCard key={content._id} {...content} />
      ))}
    </div>
  );
};
