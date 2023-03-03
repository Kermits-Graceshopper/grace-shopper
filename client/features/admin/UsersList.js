import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAsync, selectAllUsers } from '../../app/reducers/usersListSlice';

const UsersList = () => {
    const dispatch = useDispatch();

    const getUsers = () => {
        dispatch(getAllUsersAsync())
    }
    useEffect(() => {
        getUsers();
    }, []);
    // not sure if this use effect will run too late. may get the "no current users are signed up..." even though the state really does have the user info in there
    const allUsers = useSelector(selectAllUsers);
    return (
        <div>
            <h2>All Users</h2>
            {/* {allUsers ? dispatch(getAllUsersAsync()) : null} */}
            {
                allUsers ? allUsers.map(user => (
                    <div>
                        <h4>Name: {user.fullName ? user.fullName : null}</h4>
                        <h4>Email: {user.email}</h4>
                    </div>
                ))
                    : <h3>No current users are signed up...</h3>
            }
        </div>
    )
}

export default UsersList