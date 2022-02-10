import { FC } from "react";

interface Props {
  timestamp: Date | null;
}

export const TimeStamp: FC<Props> = ({ timestamp }) => {
  const padToTwoDigits = (n: number) => {
    if (n > 9) {
      return "" + n;
    } else {
      return "0" + n;
    }
  };

  let timestampToShow = "Unavailable";
  if (timestamp) {
    const hours = padToTwoDigits(timestamp.getUTCHours());
    const minutes = padToTwoDigits(timestamp.getMinutes());
    const seconds = padToTwoDigits(timestamp.getSeconds());
    timestampToShow = `${hours}:${minutes}:${seconds}`;
  }

  return <div>{timestampToShow}</div>;
};
