import LinkedItem from "@elements/LinkedItem";
import { H3, Label, P } from "@elements/Text";
import Modal from "@components/Modal";
import { UserFollowButton } from "@components/UserFollowButton";
import { userStore } from "@utils/store";
import Image from "next/image";
import React, { useState } from "react";
import { User } from "types/User";
import { Heading } from "@chakra-ui/react";

type Props = {
  labelClassName?: string;
  followers: User["followers"];
  onClick: (value: User) => void;
};

export const ViewFollowersModal: React.FC<Props> = ({
  followers,
  onClick,
  labelClassName,
}) => {
  const { user } = userStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Label onClick={() => setIsOpen(true)} className={labelClassName}>
        {followers.length} Followers
      </Label>

      <Modal
        title="Followers"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="flex flex-col gap-4"
      >
        {followers.map((follower) => (
          <div key={follower._id} className="flex items-center justify-between">
            <LinkedItem
              href={`/profile/${follower.username}`}
              className="flex items-start gap-2 sm:gap-4"
            >
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

                <Heading
                  as="p"
                  noOfLines={1}
                  className="!text-xs sm:!text-sm !font-medium !text-gray-500 -mt-0.5"
                >
                  {follower.bio}
                </Heading>
              </div>
            </LinkedItem>

            {follower._id !== user._id && (
              <UserFollowButton
                followers={followers}
                userId={follower._id}
                onClick={onClick}
              />
            )}
          </div>
        ))}
      </Modal>
    </>
  );
};
