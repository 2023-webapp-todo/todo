import { Navigate, useOutletContext } from "react-router-dom";
import Calender from "@/components/Calendar";
import styles from "./styles.module.scss";
import Feed from "@/components/Feed";

export default function Todo() {
  const authState = useOutletContext();
  // if (!authState) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div className={styles.container}>
      <ul className={styles.friends}>
        <li>무지</li>
        <li>레오</li>
        <li>라이언</li>
        <li>프로도</li>
        <li>춘식</li>
      </ul>
      <div className={styles.content}>
        <Calender />
        <Feed />
      </div>
    </div>
  );
}
