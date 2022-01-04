import { FC } from "react";
import styles from "./Pi.module.css";
import { usePiState } from "./state/pi/PiStateContext";

// TODO: figure out how to change the colour for the whole page within a child component.......

export const Pi: FC = () => {

  const { node, uptime, memory, cpu, temperature, fanspeed, disk } = usePiState();

  return (
      <div className={styles["pi-container"]}>
        <h1>Raspberry Pi ({node})</h1>
        <section>
          <h2>uptime</h2>
          <ul>
            <li>{uptime}</li>
          </ul>
        </section>
        <section>
          <h2>OS info</h2>
          <ul>
            <li>{memory} of memory used</li>
            <li>{cpu} of CPU used</li>
            <li>cpu temperature <span dangerouslySetInnerHTML={{ __html: temperature }}></span></li>
            <li>fan speed {fanspeed}</li>
          </ul>
        </section>
        <section>
          <h2>disk space</h2>
          <ul>
            <li>{disk.total} total</li>
            <li>{disk.used} used</li>
            <li>{disk.available} available</li>
          </ul>
        </section>
      </div>
  );
};