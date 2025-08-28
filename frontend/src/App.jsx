import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Recent from "./Components/Recent.jsx";

function App() {
  return (
  
      <div className="flex gap-2 bg-primary-extralight w-full h-screen text-primary-dark">
        {/* Sidebar */}
        <div className="flex-[1]">
          <Sidebar />
        </div>

        {/* Main content with header + routed pages */}
        <div className="flex-[4] flex flex-col p-4 h-full">
          <Header />

          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recent" element={<Recent />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
