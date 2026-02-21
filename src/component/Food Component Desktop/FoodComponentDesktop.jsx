import './FoodComponentDesktop.scss';
import { products } from './products';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FoodComponentDesktop() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
      mirror: true
    })
  }, []);

  function stopPropagation(e, product) {
    e.stopPropagation();
    if(product.content === 'Jollof Rice') {
      navigate('/jollofRice');
    } else{
      alert('there is no other page apart from the rice page')
    }
  }
  return (
    <div>
      <div className='food-component-desktop-parent'>
        {products.map((product) => {
          return (
            <div key={product.id} className='food-component-desktop-product' data-aos='zoom-in' data-aos-delay='200' data-aos-duration='1500'>
              <img src={product.image} alt="Jollof rice" />
              <div className='food-component-desktop-product-overlay'>
                <div className='text-button-container'>
                  <div className='content' data-aos='fade-up' data-aos-delay='300' data-aos-duration='1500'>{product.content}</div>
                  <div className='shop-now' data-aos='fade-down' data-aos-delay='1000' data-aos-duration='1500' onClick={(e) => stopPropagation(e, product)}>SHOP NOW</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default FoodComponentDesktop;