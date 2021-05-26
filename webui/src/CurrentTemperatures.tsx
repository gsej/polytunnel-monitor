import React from 'react';
import styles from './CurrentTemperatures.module.css';

interface Props {
  insideTemperature: number | null,
  outsideTemperature: number | null
}

export class CurrentTemperatures extends React.Component<Props> {

  render() {

    return (
      <div className={styles.temperatures}>
        <div>Current Temperature Inside: <span>{this.props.insideTemperature !== null ? this.props.insideTemperature : 'Unavailable'}</span>&#176;C</div>
        <div>Current Temperature Outside: <span>{this.props.outsideTemperature !== null ? this.props.outsideTemperature : 'Unavailable'}</span>&#176;C</div>
      </div>
    );
  }

}