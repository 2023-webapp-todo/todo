import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TodoIconSvg from "../TodoIconSvg.tsx";
import useTodoInfo from "../useTodoInfo";
import { ReactComponent as CheckIcon } from "@/assets/check.svg";

export default function RenderCalenderBoard(
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
        <CalenderItem date={v} handleSelectDate={handleSelectDate} />
      )}
    </div>
  ));

  return content;
}

type CalenderItemProps = {
  date: string;
  handleSelectDate: (v: string) => void;
};

const CalenderItem = ({ date, handleSelectDate }: CalenderItemProps) => {
  const { count, isDone } = useTodoInfo(date);
  return (
    <>
      <button onClick={() => handleSelectDate(date)}>
        <span className={styles.count}>{count !== 0 && count}</span>
        <TodoIconSvg colors={["#bbbbbb"]} />
        {isDone && <CheckIcon className={styles.check} />}
      </button>
      <span className="date">{dayjs(date).date()}</span>
    </>
  );
};
