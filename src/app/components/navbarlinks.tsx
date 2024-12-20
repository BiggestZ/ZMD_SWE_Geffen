"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { House,MagnifyingGlass,Bookmark,FilePlus } from "phosphor-react";

const NavBarLinks: React.FC = () => {
    const router = useRouter();

    const buttonStyle = {
        display: 'flex',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        gap: '0.5rem',
    };

    return (
        <div className='flex w-full h-fit gap-12'> {/* Adjust gap as needed */}
          <button onClick={() => router.push('/')} style={buttonStyle}><House size={30} />Home</button>  
          <button onClick={() => router.push('/search')} style={buttonStyle}><MagnifyingGlass size={30} />Explore</button>
          <button onClick={() => router.push('/bookmarks')} style={buttonStyle}><Bookmark size={30} />Saved</button>
          <button onClick={() => router.push('/addNew')} style={buttonStyle}><FilePlus size={30} />Add New</button>
        </div>
      );
    };
    
    export default NavBarLinks;