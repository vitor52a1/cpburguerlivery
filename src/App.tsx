import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hamburgers from "./pages/Hamburgers/Hamburgers";
import Entradinhas from "./pages/Entradinhas/Entradinhas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hamburgers" element={<Hamburgers />} />
        <Route path="/entradas" element={<Entradinhas />} />
      </Routes>
    </BrowserRouter>
  );
}
