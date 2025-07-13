import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.scss';
import SocialMediaIcon from '../../shared/components/SocialMediaIcon';

const Navbar = ({ socialMedia }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-text">Tana Merapi</span>
          </Link>
          
          <button className="menu-button" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <div className="navbar-links">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
            <NavLink to="/packages" onClick={closeMenu}>Paket Jeep & Jeruk</NavLink>
            <NavLink to="/promotions" onClick={closeMenu}>Promo</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Kontak</NavLink>
          </div>
          
          <div className="social-links">
            {socialMedia.map((social) => (
              <SocialMediaIcon 
                key={social.id}
                platform={social.platform}
                url={social.url}
              />
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;