import { FC, useState } from "react";
import styles from "./Pi.module.css";

interface State {
  node: string;
  uptime: string;
  memory: string;
  cpu: string;
  temperature: string;
  fanspeed: string;
  disk: {
    total: string;
    used: string;
    available: string;
  };
}

// TODO: figure out how to change the colour for the whole page within a child component.......

export const Pi: FC = () => {
  const initialState: State = {
    node: "some hostname",
    uptime: "some time",
    memory: "100MB approx",
    cpu: "10% approx",
    temperature: "hotter than the sun",
    fanspeed: "1000 approx",
    disk: {
      total: "10Gb",
      used: "4Gb",
      available: "6Gb Approx",
    },
  };

  const [state] = useState(initialState);
  return (
      <div className={styles["container"]}>
        <h1>Raspberry Pi ({state.node})</h1>
        <section>
          <h2>uptime</h2>
          <ul>
            <li>{state.uptime}</li>
          </ul>
        </section>
        <section>
          <h2>OS info</h2>
          <ul>
            <li>{state.memory} of memory used</li>
            <li>{state.cpu} of CPU used</li>
            <li>cpu temperature {state.temperature}</li>
            <li>fan speed {state.fanspeed}</li>
          </ul>
        </section>
        <section>
          <h2>disk space</h2>
          <ul>
            <li>{state.disk.total} total</li>
            <li>{state.disk.used} used</li>
            <li>{state.disk.available} available</li>
          </ul>
        </section>
      </div>
  );
};
