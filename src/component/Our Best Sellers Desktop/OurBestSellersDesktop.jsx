import './OurBestSellersDesktop.scss';
import { formatCurrency } from '../../component/Our Best Sellers Desktop/Money/Money'
import { useContext } from 'react';
import { CartContext } from '../../backend/Cart';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

function OurBestSellersDesktop({ data = [], cartQuantity }) {
  const {getTotalQuantity} = useOutletContext();

  return (
    <div className='our-best-sellers-parent'>
      <div className='our-best-sellers-text'>
        <span>Our best sellers</span>
      </div>

      <div className='our-best-sellers-image-parent'>

        {data.map((product) => {
          return (
            <div key={product.id} className='our-best-sellers-product'>
              <div className='our-best-sellers-product-image'>
                <img src={product.image} alt="" />
                <div className='ovelay'></div>
              </div>
              <div className='our-best-sellers-product-image-name'>
                {product.name}
              </div>
              <div className='price'>{product.priceCents}</div>
              <div className='measurement'>{product.kg}</div>
              <div className='buttons-parent'>
                <div className='bundle-buy'>BUNDLE BUY</div>
                <div className='quick-add'onClick={async () => {
                  const response = await axios.post('http://localhost:5000/cart', {
                    productId: product.id
                  });
                  console.log(response.data);
                  await getTotalQuantity();
                }}>QUICK ADD</div>
              </div>
            </div>
          )
        })}



      </div>
    </div>
  );
};

export default OurBestSellersDesktop;