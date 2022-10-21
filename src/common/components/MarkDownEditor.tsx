import React from "react";
import dynamic from "next/dynamic";
import { ReactQuillProps } from "react-quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

type Props = {
  value: string;
  setValue?: (value: string) => void;
  placeholder?: string;
} & ReactQuillProps;

const MarkDownEditor: React.FC<Props> = ({
  value,
  setValue,
  placeholder,
  ...rest
}) => {
  return (
    <ReactQuill
      theme="snow"
      className="h-full max-h-[80vh] bg-white pb-10 rounded-xl overflow-hidden border placeholder:text-gray-500"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default MarkDownEditor;
