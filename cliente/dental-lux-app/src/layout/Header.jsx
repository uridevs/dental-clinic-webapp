import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <a href="/">Dental Luxe</a>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
