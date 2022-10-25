import LinkedItem, { LinkProps } from "@elements/LinkedItem";
import { userStore } from "@utils/store";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Component } from "types/Page";
import clsx from "clsx";
import { pages } from "./pages";
import Modal from "@components/Modal";
import Input from "@components/elements/Input";
import { useRouter } from "next/router";

// <Tooltip
//   label={name}
//   placement="right"
//   marginTop={className?.includes("mt-3") ? "4" : ""}
//   marginLeft="1.5"
// >
// <Box>
//
//</Box>
//</Tooltip>

type NavLinkProps = {
  setShowSearchModal: (isOpen: boolean) => void;
  isSearch?: boolean;
};

const NavLink: React.FC<LinkProps & NavLinkProps> = ({
  name,
  href,
  Icon,
  className,
  isSearch,
  setShowSearchModal,
  ...rest
}) => {
  function handleSearchModal() {
    if (isSearch) setShowSearchModal(true);
  }

  return (
    <LinkedItem
      {...rest}
      href={href}
      className={className}
      onClick={handleSearchModal}
    >
      {Icon && <Icon className="w-8 h-8 text-gray-500 stroke-1" />}
    </LinkedItem>
  );
};

export const Navbar: React.FC<Component> = ({ className }) => {
  const { user } = userStore();
  const [showSearchModal, setShowSearchModal] = useState(false);

  const router = useRouter();
  const searchQuery = router.query.q || "";

  // useEffect(() => {
  //   router.replace(searchQuery ? `?q=${searchQuery}` : "/");
  // }, []);

  return (
    <>
      <header
        className={clsx(
          "z-50 py-5 px-2 w-full bg-white md:bg-transparent md:w-20 h-14 md:h-screen sticky bottom-0 md:top-0 border-t-2 rounded-t-lg md:rounded-none md:border-r border-gray-300 flex md:flex-col items-center justify-between",
          className
        )}
      >
        <LinkedItem
          href="/"
          className="hidden md:block relative w-10 h-10 md:w-14 md:h-14"
        >
          <Image
            src="/assets/logo-bo.png"
            layout="fill"
            className="rounded-lg"
            alt="Blog Ocean"
            priority
          />
        </LinkedItem>

        <div className="w-full flex items-center justify-around md:justify-start md:flex-col gap-5">
          {pages.map((page) => (
            <NavLink
              key={page.name}
              {...page}
              setShowSearchModal={setShowSearchModal}
            />
          ))}

          <LinkedItem href="/profile" className="md:hidden relative w-8 h-8">
            <Image
              src={user.image || "/assets/default-user-img.png"}
              layout="fill"
              className="rounded-full"
              referrerPolicy={"no-referrer"}
              alt={`Profile | ${user.name}`}
              priority
            />
          </LinkedItem>
        </div>

        <LinkedItem
          href="/profile"
          className="hidden md:block relative w-10 h-10"
        >
          <Image
            src={user.image || "/assets/default-user-img.png"}
            layout="fill"
            className="rounded-full"
            referrerPolicy={"no-referrer"}
            alt={`Profile | ${user.name}`}
            priority
          />
        </LinkedItem>
      </header>

      <Modal
        title=""
        isOpen={showSearchModal}
        setIsOpen={setShowSearchModal}
        className="flex flex-col items-center bg-gray-300 rounded-lg !p-0 gap-3"
        isCentered={false}
      >
        <input
          type={"text"}
          value={searchQuery}
          className="p-3 text-lg w-full focus:outline-none"
          placeholder="Search..."
          onChange={({ target }) => router.replace(`?q=${target.value}`)}
          onKeyUp={({ key }) => key === "Enter" && setShowSearchModal(false)}
        />

        {/* <div>hello</div> */}
      </Modal>
    </>
  );
};
