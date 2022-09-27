import { JWT_Decode } from "@backend/apis/user";
import jwt_decode from "jwt-decode";

export const validateToken = async (token: string) => {
  let decoded: JWT_Decode;

  try {
    decoded = await jwt_decode(token!);

    const user = {
      email: decoded.email,
      name: decoded.name,
      image: decoded.picture,
    };

    return { user, isAuth: true };
  } catch (err) {
    return { user: {}, isAuth: false };
  }
};
