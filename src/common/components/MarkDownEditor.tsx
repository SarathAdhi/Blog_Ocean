import React from "react";
import dynamic from "next/dynamic";
import { RichTextEditorProps } from "@mantine/rte";
import clsx from "clsx";
const RichTextEditor = dynamic(() => import("@mantine/rte"), { ssr: false });

type Props = {
  value: string;
  setValue?: (value: string) => void;
  placeholder?: string;
} & RichTextEditorProps;

const MarkDownEditor: React.FC<Props> = ({
  value,
  setValue,
  placeholder,
  ...rest
}) => {
  return (
    <RichTextEditor
      stickyOffset={0}
      id="rte"
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      className={clsx(
        "w-full text-sm md:text-lg overflow-auto list-disc",
        rest.readOnly ? "break-words" : "h-[78vh] md:h-[84vh]"
      )}
      {...rest}
    />
  );
};

export default MarkDownEditor;
