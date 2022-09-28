import { H1 } from "@components/Text";
import withAuth from "@hoc/withAuth";
import PageLayout from "@layouts/PageLayout";
import { CreateContentForm } from "@modules/content/CreateContentForm";
import { userStore } from "@utils/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const CreatePage: NextPage = () => {
  const router = useRouter();

  const { user } = userStore();

  const isProfileComplete = !!(user?.bio && user?.username);

  useEffect(() => {
    if (!isProfileComplete) {
      toast.error("Please complete your profile.");
      router.push("/profile");
    }
  }, []);

  console.log(isProfileComplete);

  return (
    <PageLayout title="Create" className="flex flex-col gap-10">
      <H1 className="italic">Briefly tell us what you have learnt today...</H1>

      <CreateContentForm />
    </PageLayout>
  );
};

export default withAuth(CreatePage);
