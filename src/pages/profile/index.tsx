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

const handleLogout = async (router: NextRouter) => {
  localStorage.removeItem("token");
  router.reload();
  toast.success("Logged out successfully");
  googleLogout();
};

const ProfilePage: NextPage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PageLayout title="My Profile" className="flex gap-2">
        <Button
          padding={"2"}
          color={"white"}
          bgColor={"red"}
          _hover={{ bgColor: "red.500" }}
          _active={{ bgColor: "" }}
          onClick={() => handleLogout(router)}
          rightIcon={<LogoutIcon className="h-5 w-5" />}
        >
          Logout
        </Button>

        <Button
          padding={"2"}
          bgColor={"gray.300"}
          _hover={{ bgColor: "gray.200" }}
          onClick={() => setIsOpen(true)}
        >
          <PencilIcon className="w-6 h-6" />
        </Button>
      </PageLayout>

      <EditProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default withAuth(ProfilePage);
