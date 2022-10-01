import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import { HomeComponent } from "@modules/home";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Content } from "types/Content";

const Home: NextPage = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useCallback is used here to isolate this function.This will not automatically run on every render.
  // performance improvement
  const fetchContents = useCallback(async () => {
    const data: Content[] = await axios.get("/content");
    setContents(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return (
    <PageLayout title="Home" className="">
      <HomeComponent contents={contents} isLoading={isLoading} />
    </PageLayout>
  );
};

export default Home;
