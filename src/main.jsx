import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home';
import About from './pages/about';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      {/* <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path=":city" element={<City />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
);
