import React from 'react';
import { useAuth } from './Authentication';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { authUser } = useAuth();

    return authUser ? children : <Navigate to="/Login" />;
}

export default PrivateRoute;
