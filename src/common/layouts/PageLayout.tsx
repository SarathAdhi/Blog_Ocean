import React from "react";
import Head from "next/head";
import { Component } from "types/Page";
import clsx from "clsx";
import { Navbar } from "@components/navbar";

type Props = {
  title: string;
  description?: string;
  publishTime?: string;
  author?: string;
  RightSideBar?: React.ReactNode;
};

const PageLayout: React.FC<Props & Component> = ({
  title,
  description,
  publishTime,
  author,
  className,
  children,
  RightSideBar,
}) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Blog Ocean` : "Blog Ocean"}</title>
        <meta
          name="description"
          content="Convert your learning into blog post and help someone out there. Blog Ocean helps developers to resolve or learn something new."
        />
        <meta
          name="og:title"
          property="og:title"
          content={title + " | Blog Ocean"}
        />
        <meta data-rh="true" name="title" content={title + " | Blog Ocean"} />

        {publishTime && (
          <meta
            data-rh="true"
            property="article:published_time"
            content={publishTime}
          />
        )}

        <meta
          data-rh="true"
          name="description"
          content={
            description ||
            "Convert your learning into blog post and help someone out there. Blog Ocean helps developers to resolve or learn something new."
          }
        />

        <meta
          name="og:description"
          property="og:description"
          content={
            description ||
            "Blog Ocean is an open platform for all developers to learn, grow and teach everyone around the world and share their experiences."
          }
        />

        <meta data-rh="true" property="og:url" content={window.location.href} />
        <meta
          data-rh="true"
          property="al:web:url"
          content={window.location.href}
        />
        {author && <meta data-rh="true" name="author" content={author} />}

        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-slate-100 flex flex-col-reverse md:flex-row justify-between md:justify-center">
        <Navbar className="col-span-1" />

        <div className="flex-1 w-full max-w-[1440px] grid lg:grid-cols-15">
          <div
            className={clsx(
              "w-full flex-1 p-2 md:p-5",
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
