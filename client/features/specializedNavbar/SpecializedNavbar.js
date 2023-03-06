import React from 'react'
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      <a> {props.text}</a>
    </li>
  )
}
const SpecializedNavbar = () => {
  return (
    <div className="specializedNavbar">
      <Link to="/wishlist" className="specItem">
        Wishlist
      </Link>
      <Link to="/featured" className="specItem">
        Featured
      </Link>
      <Link
        style={{ textDecoration: 'none', color: 'white' }}
        className="link"
        to="/products"
      >
        All Products
      </Link>
      {/* Admin Dropdown Menu 
      initially tried NavDropdown buitlt in ele... wasn't compatible w
      react router*/}
      {/* <NavDropdown
        id="nav-dropdown-dark-example"
        title="Admin Tools"
        menuVariant="dark"
      >
        <Link to="/editUsers" className="specItem link">
          <NavDropdown.Item >Edit Users</NavDropdown.Item>
        </Link>
        <Link to="#" className="specItem link">
          <NavDropdown.Item >Edit Products</NavDropdown.Item>
        </Link>
      </NavDropdown> */}
      {/* dropdown attempt 2 */}
      <div className="menu-container">
        <div className="menu-trigger">
          <img className="gear" src="/img/gear.png" />
        </div>
        <div className='dropdown-menu'>
          <h3>The Kiet<br /><span>Web Designer</span></h3>
          <ul>
            <DropdownItem text={"test"}/>
          </ul>
        </div>
      </div>
      {/* dropdown attempt end */}
    </div>
  );
}

export default SpecializedNavbar