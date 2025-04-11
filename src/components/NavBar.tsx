import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-100 py-1 mb-2">
      <ul className="flex justify-around items-center list-none m-0 p-0 space-x-4 pt-2">
        <li>
          <Link to="/" className="text-blue-900 font-bold no-underline hover:text-blue-1000">Home</Link>
        </li>
        <li>
          <Link to="/counter" className="text-blue-900 font-bold no-underline hover:text-blue-1000">Counter</Link>
        </li>
        <li>
          <Link to="/todo" className="text-blue-900 font-bold no-underline hover:text-blue-1000">To-Do List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
