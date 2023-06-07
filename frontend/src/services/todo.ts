import { ITodoItem } from "@/types/todoItem";
import axios, { AxiosError } from "axios";

export const getTodosAPI = async (user_id: string) => {
  try {
    const response = await axios.get<ITodoItem[]>(
      `/api/getTodos.php?user_id=${user_id}`
    );
    return response.data;
  } catch (e) {
    alert((e as AxiosError<ErrorResponse>).response?.data.message);
  }
};

export const createTodoAPI = async (
  user_id: string,
  checked: boolean,
  content: string,
  createDate: string
) => {
  try {
    const response = await axios.get<ITodoItem>(
      `/api/createTodo.php?user_id=${user_id}&checked=${checked}&content=${content}&create_date=${createDate}`
    );
    return response.data;
  } catch (e) {
    alert((e as AxiosError<ErrorResponse>).response?.data.message);
  }
};

export const updateTodoAPI = async (todo_id: string) => {
  try {
    const response = await axios.get<ITodoItem>(
      `/api/updateTodo.php?todo_id=${todo_id}`
    );
    return response.data;
  } catch (e) {
    alert((e as AxiosError<ErrorResponse>).response?.data.message);
  }
};

export const deleteTodoAPI = async (todo_id: string) => {
  try {
    await axios.get(`/api/deleteTodo.php?todo_id=${todo_id}`);
  } catch (e) {
    alert((e as AxiosError<ErrorResponse>).response?.data.message);
  }
};

type ErrorResponse = {
  message: string;
};
