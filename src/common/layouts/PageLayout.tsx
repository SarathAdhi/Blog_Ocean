import React from "react";
import Head from "next/head";
import { Component } from "types/Page";
import clsx from "clsx";
import Navbar from "@elements/navbar";

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
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="min-h-screen bg-slate-100 flex flex-col-reverse md:flex-row justify-between md:justify-center lg:gap-5">
        <Navbar className="col-span-1" />

        <div className="w-full max-w-[1440px] grid lg:grid-cols-14">
          <div
            className={clsx(
              "w-full p-2 md:p-5",
              RightSideBar ? "col-span-10 xl:col-span-11" : "col-span-14",
              className
            )}
          >
            {children}
          </div>

          {RightSideBar && RightSideBar}
        </div>
      </main>
    </>
  );
};

export default PageLayout;
