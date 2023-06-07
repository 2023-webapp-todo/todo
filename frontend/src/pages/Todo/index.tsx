import { Navigate, useOutletContext } from "react-router-dom";
import Calender from "@/components/Calendar";
import styles from "./styles.module.scss";
import Feed from "@/components/Feed";
import { useRecoilState, useRecoilValue } from "recoil";
import selectedProfileState from "@/stores/selectedProfile";
import Friends from "@/components/Friends";
import { useEffect, useState } from "react";
import { ITodoItem } from "@/types/todoItem";
import { getTodosAPI } from "@/services/todo";
import userIdState from '@/stores/userId';
import { IUser } from '@/types/user';
import { getUsersAPI } from '@/services/user';

export default function Todo() {


  const authState = useOutletContext();

  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const userId = useRecoilValue(userIdState) || "";
  const [selectedProfile, setSelectedProfile] = useRecoilState(selectedProfileState);

  const getUserTodos = async (userId: string) => {
    const userTodos = await getTodosAPI(userId);
    if (userTodos) {
      setTodos(userTodos);
    }
  };
  const getUsers = async () => {
    const users = await getUsersAPI(JSON.parse(localStorage.getItem("user") || "").user_id + "");
    if(users) {
      setUsers(users);
    }
  }

  useEffect(() => {
    getUserTodos(userId);
    
  }, [userId]);

  useEffect(() => {
    if(!localStorage.getItem("user")) return;
    setSelectedProfile(JSON.parse(localStorage.getItem("user") || "").nickname + "")

    getUsers();
  }, [setSelectedProfile])

  if (!authState) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={styles.container}>
      <Friends users={users}/>
      <h1 className={styles.username}>{selectedProfile}의 TODO</h1>
      <div className={styles.content}>
        <Calender todos={todos} />
        <Feed userId={userId} todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}
