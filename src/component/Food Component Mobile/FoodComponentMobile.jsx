import './FoodComponentMobile.scss';
import { products } from './products';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FoodComponentMobile() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
      mirror: true
    })
  },[])

  function stopPropagation(e, product) {
    e.stopPropagation();
    if(product.content === 'Jollof Rice') {
      alert('You are going to the rice page')
      navigate('/jollofRice');
    } else{
      alert('there is no other page apart from the rice page')
    }
  }
  return (
    <div className='food-component-mobile-parent'>
      {products.map((product) => {
        return (
          <div key={product.id} className='food-component-mobile-product' data-aos='fade-down' data-aos-delay='700' data-aos-duration='2000'>
            <img src={product.image} alt="" />
            <div className='food-component-mobile-product-overlay'>
              <div className='mobile-text-button-container'>
                <div className='mobile-content' data-aos='fade-right' data-aos-delay='1000' data-aos-duration='2000'>{product.content}</div>
                <div className='mobile-shop-now' data-aos='fade-left' data-aos-delay='1300' data-aos-duration='2000' onClick={(e) => stopPropagation(e, product)}>SHOP NOW</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default FoodComponentMobile;