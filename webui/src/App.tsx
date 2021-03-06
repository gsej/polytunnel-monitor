import "./App.css";
import { Navigation } from "./Navigation";
import { Temperatures } from "./Temperatures";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TunnelCam } from "./TunnelCam";
import { Pi } from "./Pi";
import { Swagger } from "./Swagger";
import { Plugs } from "./Plugs";
export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/temperatures" element={<Temperatures />}></Route>
          <Route path="/tunnelcam" element={<TunnelCam />}></Route>
          <Route path="/pi" element={<Pi />}></Route>
          <Route path="/swagger" element={<Swagger />}></Route>
          <Route path="/plugs" element={<Plugs />}></Route>
          <Route path="*" element={<Navigate to="/temperatures" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
