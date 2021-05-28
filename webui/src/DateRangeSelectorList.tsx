import React from 'react';
import { DateRange } from './daterange';
import { DateRangeSelector } from './DateRangeSelector';
import styles from './DateRangeSelectors.module.css';

interface Props {
  dateRanges: DateRange[],
  // selectedDateRange: DateRange
}

export class DateRangeSelectorList extends React.Component<Props> {

  render() {

    return (
      this.props.dateRanges.map(dateRange => (
        <DateRangeSelector
          key={dateRange.dateRangeId}
          dateRangeId={dateRange.dateRangeId}
          label={dateRange.label}
        />
      ))

    );
  }

}