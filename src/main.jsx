import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import Paper from "./pages/paper";
import ResearchGap from "./pages/researchGap";
import Hypotheses from "./pages/hypotheses";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="paper" element={<Paper />} />
      <Route path="/research-gap" element={<ResearchGap />} />
      <Route path="/hypotheses" element={<Hypotheses />} />

      {/* <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path=":city" element={<City />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
);
