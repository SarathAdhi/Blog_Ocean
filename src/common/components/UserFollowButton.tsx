import { Button } from "@chakra-ui/react";
import axios from "@lib/axios";
import { userStore } from "@utils/store";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Component } from "types/Page";
import { User } from "types/User";

type Props = {
  followers: User["followers"];
  userId: User["_id"];
  onClick?: (value: User) => void;
};

export const UserFollowButton: React.FC<Props & Component> = ({
  followers,
  userId,
  onClick,
  className,
}) => {
  const { user } = userStore();
  const [isUserFollowing, setIsUserFollowing] = useState(() =>
    followers.some((follower: User) => follower._id === user._id)
  );

  const followUser = async () => {
    const data: User = await axios.put(`/user/follow/${userId}`);
    setIsUserFollowing(() =>
      data.followers.some((follower: User) => follower._id === user._id)
    );

    onClick?.(data);
  };

  return (
    <Button
      className={clsx(
        "!text-white !rounded-3xl",
        isUserFollowing ? "!bg-green-600" : "!bg-green-700",
        className
      )}
      onClick={followUser}
    >
      {isUserFollowing ? "Following" : "Follow"}
    </Button>
  );
};
