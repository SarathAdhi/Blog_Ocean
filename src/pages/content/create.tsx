import withAuth from "@hoc/withAuth";
import PageLayout from "@layouts/PageLayout";
import { CreateContentForm } from "@modules/content/CreateContentForm";
import { NextPage } from "next";
import React from "react";

const CreatePage: NextPage = () => {
  return (
    <PageLayout title="Create" className="flex flex-col gap-10">
      <CreateContentForm />
    </PageLayout>
  );
};

export default withAuth(CreatePage);
