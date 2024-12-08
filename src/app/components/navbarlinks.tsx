"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { House,MagnifyingGlass,Bookmark,FilePlus, FileMinus, Notebook } from "phosphor-react";

const NavBarLinks: React.FC = () => {
    const router = useRouter();

    const buttonStyle = {
        display: 'flex',
        flex: 'initial',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        color: 'white',
        gap: '0.5rem',
    };

    return (
        <div className='flex w-full h-fit gap-12 flex-row'>
          <button onClick={() => router.push('/')} style={buttonStyle}><House size={30} />Home</button>  
          <button onClick={() => router.push('/search')} style={buttonStyle}><MagnifyingGlass size={30} />Search</button>
          <button onClick={() => router.push('/addNew')} style={buttonStyle}><FilePlus size={30} />Add New Book</button>
          <button onClick={() => router.push('/deleteBook')} style={buttonStyle}><FileMinus size={30} />Delete Book</button>
          <button onClick={() => router.push('/editBook')} style={buttonStyle}><Notebook size={30} />Edit Book</button>
          <button onClick={() => router.push('/AED_Tag')} style={buttonStyle}><Notebook size={30} />Add, Delete tag</button>
          <button onClick={() => router.push('/testPage')} style={buttonStyle}><Notebook size={30} />test page</button>
          <button onClick={() => router.push('/testPage2')} style={buttonStyle}><Notebook size={30} />test page 2</button>
        </div>
      );
    };
    
    export default NavBarLinks;

