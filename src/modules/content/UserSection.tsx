import LinkedItem from "@components/LinkedItem";
import { H3, Label } from "@components/Text";
import { UserFollowButton } from "@elements/UserFollowButton";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { Component } from "types/Page";
import { User } from "types/User";

type Props = {
  owner: User;
  fetchContent: () => void;
};

export const UserSection: React.FC<Props & Component> = ({
  owner,
  className,
  fetchContent,
}) => {
  const { username, bio, followers, image, _id } = owner;

  return (
    <div
      className={clsx(
        "flex justify-between lg:justify-start flex-col sm:flex-row lg:flex-col items-center",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-2 lg:gap-2">
        <div className="relative w-20 h-20  sm:w-16 sm:h-16 lg:w-32 lg:h-32 ">
          <Image
            src={image}
            layout="fill"
            className="rounded-full"
            referrerPolicy={"no-referrer"}
            alt={`Profile | ${username}`}
          />
        </div>

        <div className="grid gap-1">
          <LinkedItem href={`/profile/${username}`} className="hover:underline">
            <H3 className="w-full font-bold text-center sm:text-left lg:text-center">
              {username}
            </H3>
          </LinkedItem>

          <Label className="-mt-1 flex-col text-center sm:text-left lg:text-center">
            {bio}
          </Label>
        </div>
      </div>

      <UserFollowButton
        className="mt-5 sm:mt-0 lg:mt-5"
        followers={followers}
        userId={_id}
        onClick={fetchContent}
      />
    </div>
  );
};
