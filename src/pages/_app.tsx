import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { userStore } from "@utils/store";
import { useCallback, useEffect, useState } from "react";
import LoadingPage from "@components/loading/LoadingPage";
import ReactGA from "react-ga";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;

const TRACKING_ID = process.env.GOOGLE_ANALYTICS_TRACKING_ID!;

function MyApp({ Component, pageProps }: AppProps) {
  ReactGA.initialize(TRACKING_ID);

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
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [fetchUser]);

  if (isLoading) return <LoadingPage />;

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <ChakraProvider>
        <Component {...pageProps} />

        <Toaster
          containerClassName="z-50"
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 3000 }}
        />
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
