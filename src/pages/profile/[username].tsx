import { ErrorPage } from "@elements/ErrorPage";
import LoadingPage from "@elements/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import { UserPosts } from "@modules/profile/UserPosts";
import { ViewUserProfile } from "@modules/profile/ViewUserProfile";
import { userStore } from "@utils/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "types/User";

const ViewProfilePage: NextPage = () => {
  const router = useRouter();

  const { user } = userStore();

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { username: user_name } = router.query;

  const fetchUserProfile = useCallback(async () => {
    const data: User = await axios.get(`/user?username=${user_name}`);
    setUserProfile(data);
    setIsLoading(false);
  }, [user_name]);

  useEffect(() => {
    if (user_name) {
      if (user.username === user_name) router.replace("/profile");

      fetchUserProfile();
    }
  }, [fetchUserProfile]);

  if (isLoading) return <LoadingPage />;

  if (!userProfile)
    return <ErrorPage title="User profile does not exists" error="404" />;

  const { username, _id } = userProfile;

  return (
    <PageLayout
      title={`${username} | Profile`}
      className="flex flex-col gap-10"
    >
      <ViewUserProfile {...userProfile} fetchUserProfile={fetchUserProfile} />

      <div className="grid gap-4">
        <UserPosts userId={_id} />
      </div>
    </PageLayout>
  );
};

export default ViewProfilePage;
