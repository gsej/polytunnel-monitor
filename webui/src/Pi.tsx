import { useEffect, useState } from "react";
import styles from "./Pi.module.css";
import { loadPiStatus } from "./state/api";
import { PiStatus } from "./state/pi/PiStatus";

// TODO: figure out how to change the colour for the whole page within a child component.......

export const Pi = () => {

  const initialState: PiStatus = {
    node: "Unknown",
    uptime: "Unknown",
    memory: "Unknown",
    cpu: "Unknown",
    temperature: "Unknown",
    fanspeed: "Unknown",
    disk: {
      total: "Unknown",
      used: "Unknown",
      available: "Unknown",
    },
  };

const [state, setState] = useState(initialState);

useEffect(() => {
  const fetchInitialState = async () => {
      const piState = await loadPiStatus();
      setState(piState);
  };
  fetchInitialState();
}, []);

  return (
      <div className={styles["pi-container"]}>
        <h1>Raspberry Pi</h1>
        <section>
          <h2>host</h2>
          <ul>
            <li>{state.node}</li>
          </ul>
        </section>
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
            <li>cpu temperature <span dangerouslySetInnerHTML={{ __html: state.temperature }}></span></li>
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