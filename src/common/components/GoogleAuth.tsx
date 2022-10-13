import React from "react";
import axios, { AxiosResponse } from "@lib/axios";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { User } from "types/User";
import PageLayout from "@layouts/PageLayout";
import { userStore } from "@utils/store";
import { useRouter } from "next/router";
import { H1, H3, Label, P } from "@elements/Text";

type ResponseProps = {
  user: User;
} & AxiosResponse;

const GoogleAuth: React.FC = () => {
  const router = useRouter();

  const { setProfile } = userStore((state) => state);

  const onSuccess = async ({ credential }: CredentialResponse) => {
    const token = credential;
    localStorage.setItem("token", token!);

    const data: ResponseProps = await axios.post("/user/create", {
      token,
    });

    toast.success(data.message);
    setProfile(data.user);

    const isProfileComplete = !!(data.user?.bio && data.user?.username);

    if (isProfileComplete) {
      router.push("/");
    } else {
      router.push("/profile");
    }
  };

  return (
    <PageLayout
      title="Login"
      className="grid place-content-center justify-items-center gap-4"
    >
      <div className="text-center">
        <H1 className="">Login to continue</H1>
        <Label>{"(One click login)"}</Label>
      </div>

      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          localStorage.removeItem("token");
          toast.error("Login Failed");
        }}
        useOneTap
        auto_select
        cancel_on_tap_outside={false}
      />
    </PageLayout>
  );
};

export default GoogleAuth;
