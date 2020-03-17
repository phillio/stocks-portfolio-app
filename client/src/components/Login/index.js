import React from 'react';
import LoginForm from '../LoginForm';
import { Link } from 'react-router-dom';
import './Login.css'

function Login(props) {
    return (
        <div className="login-container" >
            <h1>Login</h1>
            <LoginForm {...props} />
            <div className="link-link" className="link-signup" ><Link to="/signup">New? Signup here</Link></div>
        </div>
    )
}

export default Login