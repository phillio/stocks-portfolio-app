import React from 'react';
import SignupForm from '../SignupForm';
import { Link } from 'react-router-dom';
import './Signup.css'

function Signup(props) {
    return (
        <div className="signup-container">
            <h1>Signup</h1>
            <SignupForm {...props} />
            <div className="link-link" className="link-login" ><Link to="/login">Already Registered? Login</Link></div>
        </div>
    )
}

export default Signup