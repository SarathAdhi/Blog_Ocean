import React from "react";
import clsx from "clsx";
import "react-quill/dist/quill.snow.css";
import styles from "./markdown.module.css";

export const MarkdownText = ({ description }: { description: string }) => {
  return (
    <div className={clsx("text-xl", styles.markdown)}>
      <div
        className={clsx("text-xl", styles.ql_snow)}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
