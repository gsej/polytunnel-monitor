import { useEffect, useState } from "react";
import styles from "./Plug.module.css";
import { loadPlugState } from "./state/api";
import { PlugState } from "./state/plug/PlugState";

export const Plug = () => {

  const initialState: PlugState = {
    power: "Unknown"
  };

const [state, setState] = useState(initialState);

useEffect(() => {
  const fetchInitialState = async () => {
      const plugState = await loadPlugState();
      setState(plugState);
  };
  fetchInitialState();
}, []);

  return (
      <div className={styles["plug-container"]}>
        <section>
          <label>{state.power}</label>
        </section>
      </div>
  );
};