import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import ThreeDemoView from "../views/ThreeDemoView";
import LayoutsView from "../views/LayoutsView";
import SpeechDemoView from "../views/SpeechDemoView";
import GeometryExplorer from "../views/GeometryExplorer";
import SettingsView from "../views/SettingsView";

import SolarSystem from "../components/SolarSystem";
import GeometryShapes from "../components/GeometryShapes";
import ColombianRegions from "../components/ColombianRegions";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="tts" element={<SpeechDemoView />} />
        <Route path="three_2" element={<GeometryExplorer />} />
        <Route path="settings" element={<SettingsView />} />
        <Route path="sistemasolar" element={<SolarSystem />} />
        <Route path="figurasgeometricas" element={<GeometryShapes />} />
        <Route path="regionescolombia" element={<ColombianRegions />} />
        
      </Route>
    </Routes>
  );
}