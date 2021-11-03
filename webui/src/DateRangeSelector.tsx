import React, { ChangeEvent } from "react";
import { DateRange } from "./state/DateRange";
import "./DateRangeSelector.module.css";

interface Props {
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  onChange: (dateRangeId: string) => void;
}

export class DateRangeSelector extends React.Component<Props> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return this.props.dateRanges.map((dateRange) => (
      <span>
        <input
          type="radio"
          name="tab"
          value={dateRange.dateRangeId}
          id={dateRange.dateRangeId}
          checked={dateRange.dateRangeId === this.props.selectedDateRangeId}
          autoFocus={dateRange.dateRangeId === this.props.selectedDateRangeId}
          onChange={this.handleChange}
        />
        <label htmlFor={dateRange.dateRangeId}>{dateRange.label}</label>
      </span>
    ));
  }
}
