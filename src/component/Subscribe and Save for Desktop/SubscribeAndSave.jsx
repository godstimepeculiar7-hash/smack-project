import './SubscribeAndSave.scss';
import SmackLogoImage from '../../assets/GSN PHOTO.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function SubscribeAndSaveForDesktop() {
  useEffect(() => {
      AOS.init({
        duration: 3000,
        once: false,
        mirror: true
      })
    }, [])

  return (
    <div>
      <div className='subscribe-and-save-parent' >
        <div className='smack-ai-photo-desktop' data-aos='zoom-in' data-aos-delay='1500' data-aos-duration='1500'>
          <img src={SmackLogoImage} alt="smack ai generated photo" className='smack-advert' />
          <div className='smack-ai-photo-overlay'>

          </div>
        </div>

        <div className='subscribe-and-save' data-aos='zoom-in' data-aos-delay='200' data-aos-duration='1000'>
          <div className='subscribe-and-save-text' data-aos='fade-up' data-aos-delay='900' data-aos-duration='2000'>
          <h1 data-aos='zoom-in' data-aos-delay='400' data-aos-duration='2000'>Subscribe & Save</h1>
          <h5 data-aos='zoom-in' data-aos-delay='600' data-aos-duration='3000'>Save an extra 5% on bundle prices when you subscribe! Full flexibility to manage your products every month and pause if you go away.</h5>
          <button className='subscribe-and-save-button'>
            SUBSCRIBE & SAVE
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeAndSaveForDesktop;