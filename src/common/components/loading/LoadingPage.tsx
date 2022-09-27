import React from "react";
import { Spinner } from "@chakra-ui/react";
import clsx from "clsx";
import { Component } from "types/Page";

const LoadingPage: React.FC<Component> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "w-full min-h-screen bg-slate-200 grid place-content-center",
        className
      )}
    >
      <Spinner width={50} height={50} thickness="4px" speed="0.65s" />

      {children}
    </div>
  );
};

export default LoadingPage;
