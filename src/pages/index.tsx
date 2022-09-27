import LinkedItem from "@components/LinkedItem";
import { H2, H3, Label, P } from "@components/Text";
import MarkDownEditor from "@elements/MarkDownEditor";
import withAuth from "@hoc/withAuth";
import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Content } from "types/Content";

const Home: NextPage = () => {
  const [contents, setContents] = useState<Content[]>([]);

  const fetchContents = async () => {
    const data: Content[] = await axios.get("/content");
    setContents(data);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <PageLayout title="Home" className="">
      <div className="grid gap-4">
        {contents.map(({ _id, title, description, owner }) => (
          <LinkedItem
            key={_id}
            href={`/content/${_id}/${title.toLowerCase().replaceAll(" ", "-")}`}
            className="group bg-gray-200 w-full max-h-52 p-4 flex flex-col gap-3 rounded-lg overflow-hidden duration-200 hover:shadow-lg"
            title={title}
          >
            <div className="flex items-center gap-2">
              <img
                className="w-7 h-7 rounded-full"
                src={owner.image}
                referrerPolicy={"no-referrer"}
              />

              <Label className="font-medium">{owner.name}</Label>
            </div>

            <H3 className="!font-bold !leading-none w-full">{title}</H3>

            <div
              className="truncate"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </LinkedItem>
        ))}
      </div>
    </PageLayout>
  );
};

export default withAuth(Home);
