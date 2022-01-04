import "./App.css";
import { Navigation } from "./Navigation";
import { Temperatures } from "./Temperatures";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TunnelCam } from "./TunnelCam";
import { Pi } from "./Pi";
import { Nginx } from "./Nginx";
import { TemperatureStateProvider } from "./state/temperatures/TemperatureStateContext";
import { PiStateProvider } from "./state/pi/PiStateContext";
export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/temperatures" element={<TemperatureStateProvider><Temperatures /></TemperatureStateProvider>}></Route>
          <Route path="/tunnelcam" element={<TunnelCam />}></Route>
          <Route path="/pi" element={<PiStateProvider><Pi /></PiStateProvider>}></Route>
          <Route path="/nginx" element={<Nginx />}></Route>
          <Route path="*" element={<Navigate to="/temperatures" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
