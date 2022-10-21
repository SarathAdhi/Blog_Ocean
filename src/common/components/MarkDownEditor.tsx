import React from "react";
import dynamic from "next/dynamic";
import { ReactQuillProps } from "react-quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ font: [] }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ],
};

const formats = [
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "indent",
  "list",
  "script",
  "bullet",
  "link",
  "image",
  "font",
  "align",
  "color",
  "background",
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
      className="h-full max-h-[80vh] bg-white pb-11 rounded-xl overflow-hidden placeholder:text-gray-500"
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
