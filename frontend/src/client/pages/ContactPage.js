import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../utils/api';
import './ContactPage.scss';
import Loader from '../../shared/components/Loader';
import SocialMediaIcon from '../../shared/components/SocialMediaIcon';
import { Instagram, Clock, Send } from 'lucide-react';
import Message from '../../shared/components/Message';

const ContactPage = () => {
  const socialMedia = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    eInstagram: '',
    MessageCircle: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.eInstagram || !formData.message) {
      setFormStatus({
        type: 'error',
        message: 'Harap isi semua kolom yang diperlukan.'
      });
      return;
    }
    
    // EInstagram validation
    const eInstagramRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!eInstagramRegex.test(formData.eInstagram)) {
      setFormStatus({
        type: 'error',
        message: 'Format eInstagram tidak valid.'
      });
      return;
    }
    
    // Simulate form submission (in a real app, you would send this to your API)
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      setFormStatus({
        type: 'success',
        message: 'Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.'
      });
      
      // Clear form
      setFormData({
        name: '',
        eInstagram: '',
        MessageCircle: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Hubungi Kami</h1>
          <p>Kami siap membantu Anda dengan segala pertanyaan</p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Informasi Kontak</h2>
              
              <div className="info-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
                </svg>
                <div>
                  <h3>WhatsApp</h3>
                  <p>+62-857-1355-5331</p>
                </div>
              </div>
              
              <div className="info-item">
                <Instagram size={24} />
                <div>
                  <h3>Instagram</h3>
                  <p>@tana_merapi</p>
                </div>
              </div>
              
              <div className="info-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                <div>
                  <h3>TikTok</h3>
                  <p>@tanamerapimovement</p>
                </div>
              </div>

            </div>
            

          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="map-section">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.2784519032593!2d110.4634356!3d-7.600934399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a670046094faf%3A0x530487b6ab12895c!2sAgrowisata%20Petik%20Jeruk!5e1!3m2!1sen!2sid!4v1752397056703!5m2!1sen!2sid" 
          width="100%" 
          height="500" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Agrowisata Petik Jeruk Location"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;