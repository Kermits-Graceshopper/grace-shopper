import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT
 */
const Home = (props) => {
  // const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="changingBody">
      {/* <h3>Welcome, {username}</h3> */}
      <h3>Welcome</h3>
    </div>
  );
};

export default Home;
