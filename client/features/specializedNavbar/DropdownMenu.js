import React, { useState, useEffect, useRef } from 'react';
import DropdownItem from './DropdownItem';

const DropdownMenu = () => {
    const [open, setOpen] = useState(false);
    
    let menuRef = useRef();
  const handleOpen = () => {
    setOpen(!open);
  };
    
    useEffect(() => {
        let handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setOpen(false);
            }
            
        }
        document.addEventListener('mousedown', handler);
    })
  return (
    <div className="menuContainer" ref={menuRef}>
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
