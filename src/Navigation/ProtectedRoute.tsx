import React, { ReactElement, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTokenContext } from '../TokenProvider';

type ProtectedRouteProps = {
    children: React.ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [token] = useTokenContext();
  const location = useLocation();
  if (token) return React.Children.only(children as ReactElement);
  return <Navigate to="/auth" state={{ from: location }} replace />;
};
