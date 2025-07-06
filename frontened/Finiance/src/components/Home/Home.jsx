import React, { useState } from 'react';
import Transaction from '../Content/Tranaction';
import Budget from '../Content/Budget'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Home() {


    
    return (
        <>
            <div className="max-w-md   mx-auto bg-gray-300  lg:max-w-full  p-4 md:p-6 lg:p-15 ">
                <h3 className="text-3xl text-center font-bold text-gray-800 mb-2">Personal Finance Visualizer</h3>
                <p className="text-gray-600  text-center mb-6">Track your expenses, set budgets, and visualize your spending patterns</p>
                <Navbar />
            </div>
         
        </>

    );
}