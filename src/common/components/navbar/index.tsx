import LinkedItem, { LinkProps } from "@components/LinkedItem";
import { H3 } from "@components/Text";
import { userStore } from "@utils/store";
import React from "react";
import { pages } from "./pages";
import { PencilAltIcon } from "@heroicons/react/outline";
import { Box, Tooltip } from "@chakra-ui/react";

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

const Navbar = () => {
  const { user } = userStore((state) => state);

  return (
    <header className="md:py-5 px-2 h-screen sticky top-0 border-r border-gray-300 flex flex-col items-center justify-between">
      <H3>PIT</H3>

      <div className="grid gap-y-3 divide-y-2">
        <div className="grid gap-1">
          {pages.map((page) => (
            <NavLink key={page.name} {...page} />
          ))}
        </div>

        <NavLink
          className="mt-3"
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
