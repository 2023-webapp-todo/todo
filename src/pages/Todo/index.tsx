import { Navigate, useOutletContext } from "react-router-dom";
import Calender from "@/components/Calendar";
import styles from "./styles.module.scss";
import Feed from "@/components/Feed";
import { useRecoilValue } from "recoil";
import selectedProfileState from "@/stores/selectedProfile";
import Friends from "@/components/Friends";

export default function Todo() {
  const authState = useOutletContext();
  const selectedProfile = useRecoilValue(selectedProfileState);
  // if (!authState) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div className={styles.container}>
      <Friends />
      <h1 className={styles.username}>{selectedProfile}의 TODO</h1>
      <div className={styles.content}>
        <Calender />
        <Feed />
      </div>
    </div>
  );
}
