import { FC } from "react";
import styles from "./CurrentTemperatures.module.css";

interface Props {
  insideTemperature: number | null;
  outsideTemperature: number | null;
}

export const CurrentTemperatures: FC<Props> = ({ insideTemperature, outsideTemperature }) => {
  return (
    <div className={styles.temperatures}>
      <div>
        Current Temperature Inside: <span>{insideTemperature !== null ? insideTemperature + "\u00B0C" : "Unavailable"}</span>
      </div>
      <div>
        Current Temperature Outside: <span>{outsideTemperature !== null ? outsideTemperature + "\u00B0C" : "Unavailable"}</span>
      </div>
    </div>
  );
};
