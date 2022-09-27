import GoogleAuth from "@elements/GoogleAuth";
import { userStore } from "@utils/store";
import React from "react";

const withAuth = (Component: React.FC) =>
  function pageProp({ ...pageProps }) {
    const { user } = userStore((state) => state);

    // useEffect(() => {}, [user]);

    const isAuth = !!user._id;

    if (isAuth) return <Component {...pageProps} />;
    else return <GoogleAuth />;
  };

withAuth.displayName = "withAuth";
export default withAuth;
