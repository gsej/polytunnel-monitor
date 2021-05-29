import React from 'react';
import './DateRangeSelector.module.css';

interface Props {
  dateRangeId: string;
  label: string;
  selected: boolean;
  onChange: (dateRangeId: string) => void;
}

export class DateRangeSelector extends React.Component<Props> {

  handleChange = () => (
    this.props.onChange(this.props.dateRangeId)
  );

  render() {

    return (
      <span>
        <input type="radio" name="tab"
          value={this.props.dateRangeId}
          id={this.props.dateRangeId}
          checked={this.props.selected}
          autoFocus={this.props.selected}
          onChange={this.handleChange}/>
        <label htmlFor={this.props.dateRangeId}>{this.props.label}</label>
      </span>
    );
  }

}