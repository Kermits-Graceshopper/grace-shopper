import React, { useState } from 'react'
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setToken } from './signUpSlice';
// import { authenticate } from './authSlice';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const signUp = async (e) => {
        e.preventDefault();
        if(password !== confirmedPassword){
            return setError('Passwords do not match')
        }
        try{
            setError('');
            const response = await axios.post('/api/signup', {
                email,
                password
            },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            setSuccess(true);
            setEmail('');
            setPassword('');
            setConfirmedPassword('');
        } catch(e){
            setError(e.toString());
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <h4 style={{color: 'red'}}>Error: {error}</h4>}
            <form onSubmit={signUp}>
                {/* <label htmlFor='fname'>First Name</label>
                <input 
                id='fname'
                value={fname}
                type='text'
                onChange={(e) => {setFName(e.target.value)}}
                />
                <label htmlFor='lname'>Last Name</label>
                <input 
                id='lname'
                value={lname}
                type='text'
                onChange={(e) => {setLName(e.target.value)}}
                /> */}
                <label htmlFor='email'>Email</label>
                <input 
                id='email'
                value={email}
                type='text'
                onChange={(e) => {setEmail(e.target.value)}}
                />
                <label htmlFor='password'>Password</label>
                <input 
                id='password'
                value={password}
                type='password'
                onChange={(e) => {setPassword(e.target.value)}}
                />
                <label htmlFor='confirmedPassword'>Confirm Password</label>
                <input 
                id='confirmedPassword'
                value={confirmedPassword}
                type='password'
                onChange={(e) => {setConfirmedPassword(e.target.value)}}
                />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp