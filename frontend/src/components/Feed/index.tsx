import { BsPlusCircle } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import styles from "./styles.module.scss";
import { useRecoilValue } from "recoil";
import TodoIconSvg from "../Calendar/TodoIconSvg.tsx";
import useInput from "@/hooks/useInput";
import { ITodoItem } from "@/types/todoItem";
import selectedDateState from "@/stores/selectedDate";
import { useEffect, useState } from "react";
import { createTodoAPI, deleteTodoAPI, updateTodoAPI } from "@/services/todo";

type FeedProps = {
  userId: string;
  todos: ITodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
};

export default function Feed({ userId, todos, setTodos }: FeedProps) {
  const [inputTodo, handleInputTodo, setInputTodo] = useInput("");
  const selectedDate = useRecoilValue(selectedDateState);

  const [selectedTodos, setSelectedTodos] = useState<ITodoItem[]>([]);

  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTodo === "") return;
    const newTodo = await createTodoAPI(userId, false, inputTodo, selectedDate);
    
    if (newTodo) {
      setTodos((prev) => [...prev, newTodo]);
    }
    setInputTodo("");
  };

  const updateTodo = async (todo_id: string) => {
    const updatedTodo = await updateTodoAPI(todo_id);
    if (updatedTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.todo_id === todo_id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = async (todo_id: string) => {
    await deleteTodoAPI(todo_id);
    const filteredTodos = todos.filter((todo) => todo.todo_id !== todo_id);
    setTodos(filteredTodos);
  };

  useEffect(() => {
    setSelectedTodos(todos.filter((todo) => todo.create_date === selectedDate));
  }, [selectedDate, todos]);

  return (
    <div className={styles.container}>
      <h1>FEED</h1>
      <form className={styles.inputWrapper} onSubmit={createTodo}>
        <input
          type="text"
          placeholder="할 일을 입력하세요."
          value={inputTodo}
          onChange={handleInputTodo}
        />
        <button type="submit">
          <BsPlusCircle />
        </button>
      </form>
      <ul className={styles.todoWrapper}>
        {selectedTodos.map((todo) => (
          <li key={todo.todo_id}>
            <button onClick={() => updateTodo(todo.todo_id)}>
              <TodoIconSvg colors={todo.checked ? ["#ec6130"] : ["#DBDDDF"]} />
            </button>
            <span>{todo.content}</span>
            <MdDeleteForever onClick={() => deleteTodo(todo.todo_id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
