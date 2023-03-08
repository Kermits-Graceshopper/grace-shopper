import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const UserInfo = () => {
	const [user, setUser] = useState([]);
	const [newFirst, setNewFirst] = useState("");
	const [newLast, setNewLast] = useState("");
	const [editName, setEditName] = useState(false);
	const [success, setSuccess] = useState(false);
	const [newEmail, setNewEmail] = useState("");
	const [editEmail, setEditEmail] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [error, setError] = useState("");
	const changeName = async (e) => {
		e.preventDefault();
		await axios
			.put(`/api/users/${user.id}`, {
				first: newFirst,
				last: newLast
			})
			.then((res) => {
				if (res.data.fname !== newFirst || res.data.lname !== newLast) {
					setError("An error occured");
				} else {
					setUser(res.data);
				}
			});
		setEditName(false);
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
		}, 2000);
	};
	const changeEmail = async (e) => {
		e.preventDefault();
		await axios
			.put(`/api/users/${user.id}`, {
				email: newEmail
			})
			.then((res) => {
				if (res.data.email !== newEmail) {
					setError("Could not change email");
				} else {
					setUser(res.data);
				}
			});
		setEditEmail(false);
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
		}, 2000);
	};
	useEffect(() => {
		const getUser = async () => {
			await axios
				.get(`/api/users/${sessionStorage.getItem("userId")}`)
				.then((res) => setUser(res.data));
		};
		getUser();
	}, []);
    useEffect(() => {
        setError('');
    }, [newFirst, newLast, newEmail, newPassword, editEmail, editName, ])
	console.log(user);
	return (
		<div>
			{changeNameSuccess ? (
				<p className='fixedSuccessMessage'>Success!</p>
			) : null}
			{isLoggedIn ? (
				<div>
					<h2>Your Information</h2>
					<h4>Name: {user.fullName}</h4>
					<span>
						{!editName ? (
							<button
								type="button"
								onClick={() => setEditName(true)}
								className="btn btn-primary">
								Edit Name
							</button>
						) : null}
					</span>
					{editName ? (
						<form onSubmit={changeName}>
							<label htmlFor="first">First Name</label>
							<input
								id="first"
								type="text"
								onChange={(e) => setNewFirst(e.target.value)}
								value={newFirst}
							/>
							<label htmlFor="last">Last Name</label>
							<input
								id="first"
								type="text"
								onChange={(e) => setNewLast(e.target.value)}
								value={newLast}
							/>
							<button type="submit">Change</button>
							<button type="button" onClick={() => setEditName(false)}>
								Cancel
							</button>
						</form>
					) : null}
					<h4>Email: {user.email}</h4>
					<span>
						{!editEmail ? (
							<button className="btn btn-primary">Edit</button>
						) : null}
					</span>
					{editEmail ? (
						<form onSubmit={changeEmail}>
							<label htmlFor="email">New Email</label>
							<input
								id="email"
								type="text"
								onChange={(e) => setNewEmail(e.target.value)}
								value={newEmail}
							/>
							<button type="submit">Change</button>
							<button type="button" onClick={() => setEditEmail(false)}>
								Cancel
							</button>
						</form>
					) : null}
					<h4>Passwoed: ******</h4>
					<span>
						<button className="btn btn-primary">Edit</button>
					</span>
				</div>
			) : (
				<h4>
					Please <Link to="/login">Log in</Link>
				</h4>
			)}
		</div>
	);
};

export default UserInfo;
