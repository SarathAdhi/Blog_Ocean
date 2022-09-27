import { H1, H2, P } from "@components/Text";
import PageLayout from "@layouts/PageLayout";
import axios from "@lib/axios";
import React, { useEffect, useState } from "react";

const ViewQuestions = () => {
  const [content, setContent] = useState({});

  const fetchContent = async () => {
    const data = await axios.get(`/content?id=63317c28cec1fe94e5ba6497`);
    setContent(data);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  console.log(content);

  if (!content) return <></>;

  return (
    <PageLayout title="Hello">
      {/* <H1>{content.title}</H1>
      <P>{content.description}</P> */}
    </PageLayout>
  );
};

export default ViewQuestions;
