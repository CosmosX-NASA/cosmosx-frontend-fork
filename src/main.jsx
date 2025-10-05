import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home';
import Paper from './pages/paper';
import ResearchGap from './pages/researchGap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = document.getElementById('root');
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="paper" element={<Paper />} />
        <Route path="/research-gap" element={<ResearchGap />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
