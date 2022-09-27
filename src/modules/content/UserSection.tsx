import { H3, Label } from "@components/Text";
import clsx from "clsx";
import React from "react";
import { Component } from "types/Page";
import { User } from "types/User";

type Props = {} & User;

const UserSection: React.FC<Props & Component> = ({
  image,
  bio,
  username,
  className,
}) => (
  <div className={clsx("", className)}>
    <div className="flex md:flex-col items-center gap-5 md:gap-2">
      <img
        className="w-20 h-20 md:w-32 md:h-32 rounded-full"
        src={image}
        referrerPolicy={"no-referrer"}
      />

      <div>
        <H3 className="font-bold md:text-center">{username}</H3>
        <Label className="md:text-center">{bio}</Label>
      </div>
    </div>
  </div>
);

export default UserSection;
