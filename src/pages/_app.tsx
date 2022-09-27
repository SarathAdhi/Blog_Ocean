import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { userStore } from "@utils/store";
import { useCallback, useEffect, useState } from "react";
import LoadingPage from "@elements/loading/LoadingPage";

const clientId = process.env.GOOGLE_CLIENT_ID!;

function MyApp({ Component, pageProps }: AppProps) {
  const { getProfile } = userStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    // await is used here in order to wait for the user to be fetched. Not needed but
    // this is the only way to resolve google popup error
    await getProfile();
    setIsLoading(false);
  }, [getProfile]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) return <LoadingPage />;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ChakraProvider>
        <Component {...pageProps} />

        <Toaster
          containerClassName="z-50"
          position="top-right"
          reverseOrder={false}
        />
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
