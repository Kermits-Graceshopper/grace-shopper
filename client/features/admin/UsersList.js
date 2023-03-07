import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAsync,
  selectAllUsers,
  addNewUserAsync,
} from "../../app/reducers/usersListSlice";
import { v4 as uuidv4 } from "uuid";

const UsersList = () => {
  const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
  const isAdmin = sessionStorage.getItem("isAdmin");
  const [editMode, setEditMode] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [toggleSubmitted, setToggleSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminRole, setAdminRole] = useState("");

  console.log("isAdmin: ", isAdmin);
  const getUsers = () => {
    dispatch(getAllUsersAsync(isAdmin)).then(() => {
      setFiltered(allUsers);
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewUserAsync({
        fname: fName,
        lname: lName,
        email: email,
        password: password,
        isAdmin: adminRole,
      })
    );
    setToggleSubmitted(!toggleSubmitted);
    setFName("");
    setLName("");
    setEmail("");
    setPassword("");
    setAdminRole(false);
  };

  return (
    <div>
      <h2>All Users</h2>
      {allUsers && isLoggedIn && isAdmin ? (
        allUsers.map((user) => (
          <div>
            <div>Name: {user.fullName ? user.fullName : null}</div>
            <div>Email: {user.email}</div>
          </div>
        ))
      ) : (
        <h3>No current users are signed up...</h3>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="adminRole">Admin?</label>
        <input
          type="checkbox"
          id="adminRole"
          checked={adminRole}
          onChange={(e) => setAdminRole(e.target.checked)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UsersList;
