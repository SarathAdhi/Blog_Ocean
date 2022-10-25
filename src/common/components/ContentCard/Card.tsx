import { Box, Heading } from "@chakra-ui/react";
import LinkedItem from "@elements/LinkedItem";
import { H3, Label } from "@elements/Text";
import { formatTitle } from "@utils/format";
import Image from "next/image";
import { Content } from "types/Content";

export const BigCard: React.FC<Content> = ({
  _id,
  title,
  owner,
  description,
  createdAt,
}) => (
  <Box
    as={"article"}
    className="py-4 group w-full grid gap-4 overflow-hidden border-b-2 border-gray-200 rounded-sm duration-300 hover:border-gray-400"
  >
    <LinkedItem
      href={`/profile/${owner.username}`}
      className="flex items-center gap-2"
      title={`${owner.username}'s Profile`}
    >
      <Box className="relative w-7 h-7">
        <Image
          src={owner.image}
          layout="fill"
          className="rounded-full"
          referrerPolicy={"no-referrer"}
          alt={owner.username}
        />
      </Box>

      <Label className="font-medium flex items-center gap-2 cursor-pointer">
        <span>{owner.username}</span>
        <span>|</span>
        <span>{createdAt}</span>
      </Label>
    </LinkedItem>

    <LinkedItem
      href={`/content/${_id}/${formatTitle(title)}`}
      className="w-full grid gap-3"
      //max-h-52
      title={title}
    >
      <H3 className="!font-bold !leading-none w-full">{title}</H3>

      <div
        className="!text-sm"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </LinkedItem>
  </Box>
);

export const MiniCard: React.FC<Content> = ({ _id, title, createdAt }) => (
  <Box
    as={"article"}
    title={title}
    className="w-full border-2 border-transparent border-b-gray-200"
  >
    <LinkedItem
      href={`/content/${_id}/${formatTitle(title)}`}
      className="flex flex-col gap-2 p-1 pb-2"
    >
      <Heading size={"md"} noOfLines={2}>
        {title}
      </Heading>

      <Label className="text-right">{createdAt}</Label>
    </LinkedItem>
  </Box>
);
