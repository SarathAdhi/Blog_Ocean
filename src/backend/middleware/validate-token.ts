import { getUserByEmail, JWT_Decode } from "@backend/apis/user";
import jwt_decode from "jwt-decode";

export const validateToken = async (token: string) => {
  let decoded: JWT_Decode;

  try {
    decoded = await jwt_decode(token!);

    const user = await getUserByEmail(decoded.email as string);

    return { user, isAuth: true };
  } catch (err) {
    return { user: {}, isAuth: false };
  }
};
