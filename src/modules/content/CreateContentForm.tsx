import { Button } from "@chakra-ui/react";
import Input from "@elements/Input";
import { Label } from "@elements/Text";
import MarkDownEditor from "@components/MarkDownEditor";
import axios, { AxiosResponse } from "@lib/axios";
import { formatTitle } from "@utils/format";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import xss from "xss";

type Props = {
  title?: string;
  description?: string;
  contentId?: string;
};

type HandleSubmitProps = {
  title: string;
  description: string;
  contentId: string;
  router: ReturnType<typeof useRouter>;
};

const handleSubmit = async ({
  title,
  description,
  contentId,
  router,
}: HandleSubmitProps) => {
  if (!title) {
    toast.error("Title is required");

    return;
  }

  if (!description) {
    toast.error("Content is required");

    return;
  }

  const convertToHTML = xss(description); // For security reasons (Cross Site Scripting)

  const content = {
    title,
    description: convertToHTML,
  };

  if (!contentId) {
    const { data, message }: AxiosResponse = await axios.post(
      "/content/",
      content
    );

    toast.success(message, { duration: 2000 });
    router.replace(`/content/${data._id}/${formatTitle(data.title)}`);

    return;
  }

  const { data, message }: AxiosResponse = await axios.put(
    `/content/${contentId}`,
    content
  );

  toast.success(message, { duration: 2000 });
  router.replace(`/content/${contentId}/${formatTitle(data.title)}`);
};

export const CreateContentForm: React.FC<Props> = ({
  title: _title = "",
  description: _description = "",
  contentId = "",
}) => {
  const router = useRouter();

  const [title, setTitle] = useState(_title);
  const [description, setDescription] = useState(_description);

  return (
    <div className="h-full flex flex-col items-end gap-2">
      <div className="w-full h-full flex flex-col gap-2 md:gap-4">
        <div className="w-full">
          <Input
            placeholder="Enter your title"
            fontWeight="semibold"
            fontSize={"2xl"}
            paddingY={"6"}
            maxLength={100}
            value={title}
            _focus={{ bgColor: "transparent" }}
            onChange={({ target }) => setTitle(target.value)}
            variant="unstyled"
            className="!h-6"
          />

          <Label className="text-right">{title.length} / 100</Label>
        </div>

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
          handleSubmit({ title, description, contentId, router }).then(() => {
            if (!contentId) {
              setTitle("");
              setDescription("");
            }
          })
        }
      >
        {contentId ? "Update" : "Publish"}
      </Button>
    </div>
  );
};
