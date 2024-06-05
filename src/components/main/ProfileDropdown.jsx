import React, { useState } from 'react';

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative ml-5 flex-shrink-0">
      <div>
        <button onClick={() => setOpen(!open)} type="button" className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2" id="user-menu-button" aria-expanded={open} aria-haspopup="true">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </button>
      </div>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
          <a href="#" className="block py-2 px-4 text-sm text-gray-700" role="menuitem">Your Profile</a>
          <a href="#" className="block py-2 px-4 text-sm text-gray-700" role="menuitem">Settings</a>
          <a href="#" className="block py-2 px-4 text-sm text-gray-700" role="menuitem">Sign out</a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
