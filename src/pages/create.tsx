import { Button } from "@chakra-ui/react";
import Input from "@components/Input";
import { H1 } from "@components/Text";
import MarkDownEditor from "@elements/MarkDownEditor";
import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
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

    const data: { message: string } = await axios.post(
      "/content/create",
      content
    );
    toast.success(data.message, {
      position: "top-right",
    });

    setTitle("");
    setDescription("");
  };

  return (
    <PageLayout title="Create" className="flex flex-col gap-10">
      <div>
        <H1 className="italic">
          Briefly tell us what you have learn't today...
        </H1>
      </div>

      <div className="h-full flex flex-col items-end gap-4">
        <Button
          className="text-white"
          color={"white"}
          bgColor={"green.500"}
          _hover={{ bgColor: "green.400" }}
          _active={{ bgColor: "green.600" }}
          onClick={handleSubmit}
        >
          Publish
        </Button>

        <div className="w-full h-full flex flex-col gap-4">
          <Input
            placeholder="Enter your title"
            fontWeight="semibold"
            fontSize={"2xl"}
            paddingY={"6"}
            maxLength={100}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            variant="flushed"
          />

          <MarkDownEditor
            value={description}
            setValue={setDescription}
            placeholder="Enter your content here..."
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Create;
