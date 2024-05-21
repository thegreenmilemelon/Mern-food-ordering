import axios from "axios";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUSer = () => {
  const createMyUserRequest = async (user: CreateUserRequest) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/my/user`, user);

      return response.data;
    } catch (error) {
      throw new Error("faied to create user");
    }
  };
  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { createUser, isLoading, isSuccess };
};
