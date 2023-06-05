import { atom, selector } from "recoil";
import { ITodoItem } from "@/types/todoItem";
import dayjs from "dayjs";
import selectedDateState from "./selectedDate";

const initialState: ITodoItem[] = [
  {
    label: "과제 시작하기",
    isDone: true,
    date: dayjs(new Date("2023-6-3")).format("MM/DD/YY"),
    id: "1",
  },
  {
    label: "과제 완료 토글 구현하기",
    isDone: false,
    date: dayjs(new Date()).format("MM/DD/YY"),
    id: "2",
  },
];

export const todoState = atom<ITodoItem[]>({
  key: "todo",
  default: initialState,
});

export const selectTodoState = selector<ITodoItem[]>({
  key: "selectTodo",
  get: ({ get }) => {
    const todos = get(todoState);
    const selectedDate = get(selectedDateState);
    const selectedTodo = todos.filter((todo) => todo.date === selectedDate);
    return selectedTodo;
  },
});
