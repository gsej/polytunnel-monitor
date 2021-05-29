import React from 'react';

interface Props {
  timeStamp: Date | null
}

export class TimeStamp extends React.Component<Props> {

  render() {

    let timestamp = "Unavailable"

    if (this.props.timeStamp) {
      const hours = this.padToTwoDigits(this.props.timeStamp.getUTCHours());
      const minutes = this.padToTwoDigits(this.props.timeStamp.getMinutes());
      const seconds = this.padToTwoDigits(this.props.timeStamp.getSeconds());
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