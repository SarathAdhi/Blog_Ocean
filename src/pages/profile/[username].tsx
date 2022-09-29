import { ErrorPage } from "@elements/ErrorPage";
import LoadingPage from "@elements/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import { UserPosts } from "@modules/profile/UserPosts";
import { ViewUserProfile } from "@modules/profile/ViewUserProfile";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "types/User";

const ViewProfilePage: NextPage = () => {
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { username: user_name } = router.query;

  const fetchUserProfile = useCallback(async () => {
    const data: User = await axios.get(`/user?username=${user_name}`);
    setUserProfile(data);
    setIsLoading(false);
  }, [user_name]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (!user_name || isLoading) return <LoadingPage />;

  if (!userProfile)
    return <ErrorPage title="User profile does not exists" error="404" />;

  const { username, _id } = userProfile;

  return (
    <PageLayout
      title={`${username} | Profile`}
      className="flex flex-col gap-10"
    >
      <ViewUserProfile {...userProfile} setUserProfile={setUserProfile} />

      <UserPosts userId={_id} />
    </PageLayout>
  );
};

export default ViewProfilePage;
