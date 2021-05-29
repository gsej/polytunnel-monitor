import React from 'react';
import { DateRange } from './daterange';
import { DateRangeSelector } from './DateRangeSelector';
import './DateRangeSelectorList.module.css';

interface Props {
  dateRanges: DateRange[];
  selectedDateRange: DateRange;
  onChange: (dateRangeId: string) => void;
}

export class DateRangeSelectorList extends React.Component<Props> {

  handleChange = (dateRangeId: string) => {
    this.props.onChange(dateRangeId)
  };

  render() {

    return (
      this.props.dateRanges.map(dateRange => (
        <DateRangeSelector
          key={dateRange.dateRangeId}
          dateRangeId={dateRange.dateRangeId}
          label={dateRange.label}
          selected={dateRange.dateRangeId === this.props.selectedDateRange.dateRangeId}
          onChange={this.handleChange}
        />
      ))

    );
  }

}