import React from 'react';
import { Link } from 'react-router-dom';

const DropdownItem = (props) => {
  return (
    <Link to="/home">
      <li className="dropdownItem">
        <img className="navIcon" src={props.img}></img>
        <a> {props.text}</a>
      </li>
    </Link>
  );
};

export default DropdownItem;
