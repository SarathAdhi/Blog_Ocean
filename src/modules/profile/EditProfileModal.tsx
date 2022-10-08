import { Button } from "@chakra-ui/react";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import Modal from "@elements/Modal";
import axios, { AxiosResponse } from "@lib/axios";
import { userStore } from "@utils/store";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  setIsOpen: (value: boolean) => void,
  getProfile: () => void
) => {
  e.preventDefault();

  const values = e.currentTarget;

  const username = (values[0] as HTMLInputElement).value;
  const bio = (values[1] as HTMLInputElement).value;

  const isSpaceFound = username.includes(" ");

  if (isSpaceFound) {
    toast.error("Username should not contain spaces");

    return;
  }

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

export const EditProfileModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { user, getProfile } = userStore();
  const { username, bio } = user;

  const isProfileCompleted = !(username && bio);

  useEffect(() => {
    setIsOpen(isProfileCompleted);
  }, [isProfileCompleted]);

  return (
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
          maxLength={50}
          isRequired
        />

        <Button type="submit" colorScheme="green">
          Submit
        </Button>
      </form>
    </Modal>
  );
};
