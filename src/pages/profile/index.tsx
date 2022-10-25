import { Button, Divider, Heading, Text } from "@chakra-ui/react";
import PageLayout from "@layouts/PageLayout";
import React, { useState } from "react";
import { LogoutIcon, PencilIcon } from "@heroicons/react/outline";
import withAuth from "@hoc/withAuth";
import toast from "react-hot-toast";
import { googleLogout } from "@react-oauth/google";
import { NextRouter, useRouter } from "next/router";
import { NextPage } from "next";
import { EditProfileModal } from "@modules/profile/EditProfileModal";
import { H2 } from "@elements/Text";
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
        <div className="z-40 sticky top-14 md:top-0 py-4 bg-white group w-full flex flex-col md:flex-row items-center gap-1 md:gap-4 rounded-lg">
          <div className="relative w-20 h-20 md:w-32 md:h-32">
            <Image
              src={image}
              layout="fill"
              className="rounded-full"
              title={`${username} Image`}
              alt={`${username} Image`}
            />
          </div>

          <div className="flex md:grid flex-col items-center md:w-9/12 gap-1">
            <H2 className="truncate">{username}</H2>

            <Heading
              as="p"
              className="!leading-none text-center md:text-left !font-medium !text-lg !text-gray-400 whitespace-pre-wrap"
            >
              {bio}
            </Heading>
          </div>
        </div>

        <div className="w-full flex justify-center gap-2">
          <Button
            _hover={{ bgColor: "gray.400", color: "black" }}
            bgColor={"gray.500"}
            color={"white"}
            onClick={() => setIsOpen(true)}
          >
            <PencilIcon className="w-6 h-6" />
          </Button>

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

        <Divider />

        <div className="w-full grid gap-4">
          <UserPosts userId={user._id} />
        </div>
      </PageLayout>

      <EditProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default withAuth(ProfilePage);
