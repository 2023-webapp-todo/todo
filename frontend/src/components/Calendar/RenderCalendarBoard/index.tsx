import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TodoIconSvg from "../TodoIconSvg.tsx";
import useTodoInfo from "../useTodoInfo";
import { ReactComponent as CheckIcon } from "@/assets/check.svg";
import { ITodoItem } from "@/types/todoItem";

export default function RenderCalenderBoard(
  todos: ITodoItem[],
  selectedDay: string,
  handleSelectDate: (v: string) => void
) {
  const [arr, setArr] = useState<(string | null)[]>([null]);

  useEffect(() => {
    const initArr = (firstDay: number, daysInMonth: number) => {
      return Array.from({ length: firstDay + daysInMonth }, (v, i) =>
        i < firstDay
          ? null
          : dayjs(selectedDay)
              .startOf("month")
              .set("date", i - firstDay + 1)
              .format("MM/DD/YY")
      );
    };
    const firstDay = dayjs(selectedDay).startOf("month").day();
    const daysInMonth = dayjs(selectedDay).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
  }, [selectedDay]);

  const content = arr.map((v, i) => (
    <div
      className={selectedDay === v ? styles.selectedItem : styles.item}
      key={v ? v.toString() : `${v}${i}`}
    >
      {v && ( //TODO
        <CalenderItem
          date={v}
          selectedDay={selectedDay}
          todos={todos}
          handleSelectDate={handleSelectDate}
        />
      )}
    </div>
  ));

  return content;
}

type CalenderItemProps = {
  date: string;
  selectedDay: string;
  todos: ITodoItem[];
  handleSelectDate: (v: string) => void;
};

const CalenderItem = ({
  date,
  selectedDay,
  todos,
  handleSelectDate,
}: CalenderItemProps) => {
  const { count, isDone } = useTodoInfo(date, todos);
  const isSelectedDate = selectedDay === date;
  return (
    <>
      <button onClick={() => handleSelectDate(date)}>
        <span className={styles.count}>{count !== 0 && count}</span>
        <TodoIconSvg colors={isSelectedDate ? ["#ec6130"] : ["#DBDDDF"]} />
        {isDone && (
          <CheckIcon
            className={isSelectedDate ? styles.selectedCheck : styles.check}
          />
        )}
      </button>
      <span className={styles.date}>{dayjs(date).date()}</span>
    </>
  );
};
