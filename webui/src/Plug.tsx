import { FC, useEffect, useState } from "react";
import styles from "./Plug.module.css";
import { loadPlugState } from "./state/api";
import { PlugState } from "./state/plug/PlugState";

interface Props {
  plugName: string;
  description: string;
}


export const Plug : FC<Props> = ({ plugName, description }) => {

  const initialState: PlugState = {
    power: "Unknown"
  };

const [state, setState] = useState(initialState);

useEffect(() => {
  const fetchInitialState = async () => {
      const plugState = await loadPlugState(plugName);
      setState(plugState);
  };
  fetchInitialState();
}, [plugName]);

  return (
      <div className={styles["plug-container"]}>
        <section>
          <h2>{description}</h2>
          <button>{state.power === "On" ? "On - Click to turn off" : "Off - Click to turn on"}</button>
          </section>
      </div>
  );
};