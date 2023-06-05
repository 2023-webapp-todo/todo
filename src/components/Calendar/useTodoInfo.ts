import { useRecoilValue } from "recoil";
import { todoState } from "@/stores/todo";

const useTodoInfo = (date: string) => {
  const todos = useRecoilValue(todoState);
  const currentTodos = todos.filter((todo) => todo.date === date);
  const count = currentTodos.filter((todo) => !todo.isDone).length;
  const isDone = count === 0 && currentTodos.length !== 0;

  return { count, isDone };
};

export default useTodoInfo;
