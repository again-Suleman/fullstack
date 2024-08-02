import React from 'react'
import { Link } from 'react-router-dom';

export default function index() {
  return (
    <>
       <div>
            <h1>Welcome to Store Management System</h1>
            <Link to="/signup">Sign Up</Link>  | 
            <Link to="/login">Login</Link>
        </div>
    </>
  )
}
