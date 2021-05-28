import React from 'react';
import styles from './DateRangeSelector.module.css';

interface Props {
  dateRangeId: string
  label: string
}

export class DateRangeSelector extends React.Component<Props> {

  render() {

    return (
      <span>
      <input type="radio" name="tab" value={this.props.dateRangeId} id={this.props.dateRangeId} />
      <label htmlFor={this.props.dateRangeId}>{this.props.label}</label>
      </span>
    );
  }

}