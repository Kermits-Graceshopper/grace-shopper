import React, { useState } from 'react';
import DropdownItem from './DropdownItem';

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="menuContainer">
      <button className="menuButton" onClick={handleOpen}>
        <img className="icon" src="/img/gear.png" />
      </button>
      {open ? (
        <>
          <ul className={`dropdownItems ${open ? 'active': 'inactive'}`}>
            <p style={{ color: 'black' }}>Admin Settings</p>
            <DropdownItem img="/img/user.png" text="Edit Users" />
            <DropdownItem img="/img/edit.png" text="Edit Products" />
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
