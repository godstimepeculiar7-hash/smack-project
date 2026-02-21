import './SubscribeAndSave.scss';
import SmackLogoImage from '../../assets/GSN PHOTO.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function SubscribeAndSaveForMobile() {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
      mirror: true
    })
  }, [])

  return (
    <div>
        <div className='subscribe-and-save' data-aos='zoom-in' data-aos-delay='100' data-aos-duration='2000'>
          <div className='subscribe-and-save-text' data-aos='fade-up' data-aos-delay='900' data-aos-duration='2000'>
              <h1 data-aos='zoom-in' data-aos-delay='400' data-aos-duration='2000'>Subscribe & Save</h1>
              <h5 data-aos='fade-down' data-aos-delay='600' data-aos-duration='2000'>Save an extra 5% on bundle prices when you subscribe! Full flexibility to manage your products every month and pause if you go away.</h5>
              <button className='subscribe-and-save-button'>SUBSCRIBE & SAVE</button>
          </div>
        </div>
        <div className='smack-ai-photo-mobile'  data-aos='fade-down' data-aos-delay='500' data-aos-duration='3000'>
          <img src={SmackLogoImage} alt="smack ai generated photo" className='smack-advert' />
        </div>
    </div>
  );
};

export default SubscribeAndSaveForMobile;