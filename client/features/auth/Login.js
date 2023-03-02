import React, { useRef, useState, useEffect, useContext } from 'react'
import AuthContext, { AuthProvider } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from '../api/axios'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setCurrentUser } from '../../app/reducers/userSlice';

const LOGIN_URL = '/api/login';


const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();
    // const user = useContext(AuthProvider());
    const dispatch = useDispatch();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
                });
            console.log(JSON.stringify(response?.data))
            dispatch(setCurrentUser({
                fullName: response?.data?.fullName,
                firstName: response?.data?.firstName,
                lastName: response?.data?.lastName,
                email: response?.data?.email,
                accessToken: response?.data?.accessToken,
                role: response?.data?.role
            }))
            setEmail('');
            setPassword('');
            setSuccess(true);
            // window.location.replace('/api/home');
        } catch (e) {
            if (!e) {
                setError('No server response')
            } else if (e.response?.status === 400) {
                setError('Missing email or password')
            } else if (e.response?.status === 401) {
                setError('Unauthorized');
            }
            console.log('ERROR IN CATCH OF handleLogin function IN LOGIN COMPONENT: ', e);
            errRef.current.focus();
        }
    }
    const user = useSelector(selectUser);
    const isNotValid = !email && !password

    return (
        <div>
            {
                success ?
                    <div className='successfulLogin'>
                        <h1>You're logged in!</h1>
                        <p>Go to <Link to='/api'>Home</Link></p>
                    </div>
                    :
                    <div className='loginBox'>
                        <div style={{ backgroundColor: 'red' }}>
                            <p ref={errRef} className={error ? 'errorMessage' : 'offScreen'} aria-live="assertive">{error}</p>
                        </div>
                        <h1>Log In</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                type='text'
                                ref={emailRef}
                                value={email}
                                autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email...'
                                required
                            />
                            <label htmlFor='password'>Password</label>
                            <input
                                id='password'
                                type='password'
                                placeholder='Password...'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button disabled={isNotValid} type='submit' className='btn btn-primary'>Log In</button>
                        </form>
                        <p>
                            Need an account? <br />
                            <span><Link to='/api/signup'>Sign Up</Link></span>
                        </p>
                    </div>
            }
        </div>

    )
}

export default Login