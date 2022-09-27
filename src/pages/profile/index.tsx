import { Button } from "@chakra-ui/react";
import Modal from "@elements/Modal";
import PageLayout from "@layouts/PageLayout";
import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import withAuth from "@hoc/withAuth";
import axios, { AxiosResponse } from "@lib/axios";
import toast from "react-hot-toast";
import { userStore } from "@utils/store";
import Input from "@components/Input";
import TextArea from "@components/TextArea";

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  setIsOpen: (value: boolean) => void,
  getProfile: () => void
) => {
  e.preventDefault();

  const values = e.currentTarget;

  const username = (values[0] as HTMLInputElement).value;
  const bio = (values[1] as HTMLInputElement).value;

  const data: AxiosResponse = await axios.put("/user", {
    username,
    bio,
  });

  if (!data.error) {
    setIsOpen(false);
    toast.success("Profile updated successfully");
    getProfile();
  }
};

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, getProfile } = userStore();
  const { username, bio } = user;

  return (
    <>
      <PageLayout title="My Profile">
        <div>Profile</div>

        <Button
          padding={"2"}
          bgColor={"gray.300"}
          _hover={{ bgColor: "gray.200" }}
          onClick={() => setIsOpen(true)}
        >
          <PencilIcon className="w-6 h-6" />
        </Button>
      </PageLayout>

      <Modal title="Edit Profile" isOpen={isOpen} setIsOpen={setIsOpen}>
        <form
          className="grid gap-5"
          onSubmit={(e) => handleSubmit(e, setIsOpen, getProfile)}
        >
          <Input
            label="Username"
            placeholder="Enter a username"
            defaultValue={username}
            isDisabled={!!username}
            isRequired
          />

          <TextArea
            label="Bio"
            placeholder="FDE Developer @Amazon"
            defaultValue={bio}
            isRequired
          />

          <Button type="submit" colorScheme="green">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default withAuth(Profile);
