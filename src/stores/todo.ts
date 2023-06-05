import { atom } from "recoil";
import { ITodoItem } from "@/types/todoItem";
import dayjs from "dayjs";

const initialState: ITodoItem[] = [
  {
    label: "과제 시작하기",
    isDone: true,
    date: dayjs(new Date("2023-6-3")).format("MM/DD/YY"),
    id: "1",
  },
  {
    label: "과제 완료 토글 구현하기",
    isDone: true,
    date: dayjs(new Date()).format("MM/DD/YY"),
    id: "2",
  },
  {
    label: "검정치마 노래듣기",
    isDone: false,
    date: dayjs(new Date()).format("MM/DD/YY"),
    id: "3",
  },
];

export const todoState = atom<ITodoItem[]>({
  key: "todo",
  default: initialState,
});
