import React from 'react';

const Header = () => {
    return (
        <header>
            <nav>
                {/* Navegación aquí */}
                <h1>Barra de navegación</h1>
            </nav>
        </header>
    );

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
