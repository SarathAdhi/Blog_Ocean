import PageLayout from "@layouts/PageLayout";
import Error from "next/error";
import React from "react";

type Props = {
  title: string;
  error: string;
};

export const ErrorPage: React.FC<Props> = ({ title, error }) => {
  return (
    <PageLayout title={`${error} Error`}>
      <Error title={title} statusCode={parseInt(error)} withDarkMode={false} />
    </PageLayout>
  );
};
