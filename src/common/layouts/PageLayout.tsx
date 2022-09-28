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
        <meta
          name="description"
          content="Convert your learning into blog post and help someone out there. Blog Ocean helps developers to resolve or learn something new."
        />
        <meta name="og:title" property="og:title" content={title} />
        <meta name="og:description" property="og:description" content={title} />
        <meta
          name="og:description"
          property="og:description"
          content="Convert your learning into blog post and help someone out there. Blog Ocean helps developers to resolve or learn something new."
        />
        {/* <meta name="robots" content="index, follow" /> */}
        {/* After Production */}
      </Head>

      <main className="min-h-screen bg-slate-100 flex flex-col-reverse md:flex-row justify-between md:justify-center">
        <Navbar className="col-span-1" />

        <div className="flex-1 w-full max-w-[1440px] grid lg:grid-cols-15">
          <div
            className={clsx(
              "w-full p-2 md:p-5",
              RightSideBar ? "col-span-11 xl:col-span-12" : "col-span-15",
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
