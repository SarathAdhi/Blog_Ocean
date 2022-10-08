import React from "react";
import { Content } from "types/Content";
import { BigCard, MiniCard } from "./Card";

type Props = {
  isMini?: boolean;
};

export const ContentCard: React.FC<Content & Props> = ({
  isMini = false,
  createdAt,
  ...rest
}) => {
  const date = `${new Date(createdAt)}`;
  const dateString = date.split(" ").slice(1, 4).join(" ");

  if (isMini) return <MiniCard {...rest} createdAt={dateString} />;
  return <BigCard {...rest} createdAt={dateString} />;
};
