import { Navigate, useOutletContext } from "react-router-dom";
import Calender from "@/components/Calendar";
import styles from "./styles.module.scss";
import Feed from "@/components/Feed";
import { useRecoilValue } from "recoil";
import selectedProfileState from "@/stores/selectedProfile";
import Friends from "@/components/Friends";
import { useEffect, useState } from "react";
import { ITodoItem } from "@/types/todoItem";
import { getTodosAPI } from "@/services/todo";

export default function Todo() {
  const authState = useOutletContext();

  const [todos, setTodos] = useState<ITodoItem[]>([]);

  const getUserTodos = async () => {
    const userTodos = await getTodosAPI("1");
    if (userTodos) {
      setTodos(userTodos);
    }
  };

  const selectedProfile = useRecoilValue(selectedProfileState);

  useEffect(() => {
    getUserTodos();
  }, []);

  if (!authState) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={styles.container}>
      <Friends />
      <h1 className={styles.username}>{selectedProfile}의 TODO</h1>
      <div className={styles.content}>
        <Calender todos={todos} />
        <Feed todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}
