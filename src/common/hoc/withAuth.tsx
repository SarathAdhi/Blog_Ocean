import GoogleAuth from "@elements/GoogleAuth";
import { userStore } from "@utils/store";
import React, { useEffect } from "react";

const withAuth =
  (Component: React.FC) =>
  ({ ...pageProps }) => {
    const { user } = userStore((state) => state);

    // useEffect(() => {}, [user]);

    const isAuth = !!user._id;

    if (isAuth) return <Component {...pageProps} />;
    else return <GoogleAuth />;
  };

export default withAuth;
