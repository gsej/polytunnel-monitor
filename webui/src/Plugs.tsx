import React, { FC, useState } from "react";
import styles from "./Plugs.module.css";
import { plugs } from "./state/plug/plugs";
import { Plug } from "./Plug";

export const Plugs: FC = () => {

  const [apiKey, setApiKey] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey( event.target.value);
  } 

  return (
    <div>
      <label htmlFor="api-key" >Api Key</label>
      <input type="text" id="api-key" onChange={handleChange} required />
      {plugs.map(plug => { return <Plug key={plug.plugName} plugName={plug.plugName} description={plug.description} apiKey={apiKey} /> })}
      <section>
      </section>
    </div>
  );
};