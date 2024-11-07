"use client"
import React from "react";
import NavBarLinks from "./navbarlinks";

const Navbar: React.FC = () => {
    return (
        <nav style={{ background: 'pink',display: 'flex',justifyContent: 'start',padding: '1em',alignItems: 'center' }}>
            <div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-around'}}>
                <NavBarLinks />
            </div>
        </nav>
    );
};

export default Navbar;