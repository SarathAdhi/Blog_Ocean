import LinkedItem from "@components/elements/LinkedItem";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import styles from "@styles/fonts.module.css";

export const TopMobileNavbar = () => {
  return (
    <header className="md:hidden z-50 sticky top-0 w-full bg-white py-2 grid place-content-center shadow-md">
      <LinkedItem
        href="/"
        className={clsx(
          styles.Dafoe,
          "text-center text-4xl font-bold flex items-center gap-2"
        )}
      >
        Blog
        <div className="relative w-10 h-10">
          <Image
            src="/assets/logo-bo.png"
            layout="fill"
            className="rounded-lg"
            alt="Blog Ocean"
            priority
          />
        </div>
        Ocean
      </LinkedItem>
    </header>
  );
};
