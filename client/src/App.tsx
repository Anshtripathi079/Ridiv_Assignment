import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Forecast from "./pages/Forecast";
import Error from "./pages/Error";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen dark:bg-[#131216] dark:text-white text-black bg-[#f5f6fd] ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
