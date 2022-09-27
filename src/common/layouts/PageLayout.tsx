import React from "react";
import Head from "next/head";
import { Component } from "types/Page";
import clsx from "clsx";
import Navbar from "@elements/navbar";
import { userStore } from "@utils/store";

type Props = {
  title: string;
  RightSideBar?: React.ReactNode;
};

const PageLayout: React.FC<Props & Component> = ({
  title,
  className,
  children,
  RightSideBar,
}) => {
  const { user } = userStore((state) => state);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="min-h-screen bg-slate-100 flex justify-center gap-5">
        <div className="w-full max-w-[1440px] flex flex-col md:flex-row">
          <Navbar />

          <div className={clsx("w-full p-2 md:p-5", className)}>{children}</div>

          {RightSideBar && RightSideBar}
        </div>
      </main>
    </>
  );
};

export default PageLayout;
