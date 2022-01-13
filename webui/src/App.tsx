import "./App.css";
import { Navigation } from "./Navigation";
import { Temperatures } from "./Temperatures";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TunnelCam } from "./TunnelCam";
import { Pi } from "./Pi";
import { Nginx } from "./Nginx";
import { TunnelCamProvider } from "./state/tunnelcam/TunnelCamContext";
export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/temperatures" element={<Temperatures />}></Route>
          <Route path="/tunnelcam" element={<TunnelCamProvider><TunnelCam /></TunnelCamProvider>}></Route>
          <Route path="/pi" element={<Pi />}></Route>
          <Route path="/nginx" element={<Nginx />}></Route>
          <Route path="*" element={<Navigate to="/temperatures" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
