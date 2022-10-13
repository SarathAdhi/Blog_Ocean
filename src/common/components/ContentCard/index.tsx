import { formatDate, formatTitle } from "@utils/format";
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
  const content = {
    ...rest,
    createdAt: formatDate(createdAt),
  };

  if (isMini) return <MiniCard {...content} />;
  return <BigCard {...content} />;
};
