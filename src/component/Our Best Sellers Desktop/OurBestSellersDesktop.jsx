import './OurBestSellersDesktop.scss';
import { formatCurrency } from '../../component/Our Best Sellers Desktop/Money/Money'
import { useContext } from 'react';
import { CartContext } from '../../backend/Cart';

function OurBestSellersDesktop({ data }) {
  const { cart, setCart, addToCart } = useContext(CartContext);

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
                <div className='quick-add'onClick={() => addToCart(product)}>QUICK ADD</div>
              </div>
            </div>
          )
        })}



      </div>
    </div>
  );
};

export default OurBestSellersDesktop;