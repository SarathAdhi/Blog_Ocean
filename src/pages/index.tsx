import PageLayout from "@layouts/PageLayout";
import { HomeComponent } from "@modules/home";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Content } from "types/Content";

export async function getServerSideProps() {
  let contents: Content[] = [];

  try {
    const response = await fetch(
      process.env.PUBLIC_SERVER_BASE_URL + "/content",
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-token": process.env.PUBLIC_SERVER_API_TOKEN!,
        },
      }
    );

    contents = await response.json();
  } catch (error) {
    console.log(error);
  }

  return { props: { contents } };
}

const Home: NextPage<{ contents: Content[] }> = ({ contents }) => {
  const router = useRouter();

  const { q } = router.query;

  console.log({ contents });

  return (
    <PageLayout title="Home">
      <HomeComponent
        contents={contents}
        isLoading={false}
        searchQuery={q as string}
      />
    </PageLayout>
  );
};

export default Home;
