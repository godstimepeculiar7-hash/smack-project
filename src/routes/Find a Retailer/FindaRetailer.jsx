import './FindaRetailer.scss';
import GoogleMap from '../../component/Google Map/GoogleMap';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function FindaRetailer() {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
      mirror: true
    })
  }, [])

  return (
    <div className='parent'>
      <div className='find-a-retailer-parent'>
        <h1 data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>Find a retailer</h1>
        <div className='description' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>
          <p>Welcome to our Stockist Locator! Easily find where you can purchase our products locally. Simply enter your location, and our tool will provide a list of nearby retailers carrying our items.</p>
        </div>
      </div>
      <GoogleMap />
      <FooterDesktop />
    </div>
  );
};

export default FindaRetailer;