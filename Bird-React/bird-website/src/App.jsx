import "./App.css";
import { Routes, Route } from "react-router-dom"; 

import Home from "./pages/Home";
import AddSpecies from "./pages/AddSpecies";
import TablePage from "./pages/TablePage";
import SpeciesDetails from "./pages/SpeciesDetails";
import AddImage from "./pages/AddImage";
import DetectionIA from "./pages/DetectionIA";

function App() {
  return (
    <div className="app-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-species" element={<AddSpecies />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/species/:id" element={<SpeciesDetails />} />
        <Route path="/add-image" element={<AddImage />} />
        <Route path="/detection" element={<DetectionIA />} />
      </Routes>
    </div>
  );
}

export default App;