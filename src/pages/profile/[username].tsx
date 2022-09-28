import { Button } from "@chakra-ui/react";
import { H2, Label } from "@components/Text";
import { ErrorPage } from "@elements/ErrorPage";
import LoadingPage from "@elements/loading/LoadingPage";
import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import { ViewFollowersModal } from "@modules/profile/ViewFollowersModal";
import { userStore } from "@utils/store";
import clsx from "clsx";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "types/User";

const followUser = async (
  id: User["_id"],
  setUserProfile: (value: User) => void
) => {
  const data: User = await axios.put(`/user/follow/${id}`);
  setUserProfile(data);
};

const ViewProfilePage: NextPage = () => {
  const router = useRouter();
  const { user } = userStore();

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { username: user_name } = router.query;

  const fetchUserProfile = useCallback(async () => {
    const data: User = await axios.get(`/user?username=${user_name}`);
    setUserProfile(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (!user_name || isLoading) return <LoadingPage />;

  if (!userProfile)
    return <ErrorPage title="User profile does not exists" error="404" />;

  const { _id, username, image, bio, followers, following } = userProfile;

  const isUserFollowing = followers.some(
    (follower: User) => follower._id === user._id
  );

  return (
    <>
      <PageLayout title={`${username} | Profile`}>
        <div className="flex items-center gap-5 justify-between bg-white p-5 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28">
              <Image
                src={image}
                layout="fill"
                className="rounded-full"
                title={`${username} Image`}
                alt={`${username} Image`}
              />
            </div>

            <div className="flex flex-col">
              <H2>{username}</H2>
              <Label className="!text-lg !text-gray-600">{bio}</Label>

              <Label
                onClick={() => setIsOpen(true)}
                className="!text-base text-gray-400 cursor-pointer hover:underline"
              >
                {followers?.length} Followers
              </Label>
            </div>
          </div>

          <Button
            className={clsx(
              "!text-white !rounded-3xl",
              isUserFollowing ? "!bg-green-600" : "!bg-green-700"
            )}
            onClick={() => followUser(_id, setUserProfile)}
          >
            {isUserFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </PageLayout>

      <ViewFollowersModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        followers={followers}
        myUserId={user._id}
      />
    </>
  );
};

export default ViewProfilePage;
