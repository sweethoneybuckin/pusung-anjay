import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './PackagesPage.scss';
import Loader from '../../shared/components/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { MapPin, Search, Apple, JeepIcon } from 'lucide-react';

// Custom Jeep Icon since it's not in Lucide
const CustomJeepIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 13V16H6L7 16C7.55228 16 8 16.4477 8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17H4C4 18.6569 5.34315 20 7 20C8.65685 20 10 18.6569 10 17C10 15.8954 9.10457 15 8 15H7.5V13H16.5V15H16C14.8954 15 14 15.8954 14 17C14 18.6569 15.3431 20 17 20C18.6569 20 20 18.6569 20 17H18C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16L18 16H20V13H19M6.5 9V11H17.5V9M6.5 9H17.5M6.5 9C4.5 9 4 10.5 4 13M17.5 9C19.5 9 20 10.5 20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  const filteredPackages = packages.filter(pkg => {
    // Filter by tab
    if (activeTab !== 'all' && pkg.type !== activeTab) {
      return false;
    }
    
    // Filter by search
    return (
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.description && pkg.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  return (
    <div className="packages-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Paket Jeep & Petik Jeruk</h1>
          <p>Nikmati pengalaman menarik di Bumi Merapi</p>
        </div>
      </section>
      
      {/* Packages Section */}
      <section className="section packages-section">
        <div className="container">
          <div className="filters">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                Semua Paket
              </button>
              <button 
                className={`tab ${activeTab === 'jeep' ? 'active' : ''}`}
                onClick={() => setActiveTab('jeep')}
              >
                <CustomJeepIcon />
                Paket Jeep
              </button>
              <button 
                className={`tab ${activeTab === 'orange-picking' ? 'active' : ''}`}
                onClick={() => setActiveTab('orange-picking')}
              >
                <Apple size={20} />
                Paket Petik Jeruk
              </button>
            </div>
            
            <div className="search-container">
              <div className="search-input">
                <Search size={20} />
                <input 
                  type="text" 
                  placeholder="Cari paket..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {loading ? (
            <Loader />
          ) : filteredPackages.length > 0 ? (
            <div className="packages-grid">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <div className="package-image">
                    <img 
                      src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}${pkg.image_url}`} 
                      alt={pkg.name}
                    />
                    <div className="package-type">
                      {pkg.type === 'jeep' ? (
                        <>
                          <CustomJeepIcon />
                          <span>Jeep</span>
                        </>
                      ) : (
                        <>
                          <Apple size={20} />
                          <span>Petik Jeruk</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="package-info">
                    <h3>{pkg.name}</h3>
                    {pkg.type === 'jeep' && pkg.route && (
                      <div className="package-route">
                        <MapPin size={16} />
                        <span>{pkg.route}</span>
                      </div>
                    )}
                    <p>{pkg.description}</p>
                    
                    {pkg.items && pkg.items.length > 0 && (
                      <div className="package-items">
                        <span>Termasuk:</span>
                        <ul>
                          {pkg.items.slice(0, 4).map((item, index) => (
                            <li key={index}>{item.item_name}</li>
                          ))}
                          {pkg.items.length > 4 && <li>Dan lainnya...</li>}
                        </ul>
                      </div>
                    )}
                    
                    <div className="package-footer">
                      <div className="package-price">{formatCurrency(pkg.price)}</div>
                      <Link to={`/packages/${pkg.id}`} className="details-button">
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="icon-container">
                {activeTab === 'jeep' ? (
                  <CustomJeepIcon />
                ) : activeTab === 'orange-picking' ? (
                  <Apple size={48} />
                ) : (
                  <div className="icon-group">
                    <CustomJeepIcon />
                    <Apple size={24} />
                  </div>
                )}
              </div>
              <h3>Paket Tidak Ditemukan</h3>
              <p>Coba kata kunci pencarian lain atau lihat semua paket kami.</p>
              {(searchTerm || activeTab !== 'all') && (
                <button 
                  className="reset-button"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTab('all');
                  }}
                >
                  Lihat Semua Paket
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;