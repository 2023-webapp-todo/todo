import { ITodoItem } from "@/types/todoItem";

const useTodoInfo = (date: string, todos: ITodoItem[]) => {
  const currentTodos = todos.filter((todo) => todo.date === date);
  const count = currentTodos.filter((todo) => !todo.isDone).length;
  const isDone = count === 0 && currentTodos.length !== 0;

  return { count, isDone };
};

export default useTodoInfo;
