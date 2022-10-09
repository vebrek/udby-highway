import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import MapPage from "./pages/Map";
import Stats from "./pages/Stats";

import logo from './logo.svg';
import './App.css';
import NavBar from "./components/navbar";

function App({viewState}) {
  console.log(viewState)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="map" element={<MapPage viewState={viewState}/>} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
