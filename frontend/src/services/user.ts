import { IUser } from "@/types/user";
import axios, { AxiosError } from "axios";

export const SignUpAPI = async (
  login_id: string,
  password: string,
  nickname: string
) => {
  try {
    const response = await axios.get(
      `/api/signupUser.php?login_id=${login_id}&password=${password}&nickname=${nickname}`
    );
    return response.data;
  } catch (e) {
    alert((e as AxiosError<ErrorResponse>).response?.data.message);
  }
};

export const LoginAPI = async (login_id: string, password: string) => {
  try {
    const response = await axios.get(
      `/api/loginUser.php?login_id=${login_id}&password=${password}`
    );
    return response.data;
  } catch (e) {
    alert((e as AxiosError<ErrorResponse>).response?.data.message);
  }
};

export const getUsersAPI = async (user_id: string) => {
  try {
    const response = await axios.get<IUser[]>(
      `/api/getUsers.php?user_id=${user_id}`
    );
    return response.data;
  } catch (e) {
    alert((e as AxiosError<ErrorResponse>).response?.data.message);
  }
};

type ErrorResponse = {
  message: string;
};
