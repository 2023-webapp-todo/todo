import { BsPlusCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectTodoState, todoState } from "@/stores/todo";
import TodoIconSvg from "../Calendar/TodoIconSvg.tsx";
import useInput from "@/hooks/useInput";
import { ITodoItem } from "@/types/todoItem";
import { v4 as uuid } from "uuid";
import selectedDateState from "@/stores/selectedDate";

export default function Feed() {
  const [inputTodo, handleInputTodo, setInputTodo] = useInput("");
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedTodos = useRecoilValue(selectTodoState);
  const [todos, setTodos] = useRecoilState(todoState);

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: ITodoItem = {
      label: inputTodo,
      isDone: false,
      date: selectedDate,
      id: uuid(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setInputTodo("");
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };

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
          <li key={todo.id}>
            <button onClick={() => toggleTodo(todo.id)}>
              <TodoIconSvg colors={todo.isDone ? ["#ec6130"] : ["#DBDDDF"]} />
            </button>
            <span>{todo.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
