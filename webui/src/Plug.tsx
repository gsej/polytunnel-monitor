import React, { FC, useEffect, useState } from "react";
import styles from "./Plug.module.css";
import { loadPlugState, togglePlugState } from "./state/api";
import { PlugState } from "./state/plug/PlugState";

interface Props {
  plugName: string;
  description: string;
  apiKey: string;
}

export const Plug: FC<Props> = ({ plugName, description, apiKey }) => {

  const initialState: PlugState = {
    powerOn: null
  };

  const [state, setState] = useState(initialState);

  const [showError, setErrorState] = useState(false)

  useEffect(() => {
    const fetchInitialState = async () => {
      const plugState = await loadPlugState(plugName);
      setState(plugState);
    };
    fetchInitialState();
  }, [plugName]);

  const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {

    try {
      setErrorState(false);
      const newState = await togglePlugState(plugName, apiKey);
      setState({ powerOn: newState.powerOn });
    }
    catch (e) {
      setErrorState(true);
    }
  }

  // TODO: print error if the api key is missing.
  return (
    <div className={styles["plug-container"]}>
      <span>{apiKey}</span>
      {showError ? <span >this is an error</span> : ""}
      <section>
        <h2>{description}</h2>
        <button disabled={!apiKey} onClick={buttonHandler}>{state.powerOn ? "On - Click to turn off" : "Off - Click to turn on"}</button>
      </section>
    </div>
  );
}