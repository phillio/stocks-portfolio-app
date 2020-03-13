import React from 'react';
import LoginForm from '../LoginForm';
import { Link } from 'react-router-dom';

function Login(props) {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm {...props} />
            <div><Link to="/signup">Signup here</Link></div>
        </div>
    )
}

export default Login