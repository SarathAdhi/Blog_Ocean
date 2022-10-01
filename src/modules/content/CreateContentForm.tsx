import { Button } from "@chakra-ui/react";
import Input from "@components/Input";
import MarkDownEditor from "@elements/MarkDownEditor";
import axios, { AxiosResponse } from "@lib/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

type HandleSubmitProps = {
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
};

const handleSubmit = async ({
  title,
  setTitle,
  description,
  setDescription,
}: HandleSubmitProps) => {
  if (!title) {
    toast.error("Title is required", {
      position: "top-right",
    });

    return;
  }

  if (!description) {
    toast.error("Content is required", {
      position: "top-right",
    });

    return;
  }

  const content = {
    title,
    description,
  };

  const data: AxiosResponse = await axios.post("/content/create", content);
  toast.success(data.message, {
    position: "top-right",
  });

  setTitle("");
  setDescription("");
};

export const CreateContentForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="h-full flex flex-col items-end gap-4">
      <div className="w-full h-full flex flex-col gap-4">
        <Input
          placeholder="Enter your title"
          fontWeight="semibold"
          fontSize={"2xl"}
          paddingY={"6"}
          maxLength={80}
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          variant="unstyled"
          className="!h-6"
        />

        <MarkDownEditor
          value={description}
          setValue={setDescription}
          placeholder="Enter your content here..."
        />
      </div>

      <Button
        className="text-white"
        color={"white"}
        bgColor={"green.500"}
        _hover={{ bgColor: "green.400" }}
        _active={{ bgColor: "green.600" }}
        onClick={() =>
          handleSubmit({ title, setTitle, description, setDescription })
        }
      >
        Publish
      </Button>
    </div>
  );
};
