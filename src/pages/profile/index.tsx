import { Button, Heading, Text } from "@chakra-ui/react";
import PageLayout from "@layouts/PageLayout";
import React, { useState } from "react";
import { LogoutIcon, PencilIcon } from "@heroicons/react/outline";
import withAuth from "@hoc/withAuth";
import toast from "react-hot-toast";
import { googleLogout } from "@react-oauth/google";
import { NextRouter, useRouter } from "next/router";
import { NextPage } from "next";
import { EditProfileModal } from "@modules/profile/EditProfileModal";
import { H2 } from "@components/Text";
import { userStore } from "@utils/store";
import Image from "next/image";
import { UserPosts } from "@modules/profile/UserPosts";

const handleLogout = async (router: NextRouter) => {
  localStorage.removeItem("token");
  router.reload();
  toast.success("Logged out successfully");
  googleLogout();
};

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = userStore();

  const { image, bio, username } = user;

  return (
    <>
      <PageLayout
        title="My Profile"
        className="flex flex-col items-start gap-5"
      >
        <div className="z-40 sticky top-0 py-4 bg-slate-100 group w-full flex items-center gap-4 rounded-lg">
          <div className="relative w-20 h-20 md:w-32 md:h-32">
            <Image
              src={image}
              layout="fill"
              className="rounded-full"
              title={`${username} Image`}
              alt={`${username} Image`}
            />
          </div>

          <div className="w-9/12">
            <H2>{username}</H2>

            <Text
              noOfLines={1}
              fontWeight={"semibold"}
              className="-mt-1 !text-lg !text-gray-400"
            >
              {bio}
            </Text>
          </div>

          <Button
            padding={"2"}
            bgColor={"gray.300"}
            _hover={{ bgColor: "gray.200" }}
            className="!rounded-full !absolute top-0 right-0"
            onClick={() => setIsOpen(true)}
          >
            <PencilIcon className="w-6 h-6" />
          </Button>
        </div>

        <div className="w-full flex justify-end">
          <Button
            color={"white"}
            bgColor={"red"}
            _hover={{ bgColor: "red.500" }}
            _active={{ bgColor: "" }}
            onClick={() => handleLogout(router)}
            rightIcon={<LogoutIcon className="h-5 w-5" />}
          >
            Logout
          </Button>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Heading size={{ base: "lg", lg: "xl" }}>Contents</Heading>

          <div className="w-full grid gap-4">
            <UserPosts userId={user._id} />
          </div>
        </div>
      </PageLayout>

      <EditProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default withAuth(ProfilePage);
