import LinkedItem from "@components/LinkedItem";
import { H3, Label } from "@components/Text";
import Image from "next/image";
import React from "react";
import { Content } from "types/Content";

export const ContentCard: React.FC<Content> = ({
  _id,
  title,
  owner,
  description,
  createdAt,
}) => {
  const date = `${new Date(createdAt)}`;
  const dateString = date.split(" ").slice(1, 4).join(" ");

  return (
    <article className="group w-full overflow-hidden duration-300 ease-in-out hover:rounded-lg border-2 border-transparent border-b-gray-200 hover:border-gray-200">
      <LinkedItem
        href={`/content/${_id}/${title.toLowerCase().replaceAll(" ", "-")}`}
        className="flex flex-col gap-3 max-h-52 p-4"
        title={title}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <Image
              src={owner.image}
              layout="fill"
              className="rounded-full"
              referrerPolicy={"no-referrer"}
              alt={owner.username}
            />
          </div>

          <Label className="font-medium flex items-center gap-2">
            <span>{owner.username}</span>
            <span>|</span>
            <span>{dateString}</span>
          </Label>
        </div>

        <H3 className="!font-bold !leading-none w-full">{title}</H3>

        <div
          className="truncate"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </LinkedItem>
    </article>
  );
};
