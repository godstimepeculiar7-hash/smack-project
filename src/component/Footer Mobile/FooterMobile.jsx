import './FooterMobile.scss';
import facebook from '../../assets/facebook.svg';
import tiktok from '../../assets/tiktok.svg';
import instagram from '../../assets/instagram.svg';
import youtube from '../../assets/youtube.svg';
import { useState, useEffect } from 'react';

function FooterMobile() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year)
  })
  return (
    <div className='footer-mobile-parent'>
      <div className='second-parent'>
        <div className='first'>
          <h1>SMACK</h1>
          <div className='top-header-left-section'>
            <img src={facebook} alt="facebook icon" className='facebook-icon' />
            <img src={tiktok} alt="tiktok icon" className='tiktok-icon' />
            <img src={instagram} alt="instagram icon" className='instagram-icon' />
            <img src={youtube} alt="youtube icon" className='youtube-icon' />
          </div>
          <h3>Excellent</h3>
        </div>

        <div className='second'>
          <div>Sign up to our community</div>
          <div className='be-the-first'>Be the first to hear about new meals, exclusive offers and discounts</div>
          <input type="text" placeholder='Your email' className='input' />
          <div className='submit'>SUBMIT</div>
        </div>

        <div className='third'>
          <h3>Best Sellers</h3>
          <div className='details'>60 Meal Bundle</div>
          <div className='details'>Pots of Gold</div>
          <div className='details'>High Protein Wraps</div>
          <div className='details'>Ready Cooked Chicken</div>
        </div>

        <div className='third'>
          <h3>About SMACK</h3>
          <div className='details'>Our Story</div>
          <div className='details'>SMACK News</div>
          <div className='details'>Sustainability</div>
          <div className='details'>Benefits of Frozen</div>
          <div className='details'>Fitness Lifestyle</div>
        </div>

        <div className='third'>
          <h3>Help</h3>
          <div className='details'>Delivery</div>
          <div className='details'>FAQs</div>
          <div className='details'>Privacy Policy</div>
          <div className='details'>Terms & Conditions</div>
          <div className='details'>Become a stockist</div>
          <div className='details'>Contact Us</div>
        </div>

        <div className='copyright'>Copyright {currentYear} SMACK. All rights reserved.</div>
        <div className='company-reg-no'>Company Reg No: 09925096 | Company Address: SMACK LTD, Old Chapel, Denison Rd, Selby, YO8 8DA</div>
      </div>
    </div>
  );
};

export default FooterMobile;