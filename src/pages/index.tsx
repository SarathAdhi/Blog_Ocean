import withAuth from "@hoc/withAuth";
import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import { ContentCard } from "@modules/home/ContentCard";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";

const Home: NextPage = () => {
  const [contents, setContents] = useState<Content[]>([]);

  // useCallback is used here to isolate this function.This will not automatically run on every render.
  // performance improvement
  const fetchContents = useCallback(async () => {
    const data: Content[] = await axios.get("/content");
    setContents(data);
  }, []);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return (
    <PageLayout title="Home" className="">
      <div className="grid gap-4">
        {contents.map((content) => (
          <ContentCard key={content._id} {...content} />
        ))}
      </div>
    </PageLayout>
  );
};

export default withAuth(Home);
