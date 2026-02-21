import './Cart.scss';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function CartComponent() {

  useEffect(() => {
      AOS.init({
        duration: 3000,
        once: false,
        mirror: true
      })
    }, [])

  return (
    <>
      <div className='cart-parent'>
        <div className='details' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>
          <h1>My basket</h1>
          <h5>Your basket is currently empty</h5>
          <div className='shop-now'>SHOP NOW</div>
        </div>
      </div>
      <FooterDesktop />
    </>
  );
};

export default CartComponent;