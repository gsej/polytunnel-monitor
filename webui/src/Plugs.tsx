import { FC } from "react";
import styles from "./Plugs.module.css";
import { plugs } from "./state/plug/plugs";
import { Plug } from "./Plug";

export const Plugs: FC = () => {

  return (
    <div>
      {plugs.map( plug => {return <Plug plugName={plug.plugName} description={plug.description}/>})}
      <section>
      </section>
    </div>
  );
};