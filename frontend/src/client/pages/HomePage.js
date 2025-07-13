import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Slider from 'react-slick';
import api from '../../utils/api';
import './HomePage.scss';
import Loader from '../../shared/components/Loader';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import SocialMediaIcon from '../../shared/components/SocialMediaIcon';

const HomePage = () => {
  const socialMedia = useOutletContext();
  const [slides, setSlides] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [packages, setPackages] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slidesRes, menuItemsRes, packagesRes, promotionsRes] = await Promise.all([
          api.get('/slides'),
          api.get('/menu-items'),
          api.get('/packages'),
          api.get('/promotions')
        ]);
        
        setSlides(slidesRes.data);
        setMenuItems(menuItemsRes.data.slice(0, 3)); // Just get first 3
        setPackages(packagesRes.data.slice(0, 3)); // Just get first 3
        setPromotions(promotionsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false
  };
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="home-page">
      {/* Hero Slider */}
      <section className="hero-slider">
        {slides.length > 0 ? (
          <Slider {...sliderSettings}>
            {slides.map((slide) => (
              <div key={slide.id} className="hero-slide">
                <img 
                  src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}${slide.image_url}`} 
                  alt={slide.title}
                />
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  <h1>{slide.title}</h1>
                  <p>Nikmati keindahan alam di lereng Gunung Merapi</p>
                  <Link to="/contact" className="cta-button">
                    Kunjungi Kami
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="hero-slide">
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1>Selamat Datang di Bumi Merapi</h1>
              <p>Nikmati keindahan alam di lereng Gunung Merapi</p>
              <Link to="/contact" className="cta-button">
                Kunjungi Kami
              </Link>
            </div>
          </div>
        )}
      </section>
      
      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">Tentang Bumi Merapi</h2>
          <div className="about-content">
            <div className="about-image">
              <img src={`${process.env.PUBLIC_URL}/images/about.jpg`} alt="Bumi Merapi" />
            </div>
            <div className="about-text">
              <h3>Wisata Alam Outdoor</h3>
              <p>
                Bumi Merapi adalah destinasi wisata alam outdoor yang terletak di lereng Gunung Merapi, Yogyakarta. 
                Kami menawarkan pengalaman wisata yang unik dengan pemandangan yang indah dan udara yang segar.
              </p>
              <p>
                Di Bumi Merapi, Anda dapat menikmati berbagai aktivitas seperti bersantap di kedai alam outdoor, 
                petik jeruk langsung dari kebun, dan menjelajahi keindahan alam dengan jeep.
              </p>
              <Link to="/contact" className="learn-more">
                Pelajari Lebih Lanjut <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Preview Section */}
      <section className="section menu-preview-section">
        <div className="container">
          <h2 className="section-title">Menu Pilihan</h2>
          <div className="menu-cards">
            {menuItems.map((menuItem) => (
              <div key={menuItem.id} className="menu-card">
                <div className="menu-image">
                  <img 
                    src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}${menuItem.image_url}`} 
                    alt={menuItem.name}
                  />
                </div>
                <div className="menu-info">
                  <h3>{menuItem.name}</h3>
                  <p>{menuItem.description}</p>
                  <div className="menu-price">{formatCurrency(menuItem.price)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="see-all">
            <Link to="/menu" className="see-all-button">
              Lihat Semua Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Packages Preview Section */}
      <section className="section packages-preview-section">
        <div className="container">
          <h2 className="section-title">Paket Jeep & Petik Jeruk</h2>
          <div className="package-cards">
            {packages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-image">
                  <img 
                    src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}${pkg.image_url}`} 
                    alt={pkg.name}
                  />
                  <div className="package-type">{pkg.type === 'jeep' ? 'Jeep' : 'Petik Jeruk'}</div>
                </div>
                <div className="package-info">
                  <h3>{pkg.name}</h3>
                  <p>{pkg.description}</p>
                  <div className="package-details">
                    {pkg.items && pkg.items.length > 0 && (
                      <div className="package-items">
                        <span>Termasuk:</span>
                        <ul>
                          {pkg.items.slice(0, 3).map((item, index) => (
                            <li key={index}>{item.item_name}</li>
                          ))}
                          {pkg.items.length > 3 && <li>Dan lainnya...</li>}
                        </ul>
                      </div>
                    )}
                    <div className="package-price">{formatCurrency(pkg.price)}</div>
                  </div>
                  <Link to={`/packages/${pkg.id}`} className="details-button">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="see-all">
            <Link to="/packages" className="see-all-button">
              Lihat Semua Paket <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Promotions Preview Section */}
      {promotions.length > 0 && (
        <section className="section promotions-preview-section">
          <div className="container">
            <h2 className="section-title">Promo Spesial</h2>
            <div className="promotion-cards">
              {promotions.slice(0, 2).map((promotion) => (
                <div key={promotion.id} className="promotion-card">
                  <div className="promotion-content">
                    <h3>{promotion.title}</h3>
                    <p>{promotion.description}</p>
                    <div className="promotion-discount">
                      <span className="discount-tag">{promotion.discount_percent}% OFF</span>
                    </div>
                    <Link to="/promotions" className="details-button">
                      Lihat Detail
                    </Link>
                  </div>
                  {promotion.image_url && (
                    <div className="promotion-image">
                      <img 
                        src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}${promotion.image_url}`} 
                        alt={promotion.title}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="see-all">
              <Link to="/promotions" className="see-all-button">
                Lihat Semua Promo <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <h2 className="section-title">Hubungi Kami</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Informasi Kontak</h3>
              <p>
                Jika Anda memiliki pertanyaan atau ingin melakukan reservasi, 
                jangan ragu untuk menghubungi kami melalui salah satu platform berikut:
              </p>
              <div className="contact-social">
                {socialMedia.map((social) => (
                  <div key={social.id} className="social-contact-item">
                    <SocialMediaIcon 
                      platform={social.platform}
                      url={social.url}
                    />
                    <span>{social.platform === 'instagram' ? '@bumimerapi' : 
                           social.platform === 'whatsapp' ? '+62 812 3456 7890' : 
                           social.platform === 'tiktok' ? '@bumimerapi' : 
                           'Lokasi Bumi Merapi'}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="contact-button">
                Kontak Lengkap
              </Link>
            </div>
            <div className="contact-map">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;