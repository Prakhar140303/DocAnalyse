import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Recent from "./Components/Recent.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import {Toaster} from 'react-hot-toast'
function App() {
  return (
  
<div className="flex gap-2 bg-primary-extralight w-full text-primary-dark h-screen">
  <Toaster/>
  {/* Sidebar */}
  <div className="flex-[1] hidden md:block h-screen sticky top-0">
    <Sidebar />
  </div>

  {/* Main content */}
  <div className="flex-[4] flex flex-col p-4 h-screen overflow-y-auto">
    <Header />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recent" element={<Recent />} />
      </Routes>
    </div>
  </div>
</div>

  );
}

export default App;
