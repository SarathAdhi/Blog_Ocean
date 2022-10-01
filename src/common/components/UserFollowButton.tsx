import { Button } from "@chakra-ui/react";
import axios from "@lib/axios";
import { userStore } from "@utils/store";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Component } from "types/Page";
import { User } from "types/User";

const followUser = async (
  id: User["_id"],
  onClick?: (value: User) => void,
  isLoggedIn?: boolean
) => {
  if (!isLoggedIn) {
    toast.error("You need to login to follow a user");
    return;
  }

  const data: User = await axios.put(`/user/follow/${id}`);
  onClick?.(data);
};

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

  const isUserFollowing = followers.some(
    (follower: User) => follower._id === user._id
  );

  return (
    <Button
      className={clsx(
        "!text-white !rounded-3xl",
        isUserFollowing ? "!bg-green-600" : "!bg-green-700",
        className
      )}
      onClick={() => followUser(userId, onClick, !!user._id)}
    >
      {isUserFollowing ? "Following" : "Follow"}
    </Button>
  );
};
