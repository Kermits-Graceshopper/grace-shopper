import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { setCurrentUser } from './loginSlice';
// import { authenticate } from './authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const dispatch = useDispatch()
    // const method = props.method
    const logIn = async (e) => {
        e.preventDefault();
        await axios.post('/api/login', {
            email,
            password
        }).then(res => {
            // dispatch(setCurrentUser({firstName: res.data.fname, lastName: res.data.lname, email: res.data.email}));
            window.location.replace(res.data.redirectTo)
        });
        setEmail('');
        setPassword('');
        // dispatch(authenticate( email, password, method ))
    }

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={logIn}>
                <div>
                    <label htmlFor="email">
                        <small>Email</small>
                    </label>
                    <input
                        id='email'
                        name="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        <small>Password</small>
                    </label>
                    <input
                        id='password'
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}

export default Login