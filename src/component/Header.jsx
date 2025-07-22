import React from 'react';
import bookImg from '../assets/book.png';

function Header() {
  return (
    <header>
        <img src={bookImg} alt="Book Image" className='logo-img' />
        <h1>Cover<span className='text-red-500 bg-transparent inline-block px-2'></span>Cover</h1>
        <p className='italic'>My Book's Tracker</p>
    </header> 
  )
}

export default Header