import './Excellent.scss';
import rating from '../../assets/rating-45.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Excellent() {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
      mirror: true
    })
  }, [])

  return (
    <div>
        <div className='excellent' data-aos='zoom-in' data-aos-delay='100' data-aos-duration='3000'>
          Excellent
          <img src={rating} alt="4.5 stars" className='rating' />
          <div className='review'>2,333 <span className='review-span'>reviews on</span> </div>
          <div className='trust-pilot'>Trustpilot</div>
        </div>
    </div>
  );
};


export default Excellent;