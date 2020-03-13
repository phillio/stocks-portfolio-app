import React from 'react';
import SignupForm from '../SignupForm';
import { Link } from 'react-router-dom';

function Signup(props) {
    return (
        <div>
            <h1>Signup</h1>
            <SignupForm {...props} />
            <div><Link to="/login">Login</Link></div>
        </div>
    )
}

export default Signup