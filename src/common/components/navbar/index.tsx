import LinkedItem, { LinkProps } from "@components/LinkedItem";
import { H3 } from "@components/Text";
import { userStore } from "@utils/store";
import React from "react";
import { pages } from "./pages";
import { PencilAltIcon } from "@heroicons/react/outline";
import { Box, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { Component } from "types/Page";
import clsx from "clsx";

const NavLink: React.FC<LinkProps> = ({ name, href, Icon, className }) => (
  <Tooltip
    label={name}
    placement="right"
    marginTop={className?.includes("mt-3") ? "4" : ""}
    marginLeft="1.5"
  >
    <Box>
      <LinkedItem href={href} className={className}>
        {Icon && <Icon className="w-8 h-8" />}
      </LinkedItem>
    </Box>
  </Tooltip>
);

const Navbar: React.FC<Component> = ({ className }) => {
  const { user } = userStore((state) => state);

  return (
    <header
      className={clsx(
        "py-5 px-2 w-full md:w-20 h-14 md:h-screen fixed md:sticky bottom-0 md:top-0 border-t-2 rounded-t-lg md:rounded-none md:border-r border-gray-300 flex md:flex-col items-center justify-between",
        className
      )}
    >
      <LinkedItem href="/" className="relative w-10 h-10">
        <Image
          src="/assets/blog-ocean.png"
          layout="fill"
          className="rounded-lg w-full h-full"
        />
      </LinkedItem>

      <div className="flex md:flex-col gap-4 md:divide-y-2">
        <div className="flex md:flex-col gap-1">
          {pages.map((page) => (
            <NavLink key={page.name} {...page} />
          ))}
        </div>

        <NavLink
          className="md:mt-3"
          name="Create"
          href="/create"
          Icon={PencilAltIcon}
        />
      </div>

      <LinkedItem href="/profile">
        <img
          src={user.image}
          className="w-10 h-10 rounded-full"
          referrerPolicy={"no-referrer"}
        />
      </LinkedItem>
    </header>
  );
};

export default Navbar;
