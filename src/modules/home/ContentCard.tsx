import LinkedItem from "@components/LinkedItem";
import { H3, Label } from "@components/Text";
import React from "react";
import { Content } from "types/Content";

export const ContentCard: React.FC<Content> = ({
  _id,
  title,
  owner,
  description,
}) => {
  return (
    <LinkedItem
      href={`/content/${_id}/${title.toLowerCase().replaceAll(" ", "-")}`}
      className="group bg-gray-200 w-full max-h-52 p-4 flex flex-col gap-3 rounded-lg overflow-hidden duration-200 hover:shadow-lg"
      title={title}
    >
      <div className="flex items-center gap-2">
        <img
          src={owner.image}
          className="w-7 h-7 rounded-full"
          referrerPolicy={"no-referrer"}
          alt={owner.username}
        />

        <Label className="font-medium">{owner.name}</Label>
      </div>

      <H3 className="!font-bold !leading-none w-full">{title}</H3>

      <div
        className="truncate"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </LinkedItem>
  );
};
