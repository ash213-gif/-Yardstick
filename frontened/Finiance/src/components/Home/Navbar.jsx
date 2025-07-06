import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className="text-white p-4  flex justify-center ">
      <nav>
        <ul className="flex space-x-6">
          <li className="bg-red-500 hover:bg-red-600 p-2 rounded transition duration-200 ease-in-out flex items-center">
            <FaTachometerAlt className="mr-2" />
            <Link to="/">Dashboard</Link>
          </li>
          <li className="bg-blue-500 hover:bg-blue-600 p-2 rounded transition duration-200 ease-in-out flex items-center">
            <FaMoneyBillWave className="mr-2" />
            <Link to="/transaction">Transactions</Link>
          </li>
          <li className="bg-green-500 hover:bg-green-600 p-2 rounded transition duration-200 ease-in-out flex items-center">
            <FaClipboardList className="mr-2" />
            <Link to="/budget">Budget</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
