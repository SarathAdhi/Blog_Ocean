import { H1 } from "@components/Text";
import PageLayout from "@layouts/PageLayout";
import { CreateContentForm } from "@modules/content/CreateContentForm";
import { NextPage } from "next";
import React from "react";

const CreatePage: NextPage = () => {
  return (
    <PageLayout title="Create" className="flex flex-col gap-10">
      <H1 className="italic">Briefly tell us what you have learnt today...</H1>

      <CreateContentForm />
    </PageLayout>
  );
};

export default CreatePage;
