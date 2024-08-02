import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectRoute from './components/protected/ProtectRoute';
import HomePage from './components/pages/HomePage/index';
import SignUp from './components/pages/SignUp/index';
import Login from './components/pages/Login/index';
import StoreManagement from './components/pages/StoreManagement/index';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store-management" element={
          <ProtectRoute>
            <StoreManagement />
          </ProtectRoute>
          
        } />
      </Routes>
    </Router>
  );
};

export default App;
