import { Button } from "@chakra-ui/react";
import PageLayout from "@layouts/PageLayout";
import React, { useState } from "react";
import { LogoutIcon, PencilIcon } from "@heroicons/react/outline";
import withAuth from "@hoc/withAuth";
import toast from "react-hot-toast";
import { googleLogout } from "@react-oauth/google";
import { NextRouter, useRouter } from "next/router";
import { NextPage } from "next";
import { EditProfileModal } from "@modules/profile/EditProfileModal";
import { H1, H2, H3, Label } from "@components/Text";
import { userStore } from "@utils/store";
import Image from "next/image";

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

  const { email, image, bio, username, followers, following } = user;

  return (
    <>
      <PageLayout
        title="My Profile"
        className="flex flex-col items-start gap-5"
      >
        <div className="relative group w-full flex items-center gap-4">
          <div className="relative w-20 h-20 md:w-32 md:h-32">
            <Image
              src={image}
              layout="fill"
              className="rounded-full"
              title={`${username} Image`}
              alt={`${username} Image`}
            />
          </div>

          <div>
            <H2>{username}</H2>
            <Label className="-mt-1 !text-lg !text-gray-500">{bio}</Label>
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
      </PageLayout>

      <EditProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default withAuth(ProfilePage);
