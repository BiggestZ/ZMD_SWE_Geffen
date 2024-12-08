"use client"
import React from "react";
import NavBarLinks from "./navbarlinks";

const Navbar: React.FC = () => {
    return (
        <nav style={{ 
            background: '#075985', 
            display: 'flex', 
            justifyContent: 'start',
            padding: '1em',
            alignItems: 'center',
            position:'sticky', 
            top:0
        }}>

            <div style={{ 
                display: 'flex', 
                flexFlow: 'row', 
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <NavBarLinks />
            </div>
        </nav>
    );
};

export default Navbar;

/*
style={{ 
            background: 'pink', 
            display: 'flex', 
            justifyContent: 'start',
            padding: '1em',
            alignItems: 'center',
            position:'sticky', 
            top:0
            
    className="bg-purple-950 text-white"
*/