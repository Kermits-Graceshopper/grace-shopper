import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/reducers/userSlice';

/**
 * COMPONENT
 */
const Home = () => {
  // const username = useSelector((state) => state.auth.me.username);
  const user = useSelector(selectUser);
  return (
    <div>
      {user.firstName ? (
        <h1>Welcome {user.firstName}!</h1>
      ) : (
        <h1>Welcome! Be our guest.</h1>
      )}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;

