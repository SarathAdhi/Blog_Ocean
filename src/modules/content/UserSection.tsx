import { Spinner } from "@chakra-ui/react";
import LinkedItem from "@elements/LinkedItem";
import { H3, Label } from "@elements/Text";
import { UserFollowButton } from "@components/UserFollowButton";
import axios from "@lib/axios";
import { ContentCard } from "@components/ContentCard";
import { ViewFollowersModal } from "@modules/profile/ViewFollowersModal";
import clsx from "clsx";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";
import { Component } from "types/Page";
import { User } from "types/User";

type Props = {
  owner: User;
  showUserContent?: boolean;
  currentContent?: Content["_id"];
  fetchContent: () => void;
};

export const UserSection: React.FC<Props & Component> = ({
  owner,
  className,
  fetchContent,
  showUserContent = false,
  currentContent,
}) => {
  const { username, bio, followers, image, _id } = owner;

  const [content, setContent] = useState<Content[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetchContent = useCallback(async () => {
    const data: Content[] = await axios.get(`/content/${_id}`);
    setContent(data);
    setIsLoading(false);
  }, [_id]);

  useEffect(() => {
    _fetchContent();
  }, [_fetchContent]);

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

          <ViewFollowersModal
            labelClassName="md:text-center text-left text-gray-400 cursor-pointer hover:underline"
            followers={followers}
            onClick={fetchContent}
          />
        </div>
      </div>

      <UserFollowButton
        className="mt-5 sm:mt-0 lg:mt-5"
        followers={followers}
        userId={_id}
        onClick={fetchContent}
      />

      {showUserContent && (
        <div className="w-full mt-5 grid gap-2 justify-items-center">
          {isLoading ? (
            <Spinner width={5} height={5} thickness="2px" speed="0.65s" />
          ) : (
            content?.map(
              (content) =>
                // Will not show currently displaying content in user section
                content._id !== currentContent && (
                  <ContentCard key={content._id} {...content} isMini />
                )
            )
          )}
        </div>
      )}
    </div>
  );
};
