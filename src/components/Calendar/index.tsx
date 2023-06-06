import dayjs from "dayjs";
import left from "@/assets/calenderLeft.png";
import right from "@/assets/calenderRight.png";
import styles from "./styles.module.scss";
import { useRecoilState } from "recoil";
import selectedDateState from "@/stores/selectedDate";
import RenderCalenderBoard from "./RenderCalendarBoard";
import { ITodoItem } from "@/types/todoItem";

const days = ["일", "월", "화", "수", "목", "금", "토"];

type CalendarProps = {
  todos: ITodoItem[];
};

export default function Calender({ todos }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const splited = selectedDate.split("/");

  const handleSelectDate = (v: string) => {
    setSelectedDate(v);
  };

  const handlePrevMonth = () => {
    const newDate = dayjs(selectedDate)
      .subtract(1, "month")
      .endOf("month")
      .format("MM/DD/YY");
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = dayjs(selectedDate)
      .add(1, "month")
      .startOf("month")
      .format("MM/DD/YY");
    setSelectedDate(newDate);
  };

  const board = RenderCalenderBoard(todos, selectedDate, handleSelectDate);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <p>
          20{splited[2]}년 {splited[0]}월
        </p>
        <div>
          <img src={left} onClick={handlePrevMonth} />
          <img src={right} onClick={handleNextMonth} />
        </div>
      </div>
      <div className={styles.days}>
        {days.map((v) => (
          <div key={v}>{v}</div>
        ))}
      </div>
      <div className={styles.board}>{board}</div>
    </div>
  );
}
