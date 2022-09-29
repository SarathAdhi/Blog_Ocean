import { H3, P } from "@components/Text";
import Modal from "@elements/Modal";
import { UserFollowButton } from "@elements/UserFollowButton";
import Image from "next/image";
import React from "react";
import { User } from "types/User";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  followers: User["followers"];
  myUserId: User["_id"];
  onClick: (value: User) => void;
};

export const ViewFollowersModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  followers,
  myUserId,
  onClick,
}) => {
  return (
    <Modal
      title="Edit Profile"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="flex flex-col gap-4"
    >
      {followers.map((follower) => (
        <div key={follower._id} className="flex items-center justify-between">
          <div className="flex items-start gap-2 sm:gap-4">
            <div className="relative w-12 h-12">
              <Image
                src={follower.image}
                layout="fill"
                className="rounded-full"
                alt={`${follower.username}`}
              />
            </div>

            <div>
              <H3 className="!text-lg sm:text-xl">
                {follower.username || follower.name}
              </H3>
              <P className="text-xs sm:text-sm font-medium text-gray-500 -mt-0.5">
                {follower.bio}
              </P>
            </div>
          </div>

          {follower._id !== myUserId && (
            <UserFollowButton
              followers={followers}
              userId={follower._id}
              onClick={onClick}
            />
          )}
        </div>
      ))}
    </Modal>
  );
};
