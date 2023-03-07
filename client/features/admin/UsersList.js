import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllUsersAsync,
	selectAllUsers
} from "../../app/reducers/usersListSlice";
import { v4 as uuidv4 } from "uuid";

const UsersList = () => {
    const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const dispatch = useDispatch();

	const getUsers = () => {
		dispatch(getAllUsersAsync());
	};
	useEffect(() => {
		getUsers();
	}, []);
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	// not sure if this use effect will run too late. may get the "no current users are signed up..." even though the state really does have the user info in there
	const allUsers = useSelector(selectAllUsers);
	return (
		<div>
			<h2>All Users</h2>
			{/* {allUsers ? dispatch(getAllUsersAsync()) : null} */}
			{allUsers ? (
				allUsers.map((user) => (
					<div>
						<div>Name: {user.fullName ? user.fullName : null}</div>
						<div>Email: {user.email}</div>
					</div>
				))
			) : (
				<h3>No current users are signed up...</h3>
			)}
		</div>
	);
};

export default UsersList;
