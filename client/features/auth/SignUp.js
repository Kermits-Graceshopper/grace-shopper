import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../../app/reducers/userSlice";
import { Link } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { setToken } from './signUpSlice';
// import { authenticate } from './authSlice';
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const [email, setEmail] = useState("");
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [password, setPassword] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	// const dispatch = useDispatch();

	const signUp = async (e) => {
		e.preventDefault();
		if (password !== confirmedPassword) {
			return setError("Passwords do not match");
		}
		try {
			setError("");
			const response = await axios.post(
				"/api/signup",
				{
					fullName: first + " " + last,
					first,
					last,
					email,
					password,
                    guestId: sessionStorage.getItem('guestId')
				},
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true
				}
			);
			sessionStorage.setItem("accessToken", response?.data?.accessToken);
			sessionStorage.setItem("isAdmin", response?.data?.isAdmin);
			sessionStorage.setItem("userId", response?.data?.userId);
			sessionStorage.setItem("firstName", response?.data?.firstName);
			sessionStorage.setItem("lastName", response?.data?.lastName);
			sessionStorage.setItem("email", response?.data?.email);

			sessionStorage.removeItem("guestId");
			// setSuccess(true);
			setEmail("");
			setPassword("");
			setConfirmedPassword("");
            window.location.replace('/home');
		} catch (e) {
			setError(e.toString());
		}
	};
	const isDisabled = email && password && password === confirmedPassword;
	useEffect(() => {
		setError("");
	}, [email, password, confirmedPassword]);
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	return (
		<div className="bodyContent">
			{
            // success ? (
			// 	<div>
			// 		<h1>Thanks for signing up!</h1>
			// 		<h3>You are now logged in</h3>
			// 		<p>
			// 			Go to <Link to="/home">Home</Link>
			// 		</p>
			// 	</div>
			// ) : (
				<div className="signUpBox">
					<h2>Sign Up</h2>
					{error && <h4 style={{ color: "red" }}>Error: {error}</h4>}
					<form onSubmit={signUp}>
						<label htmlFor="first">First Name</label>
						<input
							id="first"
							placeholder="First name..."
							value={first}
							type="text"
							onChange={(e) => {
								setFirst(e.target.value);
							}}
						/>
						<label htmlFor="last">Last Name</label>
						<input
							id="last"
							placeholder="Last name..."
							value={last}
							type="text"
							onChange={(e) => {
								setLast(e.target.value);
							}}
						/>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							placeholder="Email..."
							value={email}
							type="text"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							placeholder="Password..."
							value={password}
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<label htmlFor="confirmedPassword">Confirm Password</label>
						<input
							id="confirmedPassword"
							placeholder="Confirm password..."
							value={confirmedPassword}
							type="password"
							onChange={(e) => {
								setConfirmedPassword(e.target.value);
							}}
						/>
						<button
							disabled={!isDisabled}
							className="btn btn-success"
							type="submit">
							Sign Up
						</button>
					</form>
					<p>
						Already have an account? <Link to="/login">Log In</Link>
					</p>
				</div>
			}
		</div>
	);
};

export default SignUp;
