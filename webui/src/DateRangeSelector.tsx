import { ChangeEvent, FC } from "react";
import { DateRange } from "./state/temperatures/DateRange";
import styles from "./DateRangeSelector.module.css";

interface Props {
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  onChange: (dateRangeId: string) => void;
}

export const DateRangeSelector: FC<Props> = ({ dateRanges, selectedDateRangeId, onChange }) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div>
      {dateRanges.map((dateRange) => (
        <span key={dateRange.dateRangeId}>
          <input
            type="radio"
            name="tab"
            value={dateRange.dateRangeId}
            id={dateRange.dateRangeId}
            checked={dateRange.dateRangeId === selectedDateRangeId}
            autoFocus={dateRange.dateRangeId === selectedDateRangeId}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor={dateRange.dateRangeId}>{dateRange.label}</label>
        </span>
      ))}
    </div>
  );
};
