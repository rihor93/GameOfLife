import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth';
import ControlComponent from '../gameOfLife2/ControlComponent';
import NotFound from '../NotFound/NotFound';
import { ProtectedRoute } from './ProtectedRoute';



const mainElement = (
  <ProtectedRoute>

      <Routes>
        <Route index element={<ControlComponent />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>

  </ProtectedRoute>
);

type NavigationProps = {
    children: React.ReactNode
}

export const Navigation: FC<NavigationProps> = ({ children }) => (
  // рассказать про basename
  // <BrowserRouter basename="company/1">
  <BrowserRouter>
    {children}
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={mainElement} />
    </Routes>
  </BrowserRouter>
);
