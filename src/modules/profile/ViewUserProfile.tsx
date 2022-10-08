import { H2, Label } from "@components/Text";
import { UserFollowButton } from "@elements/UserFollowButton";
import Image from "next/image";
import React from "react";
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

            <ViewFollowersModal
              labelClassName="text-center sm:text-left !text-base text-gray-400 cursor-pointer hover:underline"
              followers={followers}
              onClick={(user) => setUserProfile(user)}
            />
          </div>
        </div>

        <UserFollowButton
          followers={followers}
          userId={_id}
          onClick={(user) => setUserProfile(user)}
        />
      </div>
    </>
  );
};
