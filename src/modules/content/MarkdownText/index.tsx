import React from "react";
import "react-quill/dist/quill.snow.css";
import clsx from "clsx";
import styles from "./markdown.module.css";

const MarkdownText = ({ description }: { description: string }) => {
  return (
    <div className={clsx("text-xl", styles.markdown)}>
      <div
        className={clsx("text-xl", styles.ql_snow)}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default MarkdownText;
