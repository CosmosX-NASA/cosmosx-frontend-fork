import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Background from "./components/Background";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/home";
import Paper from "./pages/paper";
import ResearchGap from "./pages/researchGap";
import Hypothesis from "./pages/hypothesis";

const root = document.getElementById("root");
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <Background />
    <div className="relative z-10">
      {" "}
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/paper" element={<Paper />} />
          <Route path="/research-gap" element={<ResearchGap />} />
          <Route path="/Hypothesis" element={<Hypothesis />} />
        </Routes>
      </BrowserRouter>
    </div>
  </QueryClientProvider>
);
