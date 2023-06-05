import { Navigate, useOutletContext } from "react-router-dom";
import Calender from "@/components/Calendar";

export default function Todo() {
  const authState = useOutletContext();

  // if (!authState) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div>
      <ul>
        <li>무지</li>
        <li>레오</li>
        <li>라이언</li>
        <li>프로도</li>
        <li>춘식</li>
      </ul>
      <div>
        <Calender />
      </div>
    </div>
  );
}
