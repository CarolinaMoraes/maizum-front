import { UserLoggedContext } from "@/contexts/userLoggedContext";
import apiClient from "@/utils/axiosBaseUtils";
import { useContext } from "react";
import useLocalStorage from "../useLocalStorage";

type decodedJwt = {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
};

export default function useAuth() {
  const [, setValue, removeItem] = useLocalStorage("accessToken", null);
  const { setLoggedUser } = useContext(UserLoggedContext);

  const login = async (email: string, password: string) => {
    try {
      const { data: authData } = await apiClient().post(`/auth/signin`, {
        email,
        password,
      });

      const decodedJwt = decodeJwt(authData.access_token);

      setValue(authData.access_token);

      const { data: userData } = await apiClient().get(
        `/users/${decodedJwt.sub}`
      );

      setLoggedUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    removeItem();
  };

  return { login, logout };
}

function decodeJwt(token: string): decodedJwt {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
