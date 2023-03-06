import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../app/store';
import { logout } from '../../app/reducers/userSlice';
import { MDBCol, MDBRow } from 'mdbreact';
import Button from 'react-bootstrap/Button';
import { addSearchQuery } from '../../app/reducers/searchSlice';
import { selectUser } from '../../app/reducers/userSlice';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectUser).isLoggedIn;
  const user = useSelector(selectUser)
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    console.log('user: ', user)
    navigate('/login');
  };

  useEffect(() => {
    dispatch(addSearchQuery(searchInput))
  }, [searchInput])

  return (
    <div>
      <div className="navbar">
        <MDBCol md="2">
          <Link to="/home">
            <img src="/img/logo-nobckgrnd.png" className="logo" />
          </Link>
        </MDBCol>
        <MDBCol md="7">
          <input
            className="form-control searchBar"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a title..."
            aria-label="Search"
          />
        </MDBCol>

        <MDBCol md="1">
          <Button variant="light" className="search">
            Search
          </Button>
        </MDBCol>

        <MDBCol md="2">
          <nav>
            {/* // isLoggedIn ?  */}
            <div className="navButtons">
              {/* The navbar will show these links after you log in */}
            </div>
            <div>
              {/* The navbar will show these links before you log in */}
              {
                !isLoggedIn ? 
                <div>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                className="link"
                to="/login"
              >
                Login
              </Link>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                className="link"
                to="/signup"
              >
                Sign Up
              </Link>
              </div> : null
}
              <Link to="/cart">
                <img
                  style={{ width: '30px', height: 'auto' }}
                  src="/img/cart.png"
                />
              </Link>
              { isLoggedIn ?
              <button
                className="Logout"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  border: 'none',
                  backgroundColor: '#2B3467',
                }}
                type="button"
                onClick={logoutAndRedirectHome}
              >
                Logout
              </button> : null
}
            </div>
          </nav>
        </MDBCol>
      </div>
    </div>
  );
};

export default Navbar;
