import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import SocialMediaIcon from '../../shared/components/SocialMediaIcon';
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';

const Footer = ({ socialMedia }) => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-title">Bumi Merapi</h3>
            <p className="footer-description">
              Wisata kedai alam outdoor, petik jeruk dan jeep di lereng Gunung Merapi
              dengan pemandangan yang indah dan suasana yang menyegarkan.
            </p>
            
            <div className="contact-item">
              <Phone size={18} />
              <span>+62 857-1355-5331</span>
            </div>
            
            <div className="contact-item">
              <Instagram size={18} />
              <span>@tanamerapimovement</span>
            </div>
            
            <div className="contact-item">
              <MapPin size={23} />
              <span>Balerante, Kec. Kemalang, Kabupaten Klaten, Jawa Tengah</span>
            </div>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-title">Menu</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/packages">Paket Jeep & Jeruk</Link></li>
              <li><Link to="/promotions">Promo</Link></li>
              <li><Link to="/contact">Kontak</Link></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <div className="social-icons">
              {socialMedia.map((social) => (
                <SocialMediaIcon 
                  key={social.id}
                  platform={social.platform}
                  url={social.url}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {year} Bumi Merapi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;