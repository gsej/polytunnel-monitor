import "./App.css";
import { Navigation } from "./Navigation";
import { Temperatures } from "./Temperatures";

export const App = () => {
  return (
    <main>
      <Navigation />
      <Temperatures />
    </main>
  );
};
