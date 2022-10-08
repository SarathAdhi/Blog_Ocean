import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ReactQuillProps } from "react-quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Kbd } from "@chakra-ui/react";

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
  const [currentAlphabet, setCurrentAlphabet] = useState("");

  const handleKeyChange = (key: string, keyCode: number) => {
    setCurrentAlphabet((pre) => {
      let value = pre;

      if (keyCode >= 48 && keyCode <= 90) value = value + key;
      else value = value + " " + key + " ";

      const isTrue = pre.split(" ").filter((e) => e !== "").length >= 3;

      if (isTrue) value = value.split(" ").slice(-1).join(" ");

      return value;
    });
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        className="h-full max-h-[74vh] bg-white pb-10 rounded-xl overflow-hidden border placeholder:text-gray-500"
        value={value}
        onChange={setValue}
        onKeyUp={(e) => {
          handleKeyChange(e.key, e.keyCode);
        }}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        {...rest}
      />

      <span className="fixed w-full flex justify-center items-center md:block top-2 md:top-auto bottom-auto md:bottom-5">
        {currentAlphabet && <Kbd fontSize={"xl"}>{currentAlphabet}</Kbd>}
      </span>
    </>
  );
};

export default MarkDownEditor;
