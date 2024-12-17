import { RegisterUserPayload } from "@/types/registerUserPayload";
import apiClient from "@/utils/axiosBaseUtils";

export default function useRegisterUser() {
  const registerUser = async (registerUserPayload: RegisterUserPayload) => {
    try {
      const { data } = await apiClient().post("/users", registerUserPayload);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { registerUser };
}
