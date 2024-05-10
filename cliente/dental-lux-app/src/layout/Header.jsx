import React from 'react';
<<<<<<< HEAD

const Header = () => {
    return (
        <header>
            <nav>
                {/* Navegación aquí */}
                <h1>Barra de navegación</h1>
            </nav>
        </header>
    );
=======
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
>>>>>>> a5edc13b430c03700f3326f619581dfa5ec9c1ff
};

export default Header;
