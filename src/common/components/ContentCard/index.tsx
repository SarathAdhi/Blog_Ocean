import { formatContentDescription, formatDate } from "@utils/format";
import React from "react";
import { Content } from "types/Content";
import { BigCard, MiniCard } from "./Card";

type Props = {
  isMini?: boolean;
};

export const ContentCard: React.FC<Content & Props> = ({
  isMini = false,
  description,
  createdAt,
  ...rest
}) => {
  const formatDescription =
    description.length > 500
      ? formatContentDescription(description) + "<span>....</span>"
      : description;

  const content = {
    ...rest,
    description: formatDescription,
    createdAt: formatDate(createdAt),
  };

  if (isMini) return <MiniCard {...content} />;
  return <BigCard {...content} />;
};
