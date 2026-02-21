import './FooterDesktop.scss';
import facebook from '../../assets/facebook.svg';
import tiktok from '../../assets/tiktok.svg';
import instagram from '../../assets/instagram.svg';
import youtube from '../../assets/youtube.svg';
import { useState, useEffect } from 'react';

function FooterDesktop() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year)
  })
  return (
    <div className='footer-desktop-parent'>
      <div className='second-parent'>
        <div className='second-parent-child'>
          <div className='second-parent-child-left'>
            <h1>SMACK</h1>
            <div className='top-header-left-section'>
              <img src={facebook} alt="facebook icon" className='facebook-icon' />
              <img src={tiktok} alt="tiktok icon" className='tiktok-icon' />
              <img src={instagram} alt="instagram icon" className='instagram-icon' />
              <img src={youtube} alt="youtube icon" className='youtube-icon' />
            </div>
            <h4>Excellent</h4>
          </div>
          <div className='second-parent-child-left'>
            <h3>Sign up to our community</h3>
            <h5>Be the first to hear about new meals, exclusive offers and discounts.</h5>
            <input className='input' type="`text`" placeholder='Your email' />
            <div className='submit'>SUBMIT</div>
          </div>
        </div>
        <div className='second-parent-child'>
          <div className='second-parent-child-right'>
            <h3>Best Sellers</h3>
            <div className='details'>60 Meal Bundle</div>
            <div className='details'>Pots of Gold</div>
            <div className='details'>High Protein Wraps</div>
            <div className='details'>Ready Cooked Chicken</div>
          </div>
          <div className='second-parent-child-right'>
            <h3>About SMACK</h3>
            <div className='details'>Our Story</div>
            <div className='details'>SMACK News</div>
            <div className='details'>Sustainability</div>
            <div className='details'>Benefits of Frozen</div>
            <div className='details'>Fitness Lifestyle</div>
          </div>
          <div className='second-parent-child-right'>
            <h3>Help</h3>
            <div className='details'>Delivery</div>
            <div className='details'>FAQs</div>
            <div className='details'>Privacy Policy</div>
            <div className='details'>Terms & Conditions</div>
            <div className='details'>Become a stockist</div>
            <div className='details'>Contact Us</div>
          </div>
        </div>
      </div>
      <div className='copyright'>Copyright {currentYear} SMACK. All rights reserved.</div>
      <div className='company-reg-no'>Company Reg No: 09925096 | Company Address: SMACK LTD, Old Chapel, Denison Rd, Selby, YO8 8DA</div>
    </div>
  );
}

export default FooterDesktop;