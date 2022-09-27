import React from "react";
import axios, { AxiosResponse } from "@lib/axios";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { User } from "types/User";
import PageLayout from "@layouts/PageLayout";
import { userStore } from "@utils/store";

type ResponseProps = {
  user: User;
} & AxiosResponse;

const GoogleAuth: React.FC = () => {
  const { setProfile } = userStore((state) => state);

  const onSuccess = async ({ credential }: CredentialResponse) => {
    const token = credential;
    localStorage.setItem("token", token!);

    const data: ResponseProps = await axios.post("/user/create", {
      token,
    });

    toast.success(data.message);
    setProfile(data.user);
  };

  return (
    <PageLayout title="Login">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          localStorage.removeItem("token");
          toast.error("Login Failed");
        }}
        useOneTap
      />
    </PageLayout>
  );
};

export default GoogleAuth;
