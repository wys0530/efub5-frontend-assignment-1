import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { DefaultLayout } from "./components/Layout/DefaultLayout";
import Home from "./pages/Home";
import PlayList from "./pages/PlayList";
import Navbar from "./components/Navigation/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={<PlayList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
