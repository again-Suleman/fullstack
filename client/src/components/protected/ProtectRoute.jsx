import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to='/login' />;
}


ProtectRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
