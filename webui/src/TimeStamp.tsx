import React from 'react';

interface Props {
  timestamp: Date | null
}

export class TimeStamp extends React.Component<Props> {

  render() {

    let timestamp = "Unavailable"

    if (this.props.timestamp) {
      const hours = this.padToTwoDigits(this.props.timestamp.getUTCHours());
      const minutes = this.padToTwoDigits(this.props.timestamp.getMinutes());
      const seconds = this.padToTwoDigits(this.props.timestamp.getSeconds());
      timestamp = `${hours}:${minutes}:${seconds}`
    }

    return (
      <div>
        {timestamp}
      </div>
    );
  }

  padToTwoDigits = (n: number) => {
    if (n > 9) {
      return "" + n;
    }
    else {
      return "0" + n;
    }

  }
}