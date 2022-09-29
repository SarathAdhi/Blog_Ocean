import { H2, Label } from "@components/Text";
import { UserFollowButton } from "@elements/UserFollowButton";
import { userStore } from "@utils/store";
import Image from "next/image";
import React, { useState } from "react";
import { User } from "types/User";
import { ViewFollowersModal } from "./ViewFollowersModal";

type Props = {
  setUserProfile: (value: User) => void;
} & User;

export const ViewUserProfile: React.FC<Props> = ({
  _id,
  username,
  image,
  followers,
  bio,
  setUserProfile,
}) => {
  const { user } = userStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center flex-col sm:flex-row gap-5 justify-between bg-white p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4">
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
            <H2 className="text-center sm:text-left ">{username}</H2>
            <Label className="text-center sm:text-left !text-lg !text-gray-600">
              {bio}
            </Label>

            <Label
              onClick={() => setIsOpen(true)}
              className="text-center sm:text-left !text-base text-gray-400 cursor-pointer hover:underline"
            >
              {followers?.length} Followers
            </Label>
          </div>
        </div>

        <UserFollowButton
          followers={followers}
          userId={_id}
          onClick={(user) => setUserProfile(user)}
        />
      </div>

      <ViewFollowersModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        followers={followers}
        myUserId={user._id}
        onClick={(user) => setUserProfile(user)}
      />
    </>
  );
};
