import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import Paper from "./pages/paper";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="paper" element={<Paper />} />

      {/* <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path=":city" element={<City />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
);
