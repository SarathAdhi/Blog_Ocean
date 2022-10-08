import React from "react";
import { Skeleton, Spinner } from "@chakra-ui/react";
import { Component } from "types/Page";

type Props = {
  isLoaded?: boolean;
};

export const LoadingSkeleton: React.FC<Props & Component> = ({
  isLoaded,
  className,
  children,
}) => {
  return (
    <>
      {!isLoaded && (
        <div className="!w-full h-full max-h-40 flex items-center justify-center">
          <Spinner width={30} height={30} thickness="2px" speed="0.65s" />
        </div>
      )}

      <Skeleton isLoaded={isLoaded} className={className} fadeDuration={1}>
        {children}
      </Skeleton>
    </>
  );
};
