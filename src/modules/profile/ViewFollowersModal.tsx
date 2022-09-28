import { Button } from "@chakra-ui/react";
import { H3, H4, Label, P } from "@components/Text";
import Modal from "@elements/Modal";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { User } from "types/User";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  followers: User["followers"];
  myUserId: User["_id"];
};

export const ViewFollowersModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  followers,
  myUserId,
}) => {
  const isUserFollowing = followers.some(
    (follower: User) => follower._id === myUserId
  );

  const isMyProfile = followers.some(
    (follower: User) => follower._id === myUserId
  );
  console.log(isUserFollowing);

  return (
    <Modal title="Edit Profile" isOpen={isOpen} setIsOpen={setIsOpen}>
      {followers.map((follower) => (
        <div key={follower._id} className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <div className="relative w-14 h-14">
              <Image
                src={follower.image}
                layout="fill"
                className="rounded-full"
              />
            </div>

            <div>
              <H3>{follower.username || follower.name}</H3>
              <P className="font-medium text-gray-500 -mt-0.5">
                {follower.bio}
              </P>
            </div>
          </div>

          {follower._id !== myUserId && (
            <Button
              className={clsx(
                "!text-white !rounded-3xl",
                isUserFollowing ? "!bg-green-600" : "!bg-green-700"
              )}
              // onClick={() => followUser(_id, setUserProfile)}
            >
              {isUserFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      ))}
    </Modal>
  );
};
