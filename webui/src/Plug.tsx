import React, { FC, useEffect, useState } from "react";
import styles from "./Plug.module.css";
import { loadPlugState, togglePlugState } from "./state/api";
import { PlugState } from "./state/plug/PlugState";

interface Props {
  plugName: string;
  description: string;
}


export const Plug: FC<Props> = ({ plugName, description }) => {

  const initialState: PlugState = {
    powerOn: null
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchInitialState = async () => {
      const plugState = await loadPlugState(plugName);
      setState(plugState);
    };
    fetchInitialState();
  }, [plugName]);

//   const togglePlug = async(plugName: string) =>  {
//     await togglePlugState(plugName);
//   }

  const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) =>{
//    // event.stopPropagation();

    await togglePlugState(plugName);
  }


  return (
    <div className={styles["plug-container"]}>
      <section>
        <h2>{description}</h2>
        <button onClick={buttonHandler}>{state.powerOn ? "On - Click to turn off" : "Off - Click to turn on"}</button>
      </section>
    </div>
  );
};